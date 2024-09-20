import React from "react";
import { IQuestion } from "../interface/questionInterface";
import { Card } from "react-bootstrap";

const QuestionDetails: React.FC<IQuestion> = (q) => {
 
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{q.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>{q.question}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {q.date?.toISOString()} by {q.user}
      </Card.Footer>
    </Card>
  );
};

export default QuestionDetails;
