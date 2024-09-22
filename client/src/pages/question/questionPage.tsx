import { FC, useEffect, useState, useMemo } from "react";
import { Card, Alert, Spinner } from "react-bootstrap";
import { IQuestion } from "../../interface/questionInterface";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestion } from "../../services/questionServices";
import AnswerList from "../../components/answerComponent/AnswerList";

const QuestionPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/questions");
      return;
    }

    const fetchQuestion = async () => {
      try {
        const q = await getQuestion(id);
        setQuestion(q);
      } catch (err) {
        console.error("Error fetching the question:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [id, navigate]);

  const formattedDate = useMemo(() => {
    if (question?.updatedAt) {
      return format(new Date(question.updatedAt), "MMMM dd, yyyy 'at' HH:mm");
    }
    return "Unknown date";
  }, [question?.updatedAt]);

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading question...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <Alert variant="warning" className="my-5">
        Question not found.
      </Alert>
    );
  }

  return (
    <>
      <Card className="mb-3 shadow-sm question">
        <Card.Body>
          <Card.Title>{question.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Asked by {question.user?.username || "Unknown user"} on{" "}
            {formattedDate}
          </Card.Subtitle>
          <Card.Text>{question.body}</Card.Text>
          {question.tags && question.tags.length > 0 && (
            <Card.Text>
              <strong>Tags:</strong> {question.tags.join(", ")}
            </Card.Text>
          )}
        </Card.Body>
      </Card>

      <div className="answers">
        <AnswerList answers={question.answers} questionId={question._id} />
      </div>
    </>
  );
};

export default QuestionPage;
