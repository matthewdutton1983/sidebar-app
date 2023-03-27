import React from "react";
import { Button, Modal, Typography } from "@mui/material";
import "./Collection.styles.css";

export const DeleteCollectionModal = ({
  open,
  handleConfirm,
  handleCancel,
}) => {
  const handleDeleteClick = () => {
    handleCancel();
  };

  const handleDeleteConfirm = () => {
    handleConfirm();
    handleCancel();
  };

  const handleDeleteCancel = () => {
    handleCancel();
  };

  return (
    <Modal open={open} onClose={handleDeleteCancel}>
      <div className="modal-content">
        <Typography variant="h5" gutterBottom>
          Delete this collection
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this collection? This action is
          irreversible.
        </Typography>
        <div className="modal-buttons">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDeleteClick}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
