import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Checkbox,
  Pagination,
  Typography,
} from "@mui/material";
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
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 50;
  const totalPages = Math.ceil(collection?.documents.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleDocuments = collection?.documents.slice(startIndex, endIndex);

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

  const handlePageChange = (event, value) => {
    console.log("event:", event);
    setPage(value);
  };

  const handleDocumentDoubleClick = async (documentId) => {
    try {
      console.log("documentId:", documentId);
      const response = await collection.fetchDocumentById(documentId);
      console.log("response:", response);

      const uint8Array = Uint8Array.from(atob(response.content), (c) =>
        c.charCodeAt(0)
      );
      const blob = new Blob([uint8Array], { type: "application/pdf" });

      const objectUrl = URL.createObjectURL(blob);

      navigate(`/collection/${collectionId}/documents/${documentId}`, {
        state: { fetchedDocument: { ...response, content: objectUrl } },
      });
    } catch (error) {
      console.error(`Error loading document ${documentId}`, error);
    }
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
          </>
        ) : (
          <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
            Collection not found
          </Typography>
        )}
      </div>
      {collection && collection?.documents.length > 0 && (
        <div
          className="middle-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              color="primary"
              checked={areAllDocumentsChecked()}
              onChange={handleAllDocumentsChecked}
            />
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ paddingRight: "8px" }}
            >
              {`Documents 1-${collection?.documents.length} of ${collection?.documents.length}`}
            </Typography>
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
          <Button
            variant="contained"
            onClick={handleOpenModal}
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <AddRounded sx={{ paddingRight: "8px" }} />
            Add Documents
          </Button>
        </div>
      )}
      <div className="bottom-row">
        {collection && collection?.documents.length > 0 && (
          <div className="bottom-row-left">
            <div className="document-list-wrapper">
              <DocumentsList
                documents={visibleDocuments}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteDocument={handleDeleteDocument}
                handleDocumentDoubleClick={handleDocumentDoubleClick}
              />
            </div>
            <div className="pagination-container">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
                size="large"
              />
            </div>
          </div>
        )}
        {collection && collection?.documents.length === 0 && (
          <div className="empty-collection-container">
            <EmptyCollection handleOpenModal={handleOpenModal} />
          </div>
        )}
        {collection && collection?.documents.length > 0 && (
          <div className="bottom-row-right">
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
