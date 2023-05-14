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

export const NewLabelForm = ({ onClose, setLabels }) => {
  const [labelText, setLabelText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FDD663");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (labelText.trim()) {
      setError(false);
      setLabels((prevLabels) => [
        ...prevLabels,
        { text: labelText, color: selectedColor, isSelected: false },
      ]);
      onClose();
    } else {
      setError(true);
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
          error={error}
          helperText={error ? "Label name is required" : ""}
        />
        <Typography
          variant="subtitle1"
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          Choose a color:
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {colors.map((color, index) => (
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
              {selectedColor === color && (
                <CheckIcon
                  style={{
                    color: index === 5 ? "#fff" : "#000",
                    fontSize: "20px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
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
