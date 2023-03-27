import { Link, useParams } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { AddRounded, HomeRounded } from "../components/IconImports";
import { AddDocumentsModal } from "../components/Modals/AddDocumentsModal";
import { CollectionNotFound } from "../components/Collection/CollectionNotFound";
import "../components/Collection/Collection.styles.css";

export const CollectionPage = () => {
  const { collectionId } = useParams();

  const collections = JSON.parse(localStorage.getItem("collections")) || [];
  const collection = collections.find((c) => String(c.id) === collectionId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!collection) {
    return <CollectionNotFound />;
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
          ) : null}
        </div>
      </div>
      <AddDocumentsModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
