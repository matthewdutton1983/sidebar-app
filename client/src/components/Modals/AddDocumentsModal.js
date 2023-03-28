import { Modal, Typography, Button, Box, Tab, Tabs } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { logger } from "../../logger";
import axios from "axios";
import "./Modals.styles.css";

export const AddDocumentsModal = ({ open, onClose, onDocumentsAdded }) => {
  const [activeTab, setActiveTab] = useState(0);

  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     logger("Files dropped into the dropzone.", { acceptedFiles });
  //     onDocumentsAdded(acceptedFiles);
  //   },
  //   [onDocumentsAdded]
  // );

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Handle the response, e.g., add the uploaded file info to your collection
      logger(response.data);
    } catch (error) {
      console.error("Error uploading the file", error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  logger("Rendering AddDocumentsModal component.");

  return (
    <Modal open={open} onClose={onClose} className="modal">
      <Box sx={{ width: 1600, height: 800, bgcolor: "white" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            centered
            value={activeTab}
            onChange={handleTabChange}
            sx={{ flexGrow: 1, paddingTop: 1 }}
          >
            <Tab label="Other Methods" />
            <Tab label="Upload from Computer" />
          </Tabs>
        </Box>
        <Box
          sx={{
            p: 3,
            height: "calc(100% - 100px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {activeTab === 0 && (
            <div className="tab-content" style={{ flexGrow: 1 }}>
              <Typography variant="h6" color="textPrimary">
                Other methods
              </Typography>
              {/* code for uploading from computer */}
            </div>
          )}
          {activeTab === 1 && (
            <div className="tab-content" style={{ flexGrow: 1 }}>
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
                  width: "100%",
                  height: "calc(100% - 16px)",
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
          )}
        </Box>
      </Box>
    </Modal>
  );
};