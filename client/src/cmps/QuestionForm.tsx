import { Button, Form } from "react-bootstrap";
import { IQuestion } from "../interface/questionInterface";
import { useState } from "react";
import { axiosPost } from "../services/axiosConfig";

const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState<IQuestion>({
    _id: "",
    title: "",
    body: "",
    tags: [],
    user: "",
  });

  const availableTags = ["React", "JavaScript", "CSS", "HTML", "TypeScript"]; // Example tag list

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((q) => ({ ...q, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;

    if (!selected) return;

    setQuestion((q) => {
      const tags = q.tags || [];

      if (tags.length > 2) {
        return q;
      }
      if (tags.includes(selected)) {
        return { ...q, tags: q.tags?.filter((t) => t !== selected) };
      }
      return { ...q, tags: [...tags, selected] };
    });
  };

  const handleQuestionAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axiosPost("/api/questions", question);
    console.log(res.data);
  };

  function removeTag(tag: string): void {
    setQuestion((q) => {
      return { ...q, tags: q.tags?.filter((t) => t !== tag) };
    });
  }

  return (
    <Form onSubmit={handleQuestionAdd}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter question title"
          value={question.title}
          name="title"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBody">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter question body"
          value={question.body}
          name="body"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={handleTagsChange}
          name="tags"
        >
          <option value="">Select tags</option>
          {availableTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div>selected Tags:</div>
      <div className="tags">
        {question.tags?.map((tag, index) => (
          <div key={index} className="tag">
            <Button variant="secondary" onClick={() => removeTag(tag)}>
              {tag}
            </Button>
          </div>
        ))}
      </div>
      <Button variant="primary" type="submit">
        Add Question
      </Button>
    </Form>
  );
};

export default QuestionForm;
