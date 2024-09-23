import { FC, useState } from "react";
import Answer from "./Answer";
import { Button, Container } from "react-bootstrap";
import AnswerForm from "./AnswerForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./answer.css";

const AnswerList: FC<{ questionId: string }> = ({ questionId }) => {
  const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState(false);
  const answers = useSelector((state: RootState) => state.answers)
    .slice()
    .sort((a, b) => b.likes - a.likes);

  return (
    <Container>
      <h3>Answers</h3>
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="outline-primary fw-bold"
          onClick={() => setIsAnswerDialogOpen(true)}
        >
          Add Answer
        </Button>
      </div>

      <AnswerForm
        open={isAnswerDialogOpen}
        onClose={() => setIsAnswerDialogOpen(false)}
        questionId={questionId}
      />

      <div className="answers">
        {answers.map((answer) => (
          <Answer key={answer._id} answer={answer} />
        ))}
      </div>
    </Container>
  );
};

export default AnswerList;
