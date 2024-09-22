import { FC } from "react";
import { Badge } from "react-bootstrap";

export const Tags: FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="mb-2">
      {tags?.map((tag) => (
        <Badge
          bg="primary"
          pill
          key={tag}
          className="me-1"
          title={tag}
          style={{ cursor: "pointer" }}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
