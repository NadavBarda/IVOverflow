import { FC } from "react";
import { IQuestion } from "../interface/questionInterface";
import { Card } from "react-bootstrap";

const QuestionDetails: FC<{ question: IQuestion }> = ({ question }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{question.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>{question.body}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {question.updatedAt?.toString()} by {question.user.username}
      </Card.Footer>
    </Card>
  );
};

export default QuestionDetails;
