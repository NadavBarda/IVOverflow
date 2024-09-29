import { FC } from "react";
import { Button } from "react-bootstrap";

interface SelectedTagsProps {
  tags: string[] ;
  removeTag: (tag: string) => void;
}

const SelectedTags: FC<SelectedTagsProps> = ({ tags, removeTag }) => {
  return (
    <div className="selected-tags">
      <strong>Selected Tags:</strong>
      <div className="d-flex gap-2 mt-2">
        {tags?.map((tag, index) => (
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
  );
};

export default SelectedTags;
