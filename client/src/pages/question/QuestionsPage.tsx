import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import { RootState } from "../../redux/store";
import { axiosGet } from "../../services/axiosConfig";
import { setQuestions } from "../../features/question/questionSlice";
import QuestionForm from "../../components/questionComponents/QuestionForm";
import QuestionList from "../../components/questionComponents/QuestionList";
import CheckboxList from "../../components/general/CheckboxList ";
import "./question.css";

const QuestionsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] =
    useState<boolean>(false);
  const [showTags, setShowTags] = useState<boolean>(false);

  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions);

  const authHeader = useAuthHeader();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosGet({
        url: "/api/questions",
        authHeader: authHeader,
      });
      dispatch(setQuestions(res.data));
    } catch (err) {
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions =
    selectedTags.length === 0
      ? questions
      : questions.filter((q) => q.tags?.some((t) => selectedTags.includes(t)));

  return (
    <div className="question-page page">
      <h1>Questions</h1>
      <div className="buttonsGroup">
        <Button onClick={() => setIsQuestionDialogOpen(true)}>
          Add Question
        </Button>
      </div>
      <div className="filter-group ">
       

        <Button variant="secondary" onClick={() => setShowTags(!showTags)}>
          Filter
        </Button>

        {showTags && (
          <div className="filter-container">
            <CheckboxList
              selectedItems={selectedTags}
              setSelectedItems={setSelectedTags}
            />

            <Button className="mt-2" onClick={() => {
              setShowTags(false)
              setSelectedTags([])}}>
              Clear Filter
            </Button>
          </div>
        )}
      </div>

      <QuestionForm
        open={isQuestionDialogOpen}
        onClose={() => setIsQuestionDialogOpen(false)}
      />

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {questions && <QuestionList questions={filteredQuestions} />}
    </div>
  );
};

export default QuestionsPage;
