import { Checkbox, IconButton, Typography } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import "./Document.styles.css";

export const DocumentItem = ({
  index,
  doc = {},
  handleCheckboxChange,
  handleDeleteDocument,
}) => {
  console.log("doc:", doc);
  return (
    <div
      key={index}
      className={`document-item ${doc.checked ? "checked-document" : ""}`}
    >
      <div>
        <Checkbox
          color="primary"
          checked={doc.checked || false}
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
