import { Button, Form } from "react-bootstrap";
import { FC, useState } from "react";
import { IQuestion } from "../../interface/questionInterface";
import {
  addQuestion,
  initialQuestionState,
} from "../../services/questionServices";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export interface IQuestionForm {
  open: boolean;
  onClose: () => void;
}

const MAX_TAGS_LIMIT = 3;
const availableTags = ["React", "JavaScript", "CSS", "HTML", "TypeScript"]; // Example tag list

const QuestionForm: FC<IQuestionForm> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState<IQuestion>(initialQuestionState);
  const [tagLimitReached, setTagLimitReached] = useState(false);
  const authHeader  = useAuthHeader() as string;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = e.target.value;
    if (!selectedTag) return;

    setQuestion((prevQuestion) => {
      const tags = prevQuestion.tags || [];

      if (tags.length < MAX_TAGS_LIMIT) {
        setTagLimitReached(false);
        return { ...prevQuestion, tags: [...tags, selectedTag] };
      }
      setTagLimitReached(true);
      return prevQuestion;
    });
  };

  const removeTag = (tag: string) => {
    setQuestion((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }));
    setTagLimitReached(false);
  };

  const handleQuestionAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addQuestion({question, dispatch, authHeader});
    setQuestion(initialQuestionState);
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleQuestionAdd}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question title"
              value={question.title}
              name="title"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter question body"
              value={question.body}
              name="body"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Select
              aria-label="Select tags"
              onChange={handleTagsChange}
              name="tags"
            >
              <option value="">Select tags (max {MAX_TAGS_LIMIT})</option>
              {availableTags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </Form.Select>

            {tagLimitReached && (
              <Form.Text className="text-danger">
                You can only select up to {MAX_TAGS_LIMIT} tags.
              </Form.Text>
            )}
          </Form.Group>

          <div className="selected-tags">
            <strong>Selected Tags:</strong>
            <div className="d-flex gap-2 mt-2">
              {question.tags?.map((tag, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  onClick={() => removeTag(tag)}
                  className="tag-btn"
                >
                  {tag} <span>&times;</span>
                </Button>
              ))}
            </div>
          </div>

          <Button variant="primary" type="submit" className="mt-3">
            Add Question
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default QuestionForm;
