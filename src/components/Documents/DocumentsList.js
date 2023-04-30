import { DocumentItem } from "./DocumentItem";

export const DocumentsList = ({
  documents = [],
  handleCheckboxChange,
  handleDeleteDocument,
  handleDocumentDoubleClick,
}) => {
  console.log("documents:", documents);
  return (
    <div className="document-list-wrapper">
      {documents.map((doc, index) => (
        <DocumentItem
          key={index}
          doc={doc}
          index={index}
          handleCheckboxChange={handleCheckboxChange}
          handleDeleteDocument={handleDeleteDocument}
          handleDocumentDoubleClick={handleDocumentDoubleClick}
        />
      ))}
    </div>
  );
};
