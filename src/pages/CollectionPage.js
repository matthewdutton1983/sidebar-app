import { Link, useParams } from "react-router-dom";
import { Button, IconButton, Checkbox, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { AddRounded, DeleteRounded, HomeRounded } from "@mui/icons-material";
import { AddDocumentsModal } from "../components/Modals/AddDocumentsModal";
import { DocumentsList } from "../components/Documents/DocumentsList";
import { EmptyCollection } from "../components/Collections/EmptyCollection";
import { FilterCollection } from "../components/Collections/FilterCollection";
import { Collection } from "../models/Collection";
import { Logger } from "../Logger";
import "../components/Collections/Collection.styles.css";

export const CollectionPage = () => {
  const { collectionId } = useParams();

  const [collection, setCollection] = useState(new Collection());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchActiveCollection = async () => {
      try {
        const response = await Collection.fetchCollectionById(collectionId);
        const fetchedCollection = new Collection(
          response.id,
          response.name,
          response.createdBy,
          response.createdDate,
          response.documents.map((doc) => ({
            id: doc.id,
            name: doc.fileName,
            type: doc.fileType,
          }))
        );
        setCollection(fetchedCollection);
        Logger("Collection loaded successfully", response);
      } catch (error) {
        Logger(`Error loading collection ${collectionId}`, error);
      }
    };
    fetchActiveCollection();
  }, [collectionId]);

  const handleDeleteDocument = (documentIndex) => {
    const updatedCollection = {
      ...collection,
      documents: collection.documents.filter(
        (doc, index) => index !== documentIndex
      ),
    };
    setCollection(updatedCollection);
  };

  const handleAllDocumentsChecked = (event) => {
    const updatedDocuments = collection.documents.map((doc) => ({
      ...doc,
      checked: event.target.checked,
    }));
    console.log("updatedDocuments:", updatedDocuments);
    const updatedCollection = { ...collection, documents: updatedDocuments };
    setCollection(updatedCollection);
  };

  const areAllDocumentsChecked = () => {
    return collection.documents.every((doc) => doc.checked);
  };

  const handleCheckboxChange = (event, index) => {
    const updatedDocuments = [...collection.documents];
    updatedDocuments[index].checked = event.target.checked;
    const updatedCollection = { ...collection, documents: updatedDocuments };
    setCollection(updatedCollection);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            {collection && collection.documents.length > 0 && (
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
      {collection && collection?.documents.length > 0 && (
        <div className="middle-row">
          <div className="centered-container" style={{ alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox color="primary" onChange={handleAllDocumentsChecked} />
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ flexGrow: 1, paddingRight: "8px" }}
              >
                {`Documents 1-${collection?.documents.length} of ${collection?.documents.length}`}
              </Typography>
            </div>
            {areAllDocumentsChecked() && (
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
            collection && collection?.documents.length === 0
              ? "center"
              : "flex-start",
        }}
      >
        <div className="bottom-row-left">
          {collection && collection?.documents.length === 0 ? (
            <EmptyCollection handleOpenModal={handleOpenModal} />
          ) : (
            <div className="document-list-wrapper">
              <DocumentsList
                documents={collection?.documents}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteDocument={handleDeleteDocument}
              />
            </div>
          )}
        </div>
        {collection && collection?.documents.length > 0 && (
          <div className="bottom-row-right" style={{ width: "450px" }}>
            <FilterCollection />
          </div>
        )}
      </div>
      <AddDocumentsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        collection={collection}
      />
    </div>
  );
};
