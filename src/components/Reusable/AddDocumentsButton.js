import { Button } from "@mui/material";

export const AddDocumentsButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        marginLeft: "16px",
      }}
    >
      Add Documents
    </Button>
  );
};
