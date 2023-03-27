import { Link, useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AddRounded, HomeRounded } from "../components/IconImports";
import { AddDocumentsModal } from "../components/Modals/AddDocumentsModal";
import "../components/Collection/Collection.styles.css";

export const CollectionPage = () => {
  const { collectionId } = useParams();

  const collections = JSON.parse(localStorage.getItem("collections")) || [];
  const collectionIndex = collections.findIndex(
    (c) => String(c.id) === collectionId
  );
  const collection = collections[collectionIndex];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    setIsModalOpen(false);
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
          <Button variant="contained" onClick={handleOpenModal}>
            <AddRounded sx={{ paddingRight: "8px" }} />
            Add Documents
          </Button>
        )}
      </div>
      <div className="bottom-row">
        <div className="centered-container" style={{ textAlign: "center" }}>
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
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <AddRounded sx={{ paddingRight: "8px" }} />
                Add Documents
              </Button>
            </div>
          ) : (
            <List>
              {collection.documents.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemText primary={doc.name} secondary={doc.path} />
                </ListItem>
              ))}
            </List>
          )}
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
