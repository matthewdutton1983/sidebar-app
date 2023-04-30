import { Checkbox, IconButton, Typography } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import "./Document.styles.css";

export const DocumentItem = ({
  index,
  doc = {},
  handleCheckboxChange,
  handleDeleteDocument,
  handleDocumentDoubleClick,
}) => {
  console.log("doc:", doc);
  return (
    <div
      key={index}
      className={`document-item ${doc.checked ? "checked-document" : ""}`}
      onDoubleClick={() => handleDocumentDoubleClick(doc.id)}
    >
      <div>
        <Checkbox
          color="primary"
          checked={doc.checked || false}
          onChange={(e) => handleCheckboxChange(e, index)}
        />
      </div>
      <Typography variant="body1" gutterBottom className="custom-typography">
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
