import { Modal, Typography, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import "./Modals.styles.css";

export const AddDocumentsModal = ({ open, onClose }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Modal open={open} onClose={onClose} className="modal">
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
  );
};
