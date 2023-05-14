import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { AddDocumentsModal } from "../components/Modals/AddDocumentsModal";
import { DocumentsList } from "../components/Collections/DocumentsList";
import { EmptyCollection } from "../components/Collections/EmptyCollection";
import { FilterCollection } from "../components/Collections/FilterCollection";
import { HomeButton } from "../components/Reusable/HomeButton";
import { Collection } from "../models/Collection";
import { Logger } from "../Logger";
import "../components/Collections/Collection.styles.css";

export const CollectionPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(new Collection());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [labels, setLabels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveCollection = async () => {
      try {
        console.log(`Fetching details for collection ${collectionId}`);

        const collection = await Collection.fetchCollectionById(collectionId);

        const fetchedCollection = new Collection(
          collection.id,
          collection.name,
          collection.createdBy,
          collection.createdDate
        );

        fetchedCollection.documents = collection.documents.map((doc) => ({
          id: doc.id,
          name: doc.fileName,
          type: doc.fileType,
        }));

        fetchedCollection.labels = collection.labels
          .map((label) => ({
            id: label.id,
            text: label.text,
            color: label.color,
            createdBy: label.createdBy,
            createdDate: label.createdDate,
          }))
          .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

        console.log("Collection loaded successfully", collection);

        setCollection(fetchedCollection);
        setLabels(fetchedCollection.labels);
      } catch (error) {
        Logger(`Error loading collection ${collectionId}`, error);
      }
    };
    fetchActiveCollection();
  }, [collectionId]);

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

  const handleDeleteDocument = async (documentId) => {
    try {
      console.log("Deleting document:", documentId);
      await collection.removeDocument(documentId);
      const updatedCollection = {
        ...collection,
        documents: collection.documents.filter((doc) => doc.id !== documentId),
      };
      setCollection(updatedCollection);
    } catch (error) {
      console.error(`Error deleting document`, error);
    }
  };

  return (
    <div className="collection-page">
      <div
        className="top-row"
        style={{
          height: "75px",
          paddingLeft: "16px",
          paddingRight: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <HomeButton />
          {collection ? (
            <>
              <Typography
                variant="h5"
                sx={{ flexGrow: 1, paddingLeft: "16px" }}
              >
                {collection.name}
              </Typography>
            </>
          ) : (
            <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
              Collection not found
            </Typography>
          )}
        </div>
      </div>
      <div className="bottom-row">
        {collection && collection?.documents.length > 0 && (
          <div className="bottom-row-left">
            <DocumentsList
              documents={collection?.documents}
              handleCheckboxChange={handleCheckboxChange}
              handleDeleteDocument={handleDeleteDocument}
              handleDocumentDoubleClick={handleDocumentDoubleClick}
              handleAllDocumentsChecked={handleAllDocumentsChecked}
              areAllDocumentsChecked={areAllDocumentsChecked}
              handleOpenModal={handleOpenModal}
              labels={labels}
              setLabels={setLabels}
            />
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
