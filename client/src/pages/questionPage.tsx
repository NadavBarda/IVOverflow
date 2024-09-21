import { useEffect, useState } from "react";
import QuestionForm from "../components/QuestionForm";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { axiosGet } from "../services/axiosConfig";
import { setQuestion } from "../features/question/questionSlice";
import QuestionDetails from "../components/QuestionDetails";
import { Button } from "react-bootstrap";
const QuestionPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const [isQuestionDailogOpen, setIsQuestionDailogOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions);
  useEffect(() => {
    try {
      setLoading(true);
      getQuestions();
    } catch (err) {
      setError("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosGet("/api/questions");
      dispatch(setQuestion(res.data));
    } catch (err) {
      setError("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Question Page</h1>
      <Button onClick={() => setIsQuestionDailogOpen(true)}>Add Question</Button>
      <QuestionForm  open={isQuestionDailogOpen} onClose={() => setIsQuestionDailogOpen(false)} />

      {loading && <h2>Loading...</h2>}
      {questions.length > 0 &&
        questions.map((q) => <QuestionDetails key={q._id} question={q} />)}
      {error && <h2>{error}</h2>}
    </div>
  );
};

export default QuestionPage;
