import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteRounded,
  EditRounded,
  MoreVertRounded,
  ShareRounded,
} from "../IconImports";
import { DeleteCollectionModal } from "./DeleteCollectionModal";
import { RenameCollectionModal } from "./RenameCollectionModal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FaceIcon from "@mui/icons-material/Face";
import { useState } from "react";

export const CollectionCard = ({
  collection,
  onDoubleClick,
  onDelete,
  onRename,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const tooltipTheme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "dfe1e5",
            color: "#fff",
            borderRadius: "4px",
            padding: "8px",
            fontSize: "14px",
            fontWeight: "500",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={tooltipTheme}>
      <Card
        className="collection-card"
        onDoubleClick={() => onDoubleClick(collection)}
      >
        <CardContent
          className="collection-card-content"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className="card-header"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Chip
              icon={<FaceIcon />}
              label={`${collection.created_by}`}
              size="large"
            />
            <div style={{ flex: 1 }}></div>
            <div style={{ alignSelf: "flex-end" }}>
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
                    setShowRenameModal(true);
                    handleMenuClose();
                  }}
                >
                  <EditRounded sx={{ marginRight: "24px" }} />
                  Rename
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setShowDeleteModal(true);
                    handleMenuClose();
                  }}
                >
                  <DeleteRounded sx={{ marginRight: "24px" }} />
                  Delete
                </MenuItem>
                <MenuItem>
                  <ShareRounded sx={{ marginRight: "24px" }} />
                  Share
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div style={{ height: "100px" }}>
            <Tooltip className="tooltip" title={collection.name}>
              <Typography variant="h6" className="collection-name">
                {collection.name}
              </Typography>
            </Tooltip>
          </div>
          <div
            className="collection-info"
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" style={{ alignSelf: "flex-end" }}>
              {`Documents: ${collection.documents.length}`}
            </Typography>
            <Typography variant="body1" style={{ alignSelf: "flex-end" }}>
              {collection.created_date}
            </Typography>
          </div>
        </CardContent>
        <RenameCollectionModal
          open={showRenameModal}
          currentName={collection.name}
          handleConfirm={(newName) => {
            onRename(collection, newName);
            setShowRenameModal(false);
          }}
          handleCancel={() => setShowRenameModal(false)}
        />
        <DeleteCollectionModal
          open={showDeleteModal}
          handleConfirm={() => {
            onDelete(collection);
            setShowDeleteModal(false);
          }}
          handleCancel={() => setShowDeleteModal(false)}
        />
      </Card>
    </ThemeProvider>
  );
};
