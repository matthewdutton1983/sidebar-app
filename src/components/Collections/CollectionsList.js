import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { CreateCollectionModal } from "../Modals/CreateCollectionModal";
import { CollectionCard } from "./CollectionCard";
import { Logger } from "../../Logger";
import axios from "axios";
import "./Collection.styles.css";
import { CustomSnackbar } from "./CustomSnackbar";

const COLLECTIONS_ENDPOINT =
  "https://sjarvqxh09.execute-api.us-east-1.amazonaws.com/dev/collections";

export const CollectionsList = () => {
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
        Logger("Collections loaded successfully", response.data);
      } catch (error) {
        Logger("Error loading collections", error);
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
      Logger("New collection created", createdCollection);
      navigate(`/collection/${createdCollection.id}`);
    } catch (error) {
      console.error("Error creating collection", error);
    }
  };

  const handleCollectionClick = (collection) => {
    navigate(`/collection/${collection.id}`);
    Logger("Collection clicked", collection);
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
      Logger("Collection deleted", collection);
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
      Logger("Collection renamed", updatedCollection);
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
            Logger("Create collection button clicked");
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
                    Logger("Collection double clicked", collection);
                  }}
                  onDelete={(collection) => {
                    handleDeleteCollection(collection);
                    Logger("Collection deleted", collection);
                  }}
                  onRename={(collection, newName) => {
                    handleRenameCollection(collection, newName);
                    Logger("Collection renamed", collection);
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
          Logger("Create collection modal closed");
        }}
        onCreate={(newCollection) => {
          handleCreateCollection(newCollection);
          Logger("Collection created", newCollection);
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
            Logger("Snackbar closed");
          }}
        />
      )}
    </div>
  );
};
