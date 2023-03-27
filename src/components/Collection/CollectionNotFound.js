import { Link } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { HomeRounded } from "../IconImports";
import "./Collection.styles.css";

export const CollectionNotFound = () => {
  return (
    <div className="collection-page">
      <div className="top-row">
        <Link to="/" style={{ textDecoration: "none" }}>
          <IconButton>
            <HomeRounded sx={{ fontSize: "36px" }} />
          </IconButton>
        </Link>
        <Typography variant="h5" sx={{ flexGrow: 1, paddingLeft: "16px" }}>
          Collection not found
        </Typography>
      </div>
    </div>
  );
};
