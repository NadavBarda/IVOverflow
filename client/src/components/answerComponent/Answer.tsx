// src/components/Answer.tsx

import { FC } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { format } from "date-fns";
import { IAnswer } from "../../interface/questionInterface";

const Answer: FC<IAnswer> = ({ body, user, likes, dislikes, createdAt }) => {
  const formattedCreatedAt = () => {
    if (!createdAt) {
      return "";
    }
    return format(new Date(createdAt), "MMMM dd, yyyy 'at' HH:mm");
  };
  const handleLike = () => {
    console.log("Liked the answer");
  };

  const handleDislike = () => {
    console.log("Disliked the answer");
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <div>
          <Badge bg="secondary" className="me-2">
            {user.username}
          </Badge>
          <span className="text-muted me-2">
            answered on {formattedCreatedAt()}
          </span>
        </div>
        <div>
          <Button
            variant="outline-success"
            size="sm"
            className="me-2"
            onClick={handleLike}
          >
            👍 {likes}
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDislike}>
            👎 {dislikes}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Answer;
