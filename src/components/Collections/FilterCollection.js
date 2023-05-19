import { Box, Chip, Typography } from "@mui/material";
import "./Collection.styles.css";

export const FilterCollection = ({ documents }) => {
  const allLabels = documents.flatMap((doc) => doc.labels || []);
  const labelsMap = new Map();
  allLabels.forEach((label) => labelsMap.set(label.parentId, label));
  const uniqueLabels = Array.from(labelsMap.values());
  console.log("uniqueLabels:", uniqueLabels);

  return (
    <div>
      <Typography
        variant="h6"
        fontWeight="normal"
        gutterBottom
        sx={{ paddingLeft: "16px", paddingTop: "16px" }}
      >
        Filter collection
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight="normal"
        gutterBottom
        sx={{ paddingLeft: "16px", paddingTop: "16px" }}
      >
        By label
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          paddingLeft: "16px",
          paddingTop: "16px",
          gap: "8px",
        }}
      >
        {uniqueLabels.map((label) => (
          <Chip
            key={label.id}
            label={label.text}
            variant="outlined"
            style={{
              borderColor: "lightgray",
              color: "black",
              paddingLeft: "8px",
            }}
            icon={
              <span
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  backgroundColor: label.color,
                }}
              />
            }
          />
        ))}
      </Box>
    </div>
  );
};
