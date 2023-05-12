import {
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { SellRounded } from "@mui/icons-material";
import { useState } from "react";
import { NewLabelForm } from "./NewLabelForm";
import "./DocumentsList.styles.css";

export const LabelsMenu = ({ onClick, onClose, style }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isNewLabelFormOpen, setIsNewLabelFormOpen] = useState(false);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [labels, setLabels] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl({
      left: event.clientX,
      top: event.clientY + 4,
    });
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
    setLabels((prevLabels) => {
      const newLabels = prevLabels.map((label, i) =>
        i === index ? { ...label, isSelected: !label.isSelected } : label
      );
      const anySelected = newLabels.some((label) => label.isSelected);
      setIsCheckboxSelected(anySelected);
      return newLabels;
    });
  };

  return (
    <>
      <div style={style}>
        <IconButton
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
          anchorPosition={anchorEl}
          anchorReference="anchorPosition"
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            style: {
              minWidth: "300px",
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
          {isCheckboxSelected ? (
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
              <Button color="primary" variant="contained">
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
        <NewLabelForm onClose={handleCloseNewLabelForm} setLabels={setLabels} />
      )}
    </>
  );
};
