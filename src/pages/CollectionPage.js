import { Link, useParams } from "react-router-dom";
import { Button, Typography, IconButton } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AddRounded, HomeRounded } from "../components/IconImports";
import { CollectionNotFound } from "../components/Collection/CollectionNotFound";
import "../App.css";

export const CollectionPage = () => {
  const { collectionId } = useParams();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const collections = JSON.parse(localStorage.getItem("collections")) || [];
  const collection = collections.find((c) => String(c.id) === collectionId);

  console.log("collectionId", collectionId);
  console.log("collections", collections);

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
        <Button variant="contained">
          <AddRounded sx={{ paddingRight: "8px" }} />
          Add Documents
        </Button>
      </div>
      <div className="bottom-row">
        <div className="centered-container">
          {collection.documents.length === 0 ? (
            <div>
              <Typography
                variant="h5"
                color="textSecondary"
                style={{ marginBottom: "32px", textAlign: "center" }}
              >
                Add documents to your collection
              </Typography>
              <div
                {...getRootProps()}
                className="dropzone"
                style={{
                  border: "4px dashed #ddd",
                  borderRadius: "2px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#aaaaaa",
                  width: "1250px",
                  height: "625px",
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
          ) : null}
        </div>
      </div>
    </div>
  );
};
