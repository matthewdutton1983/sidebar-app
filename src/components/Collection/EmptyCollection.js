import { Button, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
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
        <Button
          variant="contained"
          onClick={handleOpenModal}
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <AddRounded sx={{ paddingRight: "8px" }} />
          Add Documents
        </Button>
      </div>
    </div>
  );
};
