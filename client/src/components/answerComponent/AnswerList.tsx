import { FC, useState } from "react";
import Answer from "./Answer";
import { Button } from "react-bootstrap";
import AnswerForm from "./AnswerForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./answer.css";
import { Container, Row, Col } from "react-bootstrap";

const AnswerList: FC<{ questionId: string }> = ({ questionId }) => {
  const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState<boolean>(false);
  const openDialog = () => setIsAnswerDialogOpen(true);
  const closeDialog = () => setIsAnswerDialogOpen(false);
  const answers = useSelector((state: RootState) => state.answers);

  return (
    <Container fluid>
      <Row>
        <Col xs={10}>
          <h3>Answers:</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="d-flex justify-content-end mb-3">
          <Button variant="outline-primary" onClick={openDialog}>
            Add Answer
          </Button>
        </Col>
      </Row>

      <AnswerForm
        open={isAnswerDialogOpen}
        onClose={closeDialog}
        questionId={questionId}
      />
      <Row>
        <Col>
          <div className="answers">
            {answers?.map((answer) => (
              <Answer key={answer._id} {...answer} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AnswerList;
