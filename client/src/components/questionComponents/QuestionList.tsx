import { FC } from "react";
import { IQuestion } from "../../interface/questionInterface";
import QuestionListItem from "./QuestionListItem";

const QuestionList: FC<{ questions: IQuestion[] }> = ({ questions }) => {
  return (
    <div>
      {questions.map((question) => (
        <QuestionListItem key={question._id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
