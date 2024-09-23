import { FC } from "react";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import { IAnswer } from "../../interface/questionInterface";
import { FaUser } from "react-icons/fa";
import { responeToAnswer } from "../../services/answerServices";
import { useDispatch } from "react-redux";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const Answer: FC<{ answer: IAnswer }> = ({ answer }) => {
  const authHeader = useAuthHeader() as string;

  const formattedCreatedAt = () => {
    if (!answer.createdAt) {
      return "";
    }
    return format(new Date(answer.createdAt), "MMMM dd, yyyy 'at' HH:mm");
  };
  const dispatch = useDispatch();
  const handleLike = async () => {
    await responeToAnswer(
      answer._id,
      answer.question,
      "like",
      dispatch,
      authHeader
    );
  };

  const handleDislike = async () => {
    await responeToAnswer(
      answer._id,
      answer.question,
      "dislike",
      dispatch,
      authHeader
    );
  };

  return (
    <div className="answer mb-3 card p-0">
      <div className="card-body">
        <div className="mb-3 fw-semibold">
          <p className="card-text">{answer.body}</p>
        </div>

        <div className="d-flex justify-content-start align-items-end">
          <Button variant="outline-success" onClick={handleLike}>
            👍
            {answer.likes}
          </Button>
          <Button variant="outline-danger" onClick={handleDislike}>
            👿
            {answer.dislikes}
          </Button>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <FaUser size={14} className="me-2" />
            <p className="mb-0">{answer.user.username}</p>
            <p className="mb-0 ms-2 ">{formattedCreatedAt()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
