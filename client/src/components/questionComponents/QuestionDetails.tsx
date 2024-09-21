import { FC } from "react";
import { Card } from "react-bootstrap";
import { IQuestion } from "../../interface/questionInterface";
import { format } from "date-fns"; // You can use date-fns or any other date formatting library

const QuestionDetails: FC<{ question: IQuestion }> = ({ question }) => {
  // Format date
  const formattedDate = question.updatedAt
    ? format(new Date(question.updatedAt), "MMMM dd, yyyy 'at' HH:mm")
    : "Unknown date";

  return (
    <Card className="mb-3 shadow-sm" style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>{question.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Asked by {question.user.username}
        </Card.Subtitle>
        <Card.Text>{question.body}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        Created: {formattedDate}
      </Card.Footer>
    </Card>
  );
};

export default QuestionDetails;
