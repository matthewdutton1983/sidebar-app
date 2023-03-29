import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { CreateCollectionModal } from "../Modals/CreateCollectionModal";
import { CollectionCard } from "./CollectionCard";
import { logger } from "../../logger";
import "./Collection.styles.css";

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
    logger("Collections saved to local storage", collections);
  }, [collections]);

  useEffect(() => {
    const storedCollections = JSON.parse(localStorage.getItem("collections"));
    if (storedCollections) {
      setCollections(storedCollections);
      logger("Collections loaded from local storage", storedCollections);
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
    logger("New collection created", newCollection);
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
    logger("Required fields snackbar closed");
  };

  const handleCreatedSnackbarClose = () => {
    setIsCreatedSnackbarOpen(false);
    logger("Created snackbar closed");
  };

  const handleDeletedSnackbarClose = () => {
    setIsDeletedSnackbarOpen(false);
    logger("Deleted snackbar closed");
  };

  const handleRenameSnackbarClose = () => {
    setIsRenameSnackbarOpen(false);
    logger("Rename snackbar closed");
  };

  const handleCollectionClick = (collection) => {
    navigate(`/collection/${collection.id}`);
    logger("Collection clicked", collection);
  };

  const handleDeleteCollection = (collection) => {
    setCollections(collections.filter((c) => c.id !== collection.id));
    setIsDeletedSnackbarOpen(true);
    logger("Collection deleted", collection);
  };

  const handleRenameCollection = (collection, newName) => {
    setCollections(
      collections.map((c) =>
        c.id === collection.id ? { ...c, name: newName } : c
      )
    );
    setIsRenameSnackbarOpen(true);
    logger("Collection renamed", collection);
  };

  return (
    <div className="home">
      <Typography variant="h4">My Collections</Typography>
      <Typography variant="h6" fontWeight={"light"}>
        Explore and analyze large collections of documents
      </Typography>
      <div className="create-collection-button-container">
        <Button
          variant="contained"
          onClick={() => {
            setIsCreateModalOpen(true);
            logger("Create collection button clicked");
          }}
        >
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
                  onDoubleClick={() => {
                    handleCollectionClick(collection);
                    logger("Collection double clicked", collection);
                  }}
                  onDelete={(collection) => {
                    handleDeleteCollection(collection);
                    logger("Collection deleted", collection);
                  }}
                  onRename={(collection, newName) => {
                    handleRenameCollection(collection, newName);
                    logger("Collection renamed", collection);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          handleModalClose();
          logger("Create collection modal closed");
        }}
        onCreate={(newCollection) => {
          handleCreateCollection(newCollection);
          logger("Collection created", newCollection);
        }}
      />
      <Snackbar
        open={isRequiredSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => {
          handleRequiredSnackbarClose();
          logger("Required fields snackbar closed");
        }}
      >
        <Alert severity="error">Please complete all required fields</Alert>
      </Snackbar>
      <Snackbar
        open={isCreatedSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => {
          handleCreatedSnackbarClose();
          logger("Created snackbar closed");
        }}
      >
        <Alert severity="success">Collection created successfully</Alert>
      </Snackbar>
      <Snackbar
        open={isDeletedSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => {
          handleDeletedSnackbarClose();
          logger("Deleted snackbar closed");
        }}
      >
        <Alert severity="success">Collection deleted successfully</Alert>
      </Snackbar>
      <Snackbar
        open={isRenameSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => {
          handleRenameSnackbarClose();
          logger("Rename snackbar closed");
        }}
      >
        <Alert severity="success">Collection name has been updated</Alert>
      </Snackbar>
    </div>
  );
};
