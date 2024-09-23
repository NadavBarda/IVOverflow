import { FC } from "react";
import { Card } from "react-bootstrap";
import { IQuestion } from "../../interface/questionInterface";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaComment, FaUser } from "react-icons/fa";
import { Tags } from "../general/Tags";

const QuestionListItem: FC<{ question: IQuestion }> = ({ question }) => {
  const navigate = useNavigate();
  const formattedDate = question.updatedAt
    ? format(new Date(question.updatedAt), "MMMM dd, yyyy 'at' HH:mm")
    : "Unknown date";

  const questionBody =
    question.body.length > 150
      ? `${question.body.substring(0, 150)}...`
      : question.body;
  const handleCardClick = () => {
    navigate(`/questions/${question._id}`);
  };
  return (
    <Card
      className="mb-3 shadow-lg"
      onClick={handleCardClick}
      aria-label={`View details for question titled ${question.title}`}
    >
      <Card.Body>
        <Card.Text className="" title={question.body}>
          <div className="fw-bold mb-2 text-secondary text-decoration-underline">
            Question:
          </div>
          <div className="fw-semibold"> {questionBody}</div>
        </Card.Text>

        <div className="d-flex justify-content-end align-items-end">
          <FaComment className="me-1" />
          {question.answers?.length || 0} Answers
        </div>
        <div className="justify-content-end align-items-end">
          {question.tags && <Tags tags={question.tags}></Tags>}
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Subtitle className="">
          Asked by <FaUser className="me-1" />
          {question.user.username} on {formattedDate}
        </Card.Subtitle>
      </Card.Footer>
    </Card>
  );
};

export default QuestionListItem;
