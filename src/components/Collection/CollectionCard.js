import { useState } from "react";
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
  FaceRounded,
  InfoRounded,
  MoreVertRounded,
  ShareRounded,
} from "@mui/icons-material";
import { DeleteCollectionModal } from "../Modals/DeleteCollectionModal";
import { RenameCollectionModal } from "../Modals/RenameCollectionModal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { logger } from "../../logger";

export const CollectionCard = ({
  collection,
  onDoubleClick,
  onDelete,
  onRename,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showInfoMenu, setShowInfoMenu] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInfoMenuClick = () => {
    setShowInfoMenu(true);
  };

  const handleInfoMenuClose = () => {
    setShowInfoMenu(false);
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

  logger("CollectionCard component mounted.", { collection });

  return (
    <ThemeProvider theme={tooltipTheme}>
      <Card
        className="collection-card"
        onDoubleClick={() => {
          logger("CollectionCard double clicked.", { collection });
          onDoubleClick(collection);
        }}
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
              icon={<FaceRounded />}
              label={`${collection.createdBy}`}
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
                <MenuItem onClick={handleInfoMenuClick}>
                  <InfoRounded sx={{ marginRight: "24px" }} />
                  Info
                </MenuItem>
                <Menu
                  anchorEl={anchorEl}
                  open={showInfoMenu}
                  onClose={handleInfoMenuClose}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  <MenuItem>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Collection ID:&nbsp;&nbsp;
                    </Typography>
                    {collection.id}
                  </MenuItem>
                  <MenuItem>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Collection Name:&nbsp;&nbsp;
                    </Typography>
                    {collection.name}
                  </MenuItem>
                  <MenuItem>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Created By:&nbsp;&nbsp;
                    </Typography>
                    {collection.createdBy}
                  </MenuItem>
                  <MenuItem>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Created Date:&nbsp;&nbsp;
                    </Typography>
                    {collection.createdDate}
                  </MenuItem>
                  {/* <MenuItem>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Total Documents:&nbsp;&nbsp;
                    </Typography>
                    {collection.documents ? collection.documents.length : "0"}
                  </MenuItem> */}
                </Menu>
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
            <Tooltip
              className="tooltip"
              title={collection.name}
              onMouseEnter={() => {
                logger("Tooltip hovered.", { collection });
              }}
            >
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
              {`Documents: ${collection.documentCount}`}
            </Typography>
            <Typography variant="body1" style={{ alignSelf: "flex-end" }}>
              {collection.createdDate}
            </Typography>
          </div>
        </CardContent>
        <RenameCollectionModal
          open={showRenameModal}
          currentName={collection.name}
          handleConfirm={(newName) => {
            logger("RenameCollectionModal confirmed.", {
              collection,
              newName,
            });
            onRename(collection, newName);
            setShowRenameModal(false);
          }}
          handleCancel={() => {
            logger("RenameCollectionModal canceled.", { collection });
            setShowRenameModal(false);
          }}
        />
        <DeleteCollectionModal
          open={showDeleteModal}
          handleConfirm={() => {
            logger("DeleteCollectionModal confirmed.", { collection });
            onDelete(collection);
            setShowDeleteModal(false);
          }}
          handleCancel={() => {
            logger("DeleteCollectionModal canceled.", { collection });
            setShowDeleteModal(false);
          }}
        />
      </Card>
    </ThemeProvider>
  );
};
