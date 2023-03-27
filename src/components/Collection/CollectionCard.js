import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { DeleteRounded, EditRounded, MoreVertRounded } from "../IconImports";
import { DeleteCollectionModal } from "./DeleteCollectionModal";
import FaceIcon from "@mui/icons-material/Face";
import React, { useState } from "react";

export const CollectionCard = ({ collection, onDoubleClick, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      className="collection-card"
      onDoubleClick={() => onDoubleClick(collection)}
    >
      <CardContent
        className="collection-card-content"
        style={{ display: "flex", flexDirection: "column", marginTop: "-20px" }}
      >
        <div
          className="card-menu"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignSelf: "stretch",
          }}
        >
          <IconButton onClick={handleMenuClick}>
            <MoreVertRounded />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                alert("TODO: Rename clicked");
                handleMenuClose();
              }}
            >
              <EditRounded sx={{ marginRight: "8px" }} />
              Rename
            </MenuItem>
            <MenuItem
              onClick={() => {
                setShowDeleteModal(true);
                handleMenuClose();
              }}
            >
              <DeleteRounded sx={{ marginRight: "8px" }} />
              Delete
            </MenuItem>
          </Menu>
        </div>
        <div className="collection-header" style={{ alignSelf: "flex-start" }}>
          <Chip
            icon={<FaceIcon />}
            label={`${collection.created_by}`}
            style={{ marginRight: "8px" }}
          />
          <Typography variant="h6">{collection.name}</Typography>
        </div>
        <div className="collection-info" style={{ alignSelf: "flex-start" }}>
          <Typography variant="body1">
            Created on: {collection.created_date}
          </Typography>
          <Typography variant="body1">
            Documents: {collection.documents.length}
          </Typography>
        </div>
      </CardContent>
      <DeleteCollectionModal
        open={showDeleteModal}
        handleConfirm={() => {
          onDelete(collection);
          setShowDeleteModal(false);
        }}
        handleCancel={() => setShowDeleteModal(false)}
      />
    </Card>
  );
};
