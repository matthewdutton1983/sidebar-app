import { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Logger } from "../../Logger";
import { Collection } from "../../models/Collection";
import "./Modals.styles.css";

export const CreateCollectionModal = ({ isOpen, onClose, onCreate }) => {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showCreateSnackbar, setShowCreateSnackbar] = useState(false);

  const handleNewNameChange = (event) => {
    setNewCollectionName(event.target.value);
  };

  const handleCreateCollection = async () => {
    if (newCollectionName) {
      const newCollection = {
        name: newCollectionName,
        createdBy: "Matthew Dutton", // replace with actual user
      };
      try {
        const createdCollection = await Collection.createCollection(
          newCollection
        );
        onCreate(createdCollection);
        setShowCreateSnackbar(true);
      } catch (error) {
        console.error("Error creating collection", error);
      }
    }
  };

  const handleModalClose = () => {
    setNewCollectionName("");
    onClose();
  };

  const handleCreateSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    console.log(event);
    setShowCreateSnackbar(false);
  };

  Logger("Rendering CreateCollectionModal component.");

  return (
    <>
      <Modal open={isOpen} onClose={onClose} className="modal">
        <div
          className="modal-content"
          style={{ width: "500px", maxHeight: "100%" }}
        >
          <Typography variant="h5">Create a new collection</Typography>
          <br />
          <Typography variant="body1">
            Please give your collection a name
          </Typography>
          <br />
          <TextField
            placeholder="This is a required field"
            style={{
              width: "100%",
              paddingBottom: "16px",
            }}
            required
            variant="standard"
            id="collectionName"
            onChange={handleNewNameChange}
            value={newCollectionName}
            multiline
          />
          <div className="modal-buttons">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateCollection}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
      {/* Need to look into why this Snackbar is not being displayed */}
      <Snackbar
        open={showCreateSnackbar}
        autoHideDuration={6000}
        onClose={handleCreateSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="success">Collection created successfully</Alert>
      </Snackbar>
    </>
  );
};
