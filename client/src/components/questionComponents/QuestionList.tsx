import { FC } from "react";
import { IQuestion } from "../../interface/questionInterface";
import QuestionDetails from "./QuestionListItem";

const QuestionList: FC<{ questions: IQuestion[] }> = ({ questions }) => {
  return (
    <div>
      {questions.map((question) => (
        <QuestionDetails key={question._id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;