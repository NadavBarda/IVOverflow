import { FC, useState } from "react";
import { IAnswer } from "../../interface/questionInterface";
import Answer from "./Answer";
import { Button } from "react-bootstrap";
import AnswerForm from "./AnswerForm";

const AnswerList: FC<{ answers: IAnswer[] | undefined , questionId: string }> = ({ answers , questionId }) => {
  const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState<boolean>(false);
  const openDialog = () => setIsAnswerDialogOpen(true);
  const closeDialog = () => setIsAnswerDialogOpen(false);
  return (
    <div>
      <h3>Answers:</h3>
      <div className="buttonsGroup">
        <Button variant="outline-primary" onClick={openDialog}>
          Add Answer
        </Button>
      </div>

      <AnswerForm
        open={isAnswerDialogOpen}
        onClose={closeDialog}
        questionId={questionId}
      />

      <div>
        {answers?.map((answer) => (
          <Answer key={answer._id} {...answer} />
        ))}
      </div>
    </div>
  );
};

export default AnswerList;
