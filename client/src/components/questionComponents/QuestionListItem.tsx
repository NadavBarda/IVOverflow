import { FC } from "react";
import { Card } from "react-bootstrap";
import { IQuestion } from "../../interface/questionInterface";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
const QuestionListItem: FC<{ question: IQuestion }> = ({ question }) => {

  const navigate = useNavigate();
  const formattedDate = question.updatedAt
    ? format(new Date(question.updatedAt), "MMMM dd, yyyy 'at' HH:mm")
    : "Unknown date";

  return (
    <Card className="mb-3 shadow-sm" onClick={() => navigate(`/questions/${question._id}`)}>
      <Card.Body>
        <Card.Title>{question.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>{question.body}</Card.Text>
        <Card.Text>Tags: {question.tags?.join(", ")}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Text>Asked by {question.user.username}</Card.Text>
        at: {formattedDate}
      </Card.Footer>
    </Card>
  );
};

export default QuestionListItem;
