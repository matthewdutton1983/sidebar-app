import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { worker } from "pdfjs-dist/legacy/build/pdf.worker.entry";
import { useLocation, Link } from "react-router-dom";
import { ButtonGroup, Button, IconButton, Typography } from "@mui/material";
import { HomeRounded } from "@mui/icons-material";
import { leftTools, rightTools } from "../components/Toolbar/ToolsData";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { ContextMenu } from "../components/ContextMenu/ContextMenu";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./SmartViewerPage.styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const SmartViewerPage = () => {
  const location = useLocation();
  const fetchedDocument = location.state?.fetchedDocument;
  const [selectedText, setSelectedText] = useState("");
  const [contextMenuActive, setContextMenuActive] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const [numPages, setNumPages] = useState(null);
  const [displayMode, setDisplayMode] = useState("pdf");

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
    console.log(annotation);
  };

  const handleSearch = () => {
    alert(`Searching for: "${selectedText}"`);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="container">
      <div
        className="first-row"
        style={{
          height: "75px",
          paddingLeft: "16px",
          paddingRight: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <IconButton>
            <HomeRounded sx={{ fontSize: "36px" }} />
          </IconButton>
        </Link>
        {fetchedDocument ? (
          <>
            <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
              {fetchedDocument.name}
            </Typography>
          </>
        ) : (
          <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
            Document not found
          </Typography>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "32px",
          }}
        >
          <ButtonGroup variant="contained" aria-label="Display mode switch">
            <Button
              onClick={() => setDisplayMode("pdf")}
              disabled={displayMode === "pdf"}
            >
              Original
            </Button>
            <Button
              onClick={() => setDisplayMode("text")}
              disabled={displayMode === "text"}
            >
              Text
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="second-row">
        <div className="first-column">
          <Toolbar tools={leftTools} position="left" />
        </div>
        <div className="second-column" onMouseUp={handleMouseUp}>
          <div className="document-content">
            {fetchedDocument && displayMode === "pdf" ? (
              <Document
                file={fetchedDocument.content}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                  />
                ))}
              </Document>
            ) : fetchedDocument && displayMode === "text" ? (
              <div className="document-text">{fetchedDocument.text}</div>
            ) : (
              <Typography variant="h6" align="center">
                No document loaded
              </Typography>
            )}
          </div>
          <ContextMenu
            active={contextMenuActive}
            position={contextMenuPosition}
            onAnnotate={handleAnnotateText}
            onSearch={handleSearch}
          />
        </div>
        <div className="third-column">
          <Toolbar tools={rightTools} position="right" />
        </div>
      </div>
    </div>
  );
};
