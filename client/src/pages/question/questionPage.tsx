import { useEffect, useState } from "react";
import './question.css';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { axiosGet } from "../../services/axiosConfig";
import { setQuestion } from "../../features/question/questionSlice";
import QuestionForm from "../../components/questionComponents/QuestionForm";
import QuestionList from "../../components/questionComponents/QuestionList";

const QuestionPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosGet("/api/questions");
      dispatch(setQuestion(res.data));
    } catch (err) {
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  const openQuestionDialog = () => setIsQuestionDialogOpen(true);
  const closeQuestionDialog = () => setIsQuestionDialogOpen(false);

  return (
    <div className="questionPage page">
      <div className="buttonsGroup">
        <Button onClick={openQuestionDialog}>Add Question</Button>
      </div>
      <h1>Questions</h1>
      

      <QuestionForm open={isQuestionDialogOpen} onClose={closeQuestionDialog} />

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {questions && <QuestionList questions={questions} />}
    </div>
  );
};

export default QuestionPage;
