import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { AddRounded } from "../IconImports";
import "./Collection.styles.css";
import { CreateCollectionModal } from "./CreateCollectionModal";
import { CollectionCard } from "./CollectionCard";

export const Collection = () => {
  const [collections, setCollections] = useState(() => {
    const savedCollections = localStorage.getItem("collections");
    return savedCollections ? JSON.parse(savedCollections) : [];
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRequiredSnackbarOpen, setIsRequiredSnackbarOpen] = useState(false);
  const [isCreatedSnackbarOpen, setIsCreatedSnackbarOpen] = useState(false);
  const [isDeletedSnackbarOpen, setIsDeletedSnackbarOpen] = useState(false);
  const [isRenameSnackbarOpen, setIsRenameSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    const storedCollections = JSON.parse(localStorage.getItem("collections"));
    if (storedCollections) {
      setCollections(storedCollections);
    }
  }, []);

  const handleCreateCollection = (newCollection) => {
    const updatedCollections = [...collections, newCollection];
    localStorage.setItem("collections", JSON.stringify(updatedCollections));
    setCollections(updatedCollections);
    setIsCreateModalOpen(false);
    setIsRequiredSnackbarOpen(false);
    setIsDeletedSnackbarOpen(false);
    setIsCreatedSnackbarOpen(true);
    setIsRenameSnackbarOpen(false);
    navigate(`/collection/${newCollection.id}`);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    setIsRequiredSnackbarOpen(false);
    setIsDeletedSnackbarOpen(false);
    setIsCreatedSnackbarOpen(false);
    setIsRenameSnackbarOpen(false);
  };

  const handleRequiredSnackbarClose = () => {
    setIsRequiredSnackbarOpen(false);
  };

  const handleCreatedSnackbarClose = () => {
    setIsCreatedSnackbarOpen(false);
  };

  const handleDeletedSnackbarClose = () => {
    setIsDeletedSnackbarOpen(false);
  };

  const handleRenameSnackbarClose = () => {
    setIsDeletedSnackbarOpen(false);
  };

  const handleCollectionClick = (collection) => {
    navigate(`/collection/${collection.id}`);
  };

  const handleDeleteCollection = (collection) => {
    setCollections(collections.filter((c) => c.id !== collection.id));
    setIsDeletedSnackbarOpen(true);
  };

  const handleRenameCollection = (collection, newName) => {
    setCollections(
      collections.map((c) =>
        c.id === collection.id ? { ...c, name: newName } : c
      )
    );
    setIsRenameSnackbarOpen(true);
  };

  return (
    <div className="home">
      <Typography variant="h4">My Collections</Typography>
      <Typography variant="h6" fontWeight={"light"}>
        Explore and analyze large collections of documents
      </Typography>
      <div className="create-collection-button-container">
        <Button variant="contained" onClick={() => setIsCreateModalOpen(true)}>
          <AddRounded sx={{ paddingRight: "8px" }} />
          Create Collection
        </Button>
      </div>

      {collections.length === 0 ? (
        <div className="no-collections-message">
          <Typography variant="h5" sx={{ marginTop: "16px" }}>
            There are no collections in your workspace.
          </Typography>
        </div>
      ) : (
        <div className="collection-cards-container">
          {collections.map((collection) => (
            <div key={collection.id}>
              {collection.name && (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onDoubleClick={() => handleCollectionClick(collection)}
                  onDelete={handleDeleteCollection}
                  onRename={handleRenameCollection}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={handleModalClose}
        onCreate={handleCreateCollection}
      />
      <Snackbar
        open={isRequiredSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleRequiredSnackbarClose}
      >
        <Alert severity="error">Please complete all required fields</Alert>
      </Snackbar>
      <Snackbar
        open={isCreatedSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCreatedSnackbarClose}
      >
        <Alert severity="success">Collection created successfully</Alert>
      </Snackbar>
      <Snackbar
        open={isDeletedSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleDeletedSnackbarClose}
      >
        <Alert severity="success">Collection deleted successfully</Alert>
      </Snackbar>
      <Snackbar
        open={isRenameSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleRenameSnackbarClose}
      >
        <Alert severity="success">Collection name has been updated</Alert>
      </Snackbar>
    </div>
  );
};
