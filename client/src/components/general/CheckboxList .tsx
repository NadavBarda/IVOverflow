import { FC } from "react";
import { availableTags } from "../../services/questionServices";

interface CheckboxListProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckboxList: FC<CheckboxListProps> = ({
  selectedItems,
  setSelectedItems,
}) => {
  const items = availableTags;

  const handleCheckboxChange = (tag: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(tag)) {
        return prevSelected.filter((item) => item !== tag);
      } else {
        return [...prevSelected, tag];
      }
    });
  };

  return (
    <div className="container mt-2">
      <div className="mb-3 fw-bold">Select Tags</div>
      <div
        className="form-group"
        style={{ maxHeight: "120px", overflowY: "auto" }}
      >
        {items.map((item, index) => (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`checkbox-${index}`}
              value={item}
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />

            <label className="form-check-label" htmlFor={`checkbox-${index}`}>
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxList;
