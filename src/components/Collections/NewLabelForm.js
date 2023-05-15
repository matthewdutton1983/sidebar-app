import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import "./DocumentsList.styles.css";

export const NewLabelForm = ({ onClose, setLabels, collection }) => {
  const [labelText, setLabelText] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [labelTextError, setLabelTextError] = useState(false);
  const [labelColorError, setLabelColorError] = useState(false);

  const handleSubmit = async () => {
    console.log("collection:", collection);
    if (labelText.trim() && selectedColor) {
      setLabelTextError(false);
      setLabelColorError(false);
      const newLabel = {
        text: labelText,
        color: selectedColor,
        createdBy: "Matthew Dutton",
      };
      setLabels((prevLabels) => [...prevLabels, newLabel]);
      try {
        await collection.createLabel(newLabel);
        onClose();
      } catch (error) {
        console.error("Error creating label", error);
      }
    } else {
      if (!labelText.trim()) setLabelTextError(true);
      if (!selectedColor) setLabelColorError(true);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const colors = [
    "#FDD663",
    "#F28B82",
    "#C58AF9",
    "#78D9EC",
    "#3C4043",
    "#FCAD70",
    "#FF8BCB",
    "#669DF6",
    "#81C995",
    "#D3D6DB",
  ];

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Label</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          variant="outlined"
          margin="dense"
          label="Label name"
          type="text"
          value={labelText}
          onChange={(e) => setLabelText(e.target.value)}
          fullWidth
          error={labelTextError}
          helperText={labelTextError ? "Label name is required" : ""}
          autoComplete="off"
        />
        <Typography
          variant="subtitle1"
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          Choose a color:
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => handleColorChange({ hex: color })}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                marginRight: "10px",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              {selectedColor === color && selectedColor !== null && (
                <CheckIcon
                  style={{
                    color: selectedColor === "#3C4043" ? "#fff" : "#000",
                    fontSize: "20px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        {labelColorError && (
          <Typography
            color="error"
            variant="body2"
            style={{ paddingTop: "16px" }}
          >
            Please select a color for your new label
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            style={{ marginRight: "16px", marginBottom: "16px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            style={{ marginRight: "16px", marginBottom: "16px" }}
          >
            Create
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
