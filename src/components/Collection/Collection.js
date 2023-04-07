import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { CreateCollectionModal } from "../Modals/CreateCollectionModal";
import { CollectionCard } from "./CollectionCard";
import { logger } from "../../logger";
import axios from "axios";
import "./Collection.styles.css";
import { CustomSnackbar } from "./CustomSnackbar";

const COLLECTIONS_ENDPOINT =
  "https://sjarvqxh09.execute-api.us-east-1.amazonaws.com/dev/collections";

export const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

  const snackbarMessages = {
    create: "Collection created successfully",
    delete: "Collection deleted successfully",
    rename: "Collection name has been updated",
    requiredFields: "Please complete all required fields",
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(COLLECTIONS_ENDPOINT);
        setCollections(response.data);
        logger("Collections loaded successfully", response.data);
      } catch (error) {
        logger("Error loading collections", error);
      }
    };
    fetchCollections();
  }, []);

  const handleCreateCollection = async (newCollection) => {
    try {
      const response = await axios.post(COLLECTIONS_ENDPOINT, {
        name: newCollection.name,
        createdBy: newCollection.createdBy,
      });
      const createdCollection = response.data;
      const updatedCollections = [...collections, createdCollection];
      setCollections(updatedCollections);
      setIsCreateModalOpen(false);
      setSnackbarState({
        isOpen: true,
        message: snackbarMessages.create,
        severity: "success",
      });
      logger("New collection created", createdCollection);
      navigate(`/collection/${createdCollection.id}`);
    } catch (error) {
      console.error("Error creating collection", error);
    }
  };

  const handleCollectionClick = (collection) => {
    navigate(`/collection/${collection.id}`);
    logger("Collection clicked", collection);
  };

  const handleDeleteCollection = async (collection) => {
    try {
      await axios.delete(`${COLLECTIONS_ENDPOINT}/${collection.id}`);
      setCollections(collections.filter((c) => c.id !== collection.id));
      setSnackbarState({
        isOpen: true,
        message: snackbarMessages.delete,
        severity: "success",
      });
      logger("Collection deleted", collection);
    } catch (error) {
      console.error("Error deleting collection", error);
    }
  };

  const handleRenameCollection = async (collection, newName) => {
    try {
      console.log("Renaming collection with ID", collection.id, "to", newName);
      const response = await axios.put(
        `${COLLECTIONS_ENDPOINT}/${collection.id}`,
        {
          name: newName,
        }
      );
      console.log("PUT request succeeded:", response);
      const updatedCollection = response.data;
      setCollections(
        collections.map((c) =>
          c.id === updatedCollection.id ? updatedCollection : c
        )
      );
      setSnackbarState({
        isOpen: true,
        message: snackbarMessages.rename,
        severity: "success",
      });
      logger("Collection renamed", updatedCollection);
    } catch (error) {
      console.error("Error renaming collection", error);
    }
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    setSnackbarState({
      ...snackbarState,
      isOpen: false,
    });
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
      {snackbarState.isOpen && (
        <CustomSnackbar
          message={snackbarState.message}
          severity={snackbarState.severity}
          open={snackbarState.isOpen}
          autoHideDuration={3000}
          onClose={() => {
            setSnackbarState({
              ...snackbarState,
              isOpen: false,
            });
            logger("Snackbar closed");
          }}
        />
      )}
    </div>
  );
};
