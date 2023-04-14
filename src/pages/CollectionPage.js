import { Link, useParams } from "react-router-dom";
import { Button, IconButton, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import {
  AddRounded,
  DeleteRounded,
  InfoRounded,
  HomeRounded,
} from "@mui/icons-material";
import { AddDocumentsModal } from "../components/Modals/AddDocumentsModal";
import { DocumentsList } from "../components/Documents/DocumentsList";
import { EmptyCollection } from "../components/Collections/EmptyCollection";
import { FilterCollection } from "../components/Collections/FilterCollection";
import axios from "axios";
import "../components/Collections/Collection.styles.css";

export const CollectionPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allDocumentsChecked, setAllDocumentsChecked] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteDocument = (documentIndex) => {
    const updatedCollection = {
      ...collection,
      documents: collection.documents.filter(
        (doc, index) => index !== documentIndex
      ),
    };
    setCollection(updatedCollection);
  };

  const setAddedDocuments = async (collectionId, documents) => {
    console.log("collectionId in setAddedDocuments:", collectionId);

    if (collection.documentCount > 0) {
      console.log(
        `Sending POST request to upload documents to /api/collections/${collectionId}/documents`
      );
      await axios.post(`/api/collections/${collectionId}/documents`, {
        documents,
      });

      documents.forEach((doc) => {
        console.log(`Uploaded document:`, doc);
      });
    }

    const updatedCollection = {
      ...collection,
      documents: collection.documents.concat(documents),
    };

    setCollection(updatedCollection);
    setIsModalOpen(false);
    console.log(`Updated collection:`, updatedCollection);
  };

  const handleAllDocumentsChecked = (event) => {
    const updatedDocuments = collection.documents.map((doc) => ({
      ...doc,
      checked: event.target.checked,
    }));
    const updatedCollection = { ...collection, documents: updatedDocuments };
    setCollection(updatedCollection);
    setAllDocumentsChecked(event.target.checked);
  };

  const handleCheckboxChange = (event, index) => {
    const updatedDocuments = [...collection.documents];
    updatedDocuments[index].checked = event.target.checked;
    const updatedCollection = { ...collection, documents: updatedDocuments };
    setCollection(updatedCollection);
  };

  return (
    <div className="collection-page">
      <div className="top-row">
        <Link to="/" style={{ textDecoration: "none" }}>
          <IconButton>
            <HomeRounded sx={{ fontSize: "36px" }} />
          </IconButton>
        </Link>
        {collection ? (
          <>
            <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
              {collection.name}
            </Typography>
            {collection?.documentCount > 0 && (
              <Button
                variant="contained"
                onClick={handleOpenModal}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <AddRounded sx={{ paddingRight: "8px" }} />
                Add Documents
              </Button>
            )}
          </>
        ) : (
          <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
            Collection not found
          </Typography>
        )}
      </div>
      {collection && collection?.documentCount > 0 && (
        <div className="middle-row">
          <div className="centered-container" style={{ alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                color="primary"
                checked={allDocumentsChecked}
                onChange={handleAllDocumentsChecked}
              />
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ flexGrow: 1, paddingRight: "8px" }}
              >
                {`Documents 1-${collection?.documentCount} of ${collection?.documentCount}`}
              </Typography>
              <IconButton>
                <InfoRounded />
              </IconButton>
            </div>
            {allDocumentsChecked && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => setCollection({ ...collection, documents: [] })}
              >
                <DeleteRounded />
              </IconButton>
            )}
          </div>
        </div>
      )}
      <div
        className="bottom-row"
        style={{
          alignItems:
            collection && collection?.documentCount === 0
              ? "center"
              : "flex-start",
        }}
      >
        <div className="bottom-row-left">
          {collection && collection?.documentCount === 0 ? (
            <EmptyCollection handleOpenModal={handleOpenModal} />
          ) : (
            <div className="document-list-wrapper">
              <DocumentsList
                documents={collection?.documents}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteDocument={handleDeleteDocument}
                allDocumentsChecked={allDocumentsChecked}
              />
            </div>
          )}
        </div>
        {collection && collection?.documentCount > 0 && (
          <div className="bottom-row-right" style={{ width: "450px" }}>
            <FilterCollection />
          </div>
        )}
      </div>
      <AddDocumentsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onDocumentsAdded={(documents) =>
          setAddedDocuments(collectionId, documents)
        }
        collectionId={collectionId}
      />
    </div>
  );
};
