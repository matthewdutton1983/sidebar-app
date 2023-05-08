import { IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";

export const DeleteButton = ({ onClick }) => {
  return (
    <IconButton edge="end" aria-label="delete" onClick={onClick} size="small">
      <DeleteRounded />
    </IconButton>
  );
};
