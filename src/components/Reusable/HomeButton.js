import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { HomeRounded } from "@mui/icons-material";

export const HomeButton = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <IconButton>
        <HomeRounded sx={{ fontSize: "36px" }} />
      </IconButton>
    </Link>
  );
};
