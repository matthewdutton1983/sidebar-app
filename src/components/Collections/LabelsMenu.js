import {
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { SellRounded } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { NewLabelForm } from "./NewLabelForm";
import "./DocumentsList.styles.css";

export const LabelsMenu = ({
  onClick,
  onClose,
  style,
  labels,
  setLabels,
  setDocumentLabels,
  documentId,
  collection,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isNewLabelFormOpen, setIsNewLabelFormOpen] = useState(false);
  const [selectedLabelIndexes, setSelectedLabelIndexes] = useState([]);
  const open = Boolean(anchorEl);
  const menuRef = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    onClick && onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose && onClose();
  };

  const handleOpenNewLabelForm = () => {
    setIsNewLabelFormOpen(true);
  };

  const handleCloseNewLabelForm = () => {
    setIsNewLabelFormOpen(false);
  };

  const handleLabelSelect = (index) => {
    setSelectedLabelIndexes((prevIndexes) => {
      const updatedIndexes = [...prevIndexes];
      const labelIndex = updatedIndexes.indexOf(index);
      if (labelIndex !== -1) {
        updatedIndexes.splice(labelIndex, 1);
      } else {
        updatedIndexes.push(index);
      }
      return updatedIndexes;
    });
  };

  const handleApplyLabels = async () => {
    const selectedLabels = selectedLabelIndexes.map((index) => labels[index]);
    try {
      await collection.applyLabelsToDocument(documentId, selectedLabels);
      setDocumentLabels((prevDocumentLabels) => ({
        ...prevDocumentLabels,
        [documentId]: selectedLabels,
      }));
      handleClose();
    } catch (error) {
      console.error(`Failed to apply labels to document ${documentId}:`, error);
      alert("An error occurred while applying labels. Please try again.");
    }
  };

  useEffect(() => {
    setSelectedLabelIndexes([]);
  }, [documentId]);

  return (
    <>
      <div style={style}>
        <IconButton
          ref={menuRef}
          edge="end"
          aria-label="label"
          onClick={handleClick}
          size="small"
        >
          <SellRounded />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorReference="anchorEl"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              minWidth: "350px",
            },
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              marginLeft: "16px",
              marginRight: "16px",
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            Label this document as ...
          </Typography>
          {labels.length === 0 ? (
            <Typography
              variant="body2"
              color="textSecondary"
              style={{
                marginLeft: "16px",
                marginRight: "16px",
                marginBottom: "16px",
              }}
            >
              There are no labels in this collection
            </Typography>
          ) : (
            labels.map((label, index) => (
              <MenuItem
                key={index}
                onClick={(e) => e.stopPropagation()}
                style={{ paddingTop: "4px", paddingBottom: "4px" }}
              >
                <Checkbox
                  checked={label.isSelected}
                  onChange={() => handleLabelSelect(index)}
                  color="primary"
                  style={{ marginLeft: "-12px", marginRight: "0px" }}
                />
                <span style={{ color: "#000" }}>{label.text}</span>
                <div
                  style={{
                    marginLeft: "auto",
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: label.color,
                  }}
                />
              </MenuItem>
            ))
          )}
          <div
            style={{
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              marginTop: "16px",
            }}
          />
          {selectedLabelIndexes.length > 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: "16px",
                marginRight: "16px",
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                style={{ marginRight: "16px" }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleApplyLabels}
              >
                Apply
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleOpenNewLabelForm}
              color="primary"
              style={{
                marginLeft: "16px",
                marginRight: "16px",
                marginTop: "16px",
                marginBottom: "8px",
              }}
            >
              Create new label
            </Button>
          )}
        </Menu>
      </div>
      {isNewLabelFormOpen && (
        <NewLabelForm
          onClose={handleCloseNewLabelForm}
          setLabels={setLabels}
          collection={collection}
        />
      )}
    </>
  );
};
