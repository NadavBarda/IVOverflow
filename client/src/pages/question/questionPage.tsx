import { FC, useEffect, useState, useMemo } from "react";
import { Card, Alert, Spinner } from "react-bootstrap";
import { IQuestion } from "../../interface/questionInterface";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestion } from "../../services/questionServices";
import AnswerList from "../../components/answerComponent/AnswerList";
import { setAnswers } from "../../features/answer/answerSlice";
import { useDispatch } from "react-redux";
import { Tags } from "../../components/general/Tags";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const QuestionPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const authHeader = useAuthHeader();

  useEffect(() => {
    if (!id) {
      navigate("/questions");
      return;
    }

    const fetchQuestion = async () => {
      try {
        if (!authHeader) {
          return;
        }
        const q = await getQuestion({ id, authHeader, dispatch });
        setQuestion(q);
        dispatch(setAnswers(q.answers));
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
    <div className="page">
      <Card className="mb-3 shadow-sm question ">
        <Card.Body>
          <Card.Title className="mb-2 text-decoration-underline">
            {question.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>{question.body}</Card.Text>
          {question.tags && <Tags tags={question.tags}></Tags>}
        </Card.Body>
        <Card.Footer>
          Asked by {question.user?.username}
          {formattedDate}
        </Card.Footer>
      </Card>

      <div className="answers">
        <AnswerList key={question._id} questionId={question._id} />
      </div>
    </div>
  );
};

export default QuestionPage;
