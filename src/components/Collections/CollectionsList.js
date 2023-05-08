import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { CreateCollectionModal } from "../Modals/CreateCollectionModal";
import { CollectionCard } from "./CollectionCard";
import { Logger } from "../../Logger";
import { Collection } from "../../models/Collection";
import "./Collection.styles.css";

export const CollectionsList = () => {
  const [collections, setCollections] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const response = await Collection.fetchCollections();
        setCollections(response);
        console.log("Collections loaded successfully", response);
      } catch (error) {
        console.error("Error loading collections", error);
      }
    };
    loadCollections();
  }, []);

  const handleCollectionClick = async (collection) => {
    try {
      const fetchedCollection = await Collection.fetchCollectionById(
        collection.id
      );
      if (fetchedCollection) {
        navigate(`/collection/${fetchedCollection.id}`);
        console.log("Collection clicked", fetchedCollection);
      } else {
        console.error(`Collection with ID ${collection.id} not found`);
      }
    } catch (error) {
      console.error(`Error fetching collection ${collection.id}`, error);
    }
  };

  const handleDeleteCollection = async (collection) => {
    try {
      await Collection.deleteCollection(collection);
      setCollections(collections.filter((c) => c.id !== collection.id));
      console.log("Collection deleted", collection);
    } catch (error) {
      console.error("Error deleting collection", error);
    }
  };

  const handleRenameCollection = async (collection, newName) => {
    try {
      console.log("Renaming collection with ID", collection.id, "to", newName);
      const updatedCollection = await Collection.renameCollection(
        collection,
        newName
      );
      console.log("PUT request succeeded:", updatedCollection);
      setCollections(
        collections.map((c) =>
          c.id === updatedCollection.id ? updatedCollection : c
        )
      );
      Logger("Collection renamed", updatedCollection);
    } catch (error) {
      console.error("Error renaming collection", error);
    }
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    console.log("Create collection modal closed");
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
            console.log("Create collection button clicked");
          }}
        >
          Create Collection
        </Button>
      </div>

      {collections && collections.length === 0 ? (
        <div className="no-collections-message">
          <Typography variant="h5" sx={{ marginTop: "16px" }}>
            There are no collections in your workspace.
          </Typography>
        </div>
      ) : (
        <div className="collection-cards-container">
          {collections.map((collection) => (
            <div key={collection.id}>
              {collection && collection.name && (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onDoubleClick={() => {
                    handleCollectionClick(collection);
                    console.log("Collection double clicked", collection);
                  }}
                  onDelete={(collection) => {
                    handleDeleteCollection(collection);
                    console.log("Collection deleted", collection);
                  }}
                  onRename={(collection, newName) => {
                    handleRenameCollection(collection, newName);
                    console.log("Collection renamed", collection);
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
        onCreate={async (newCollection) => {
          if (!newCollection.id) {
            console.error("New collection has no ID");
            return;
          }
          setCollections((prevCollections) => [
            ...prevCollections,
            newCollection,
          ]);
          setIsCreateModalOpen(false);
          Logger("New collection created", newCollection);
          navigate(`/collection/${newCollection.id}`);
        }}
        // TODO: Render the other modals in the same way
      />
    </div>
  );
};
