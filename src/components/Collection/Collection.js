import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import { AddRounded } from "../IconImports";
import "./Collection.styles.css";
import { CreateCollectionModal } from "./CreateCollectionModal";

export const Collection = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleCreateCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
    setIsCreateModalOpen(false);
    setIsSnackbarOpen(false);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    setIsSnackbarOpen(false);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div className="home">
      <Typography variant="h4">My Collections</Typography>
      <div className="create-collection-button-container">
        <Button variant="contained" onClick={() => setIsCreateModalOpen(true)}>
          <AddRounded />
          Create Collection
        </Button>
      </div>
      <div className="collection-cards-container">
        {collections.map((collection) => (
          <div key={collection.id}>
            {collection.name && (
              <Card className="collection-card">
                <CardContent className="collection-card-content">
                  <Typography variant="h6">{collection.name}</Typography>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={handleModalClose}
        onCreate={handleCreateCollection}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error">Please complete all required fields</Alert>
      </Snackbar>
    </div>
  );
};
