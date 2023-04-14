import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Logger } from "../../Logger";
import "./Modals.styles.css";

export const RenameCollectionModal = ({
  open,
  currentName,
  handleConfirm,
  handleCancel,
}) => {
  const [newName, setNewName] = useState("");
  const [nameValue, setNameValue] = useState(currentName);
  const [showRenameSnackbar, setShowRenameSnackbar] = useState(false);

  useEffect(() => {
    setNameValue(currentName);
  }, [currentName]);

  const handleRenameClick = () => {
    Logger(
      `User canceled renaming collection from ${currentName} to ${newName}`
    );
    handleCancel();
  };

  const handleRenameConfirm = () => {
    Logger(
      `User confirmed renaming collection from ${currentName} to ${newName}`
    );
    handleConfirm(newName);
    setShowRenameSnackbar(true);
    handleCancel();
  };

  const handleRenameCancel = () => {
    Logger(
      `User canceled renaming collection from ${currentName} to ${newName}`
    );
    handleCancel();
  };

  const handleRenameSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowRenameSnackbar(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleRenameCancel}>
        <div
          className="modal-content"
          style={{ width: "600px", maxHeight: "100%" }}
        >
          <Typography variant="h5" gutterBottom>
            Rename this collection
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            Enter a new name for this collection
          </Typography>{" "}
          <br />
          <TextField
            fullWidth
            variant="standard"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
              setNewName(e.target.value);
            }}
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
      <Snackbar
        open={showRenameSnackbar}
        autoHideDuration={3000}
        onClose={handleRenameSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="success">Collection name has been updated</Alert>
      </Snackbar>
    </>
  );
};
