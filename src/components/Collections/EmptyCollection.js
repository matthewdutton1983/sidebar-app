import { Typography } from "@mui/material";
import { AddDocumentsButton } from "../Reusable/AddDocumentsButton";
import "./Collection.styles.css";

export const EmptyCollection = ({ handleOpenModal }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          color="textSecondary"
          style={{ marginBottom: "32px" }}
        >
          Add documents to your collection
        </Typography>
        <AddDocumentsButton onClick={handleOpenModal} />
      </div>
    </div>
  );
};
