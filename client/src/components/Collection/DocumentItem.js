import { Checkbox, IconButton, Typography } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import "./Collection.styles.css";

export const DocumentItem = ({
  index,
  doc = {},
  handleCheckboxChange,
  handleDeleteDocument,
}) => {
  return (
    <div
      key={index}
      className={`document-item ${doc.checked ? "checked-document" : ""}`}
    >
      <div>
        <Checkbox
          color="primary"
          checked={doc.checked}
          onChange={(e) => handleCheckboxChange(e, index)}
        />
      </div>
      <Typography variant="body1" gutterBottom>
        {doc.name}
      </Typography>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => handleDeleteDocument(index)}
      >
        <DeleteRounded />
      </IconButton>
    </div>
  );
};
