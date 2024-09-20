import { useEffect, useState } from "react";
import { getQuestions } from "../services/questionServices";

const QuestionPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      //const questions = getQuestions();
      //setQuestions(questions);
    } catch (err) {
      setError("Failed to load contacts.");
    } finally {
      //setLoading(false);
    }
  }, []);
  return (
    <div>
      <h1>Question Page</h1>
      {loading && <h2>Loading...</h2>}
    </div>
  );
};

export default QuestionPage;
