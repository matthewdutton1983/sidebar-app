import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { SellRounded } from "@mui/icons-material";
import { useState } from "react";

export const LabelButton = ({ onClick, onClose, style }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl({
      left: event.clientX,
      top: event.clientY,
    });
    onClick && onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose && onClose();
  };

  const handleCreateNewLabel = () => {
    // Add logic for creating a new label here
  };

  const labels = [];

  return (
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
          Label as...
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
          labels.map((label) => (
            <MenuItem onClick={handleClose}>{label}</MenuItem>
          ))
        )}
        <div
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            margin: "0 16px",
          }}
        />
        <Button
          onClick={handleCreateNewLabel}
          color="primary"
          style={{
            marginLeft: "16px",
            marginRight: "16px",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          Create new label
        </Button>
      </Menu>
    </div>
  );
};
