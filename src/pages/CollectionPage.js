import { Link, useParams } from "react-router-dom";
import { Button, Modal, Typography, IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AddRounded, HomeRounded } from "../components/IconImports";
import { CollectionNotFound } from "../components/Collection/CollectionNotFound";
import "../components/Collection/Collection.styles.css";

export const CollectionPage = () => {
  const { collectionId } = useParams();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
        <Button variant="contained" onClick={handleOpenModal}>
          <AddRounded sx={{ paddingRight: "8px" }} />
          Add Documents
        </Button>
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
      <Modal open={isModalOpen} onClose={handleCloseModal} className="modal">
        <div className="modal-content">
          <div
            {...getRootProps()}
            className="dropzone"
            style={{
              border: "4px dashed #ddd",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#aaaaaa",
              width: "1600px",
              height: "800px",
              transition: "0.3s",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <Typography variant="h6" color="textPrimary">
                  Drag and drop files here
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "16px" }}
                >
                  or click to select files
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
