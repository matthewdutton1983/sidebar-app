import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { logger } from "../../logger";
import "./Modals.styles.css";

export const CreateCollectionModal = ({ isOpen, onClose, onCreate }) => {
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleNewNameChange = (event) => {
    setNewCollectionName(event.target.value);
  };

  const handleCreateCollection = () => {
    if (newCollectionName) {
      const newCollection = {
        id: uuidv4(),
        name: newCollectionName,
        documents: [],
        created_by: "Matthew Dutton", // replace with actual user
        created_date: new Date().toLocaleString(),
      };
      onCreate(newCollection);
      setNewCollectionName("");

      logger("New collection created.", { collection: newCollection });
    }
  };

  const handleClose = () => {
    setNewCollectionName("");
    onClose();
  };

  logger("Rendering CreateCollectionModal component.");

  return (
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
          <Button variant="outlined" color="primary" onClick={handleClose}>
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
  );
};