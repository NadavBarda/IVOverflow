// src/components/AnswerForm.tsx

import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { FC, useState } from "react";
import { IAnswer } from "../../interface/questionInterface";
import { addAnswer, initialAnswerState } from "../../services/answerServices";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export interface IModalProps {
  open: boolean;
  onClose: () => void;
  questionId: string;
}

const AnswerForm: FC<IModalProps> = ({ open, onClose, questionId }) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState<IAnswer>(initialAnswerState(questionId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authHeader = useAuthHeader();

  const handleAnswerAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!answer.body.trim()) {
      setError("Answer body cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      if (!authHeader) return;
      await addAnswer(answer, questionId, dispatch, authHeader);
      setAnswer(initialAnswerState(questionId));
      onClose();
    } catch (err: any) {
      console.error("Error adding answer:", err);
      setError("Failed to submit your answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setAnswer(initialAnswerState(questionId));
    setError(null);
    onClose();
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Form onSubmit={handleAnswerAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Create Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}
          <Form.Group className="mb-3" controlId="answerBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="body"
              placeholder="Write your answer here..."
              value={answer.body}
              onChange={(e) => setAnswer({ ...answer, body: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Submitting...
              </>
            ) : (
              "Submit Answer"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AnswerForm;
