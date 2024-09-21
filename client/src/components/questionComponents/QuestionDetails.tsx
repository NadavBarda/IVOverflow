import { FC } from "react";
import { Card } from "react-bootstrap";
import { IQuestion } from "../../interface/questionInterface";
import { format } from "date-fns";
const QuestionDetails: FC<{ question: IQuestion }> = ({ question }) => {
  const formattedDate = question.updatedAt
    ? format(new Date(question.updatedAt), "MMMM dd, yyyy 'at' HH:mm")
    : "Unknown date";

  return (
    <Card className="mb-3 shadow-sm" style={{ width: "100%" }}>
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

export default QuestionDetails;
