import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { worker } from "pdfjs-dist/legacy/build/pdf.worker.entry";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import "./Document.styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const DocumentWindow = ({ document, onAnnotate }) => {
  const [selectedText, setSelectedText] = useState("");
  const [contextMenuActive, setContextMenuActive] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const [numPages, setNumPages] = useState(null);

  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setContextMenuPosition({
        x: rect.left,
        y: rect.top - 40,
      });

      setSelectedText(selectedText);
      setContextMenuActive(true);
    } else {
      setContextMenuActive(false);
    }
  };

  const handleAnnotateText = () => {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();

    if (selectedText.length === 0) {
      return;
    }

    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    const span = document.createElement("span");
    span.style.backgroundColor = "#09A1AD";
    span.dataset.startOffset = startOffset;
    span.dataset.endOffset = endOffset;
    range.surroundContents(span);

    const annotation = {
      text: selectedText,
      start: startOffset,
      end: endOffset,
      timestamp: new Date(),
    };
    onAnnotate(annotation);
  };

  const handleSearch = () => {
    alert(`Searching for: "${selectedText}"`);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="document" onMouseUp={handleMouseUp}>
      <Document file={document.content} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      <ContextMenu
        active={contextMenuActive}
        position={contextMenuPosition}
        onAnnotate={handleAnnotateText}
        onSearch={handleSearch}
      />
    </div>
  );
};
