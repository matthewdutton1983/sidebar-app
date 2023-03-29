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
import { DocumentItem } from "../components/Collection/DocumentItem";
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
    localStorage.setItem("collections", JSON.stringify(collections));
    setCollection(updatedCollection);
  };

  const setAddedDocuments = (documents) => {
    const updatedCollection = {
      ...collection,
      documents: collection.documents.concat(
        documents.map((doc) => ({ name: doc.name, path: doc.path }))
      ),
    };
    collections[collectionIndex] = updatedCollection;
    localStorage.setItem("collections", JSON.stringify(collections));
    setCollection(updatedCollection);
    setIsModalOpen(false);
  };

  const handleAllDocumentsChecked = (event) => {
    const updatedCollection = {
      ...collection,
      documents: collection.documents.map((doc) => ({
        ...doc,
        checked: event.target.checked,
      })),
    };
    collections[collectionIndex] = updatedCollection;
    localStorage.setItem("collections", JSON.stringify(collections));
    setCollection(updatedCollection);
    setAllDocumentsChecked(event.target.checked);
  };

  const handleCheckboxChange = (event, index) => {
    const updatedDocuments = [...collection.documents];
    updatedDocuments[index].checked = event.target.checked;
    const updatedCollection = { ...collection, documents: updatedDocuments };
    collections[collectionIndex] = updatedCollection;
    localStorage.setItem("collections", JSON.stringify(collections));
    setCollection(updatedCollection);
  };

  if (!collection) {
    return (
      <div className="collection-page">
        <div className="top-row">
          <Link to="/" style={{ textDecoration: "none" }}>
            <IconButton>
              <HomeRounded sx={{ fontSize: "36px" }} />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
            Collection not found
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <div className="top-row">
        <Link to="/" style={{ textDecoration: "none" }}>
          <IconButton>
            <HomeRounded sx={{ fontSize: "36px" }} />
          </IconButton>
        </Link>
        <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
          {collection.name}
        </Typography>
        {collection.documents.length >= 1 && (
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
      </div>
      <div className="middle-row">
        <div className="middle-row-left">
          <div className="centered-container" style={{ alignItems: "center" }}>
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
              {`Documents ${collection.documents.length > 0 ? 1 : 0}-${
                collection.documents.length
              } of ${collection.documents.length}`}
            </Typography>
            <IconButton>
              <InfoRounded />
            </IconButton>
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
        <div className="middle-row-right"></div>
      </div>
      <div className="bottom-row" style={{ alignItems: "flex-start" }}>
        <div className="bottom-row-left">
          {collection.documents.length === 0 ? (
            <div>
              <Typography
                variant="h5"
                color="textSecondary"
                style={{ marginBottom: "32px" }}
              >
                Add documents to your collection
              </Typography>
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
            </div>
          ) : (
            <div className="document-list-wrapper">
              {collection.documents.map((doc, index) => (
                <DocumentItem
                  key={index}
                  doc={doc}
                  index={index}
                  handleCheckboxChange={handleCheckboxChange}
                  handleDeleteDocument={handleDeleteDocument}
                />
              ))}
            </div>
          )}
        </div>
        <div className="bottom-row-right" style={{ width: "450px" }}>
          <Typography
            variant="h6"
            fontWeight="normal"
            gutterBottom
            sx={{ paddingLeft: "16px", paddingTop: "16px" }}
          >
            Filter collection
          </Typography>
        </div>
      </div>
      <AddDocumentsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onDocumentsAdded={setAddedDocuments}
      />
    </div>
  );
};
