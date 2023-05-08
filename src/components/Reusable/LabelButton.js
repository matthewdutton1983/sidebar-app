import { IconButton } from "@mui/material";
import { LabelRounded } from "@mui/icons-material";

export const LabelButton = ({ onClick }) => {
  return (
    <IconButton edge="end" aria-label="label" onClick={onClick} size="small">
      <LabelRounded />
    </IconButton>
  );
};
