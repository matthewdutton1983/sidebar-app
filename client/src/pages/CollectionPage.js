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
import { DocumentList } from "../components/Collection/DocumentList";
import { EmptyCollection } from "../components/Collection/EmptyCollection";
import { FilterCollection } from "../components/Collection/FilterCollection";
import axios from "axios";
import "../components/Collection/Collection.styles.css";

export const CollectionPage = () => {
  const { collectionId } = useParams();

  const collections = JSON.parse(localStorage.getItem("collections")) || [];
  const collectionIndex = collections.findIndex(
    (c) => String(c.id) === collectionId
  );
  const [collection, setCollection] = useState(collections[collectionIndex]);
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
    collections[collectionIndex] = updatedCollection;
    setCollection(updatedCollection);
  };

  const setAddedDocuments = async (documents, collectionId) => {
    console.log("collectionId in setAddedDocuments:", collectionId);

    if (documents.length > 0) {
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

    collections[collectionIndex] = updatedCollection;
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
    collections[collectionIndex] = updatedCollection;
    setCollection(updatedCollection);
    setAllDocumentsChecked(event.target.checked);
  };

  const handleCheckboxChange = (event, index) => {
    const updatedDocuments = [...collection.documents];
    updatedDocuments[index].checked = event.target.checked;
    const updatedCollection = { ...collection, documents: updatedDocuments };
    collections[collectionIndex] = updatedCollection;
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
            {collection.documents.length > 0 && (
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
      {collection && collection.documents.length > 0 && (
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
                {`Documents 1-${collection.documents.length} of ${collection.documents.length}`}
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
            collection && collection.documents.length === 0
              ? "center"
              : "flex-start",
        }}
      >
        <div className="bottom-row-left">
          {collection && collection.documents.length === 0 ? (
            <EmptyCollection handleOpenModal={handleOpenModal} />
          ) : (
            <div className="document-list-wrapper">
              <DocumentList
                documents={collection.documents}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteDocument={handleDeleteDocument}
                allDocumentsChecked={allDocumentsChecked}
              />
            </div>
          )}
        </div>
        {collection && collection.documents.length > 0 && (
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
