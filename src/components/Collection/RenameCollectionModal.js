import { useState, useEffect } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import "./Collection.styles.css";

export const RenameCollectionModal = ({
  open,
  currentName,
  handleConfirm,
  handleCancel,
}) => {
  const [newName, setNewName] = useState(currentName);

  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  const handleRenameClick = () => {
    handleCancel();
  };

  const handleRenameConfirm = () => {
    handleConfirm(newName);
    handleCancel();
  };

  const handleRenameCancel = () => {
    handleCancel();
  };

  return (
    <Modal open={open} onClose={handleRenameCancel}>
      <div className="modal-content">
        <Typography variant="h5" gutterBottom>
          Rename this collection
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom>
          Enter a new name for this collection:
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ marginBottom: "16px" }}
        />
        <div className="modal-buttons">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleRenameClick}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRenameConfirm}
            disabled={!newName.trim()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
