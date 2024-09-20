import React from "react";
import { IQuestion } from "../interface/questionInterface";
import { Card } from "react-bootstrap";

const Question: React.FC<IQuestion> = (q) => {
  <div>
    <p>{q.question}</p>
    <p>{q.user}</p>
    <p>{q.date.toISOString()}</p>
  </div>;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{q.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>{q.question}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {q.date.toISOString()} by {q.user}
      </Card.Footer>
    </Card>
  );
};

export default Question;
