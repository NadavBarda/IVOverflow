import { FC } from "react";
import { Card, Badge, Row, Col } from "react-bootstrap";
import { IQuestion } from "../../interface/questionInterface";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaComment, FaUser } from "react-icons/fa";

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
        <Row>
          <Card.Text className="" title={question.body}>
            {questionBody}
          </Card.Text>
          <div className="mb-2">
            {question.tags?.map((tag) => (
              <Badge
                bg="primary"
                pill
                key={tag}
                className="me-1"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/tags/${tag}`);
                }}
                style={{ cursor: "pointer" }}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Col className="text-end ">
            <div>
              <FaComment className="me-1" />
              {question.answers?.length || 0} Answers
            </div>
          </Col>
        </Row>
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
