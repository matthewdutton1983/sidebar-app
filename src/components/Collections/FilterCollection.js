import { Box, Chip, Typography } from "@mui/material";
import { Label } from "@mui/icons-material";
import "./Collection.styles.css";

export const FilterCollection = ({ collection, documents, onFilter }) => {
  const allLabels = documents.flatMap((doc) => doc.labels || []);

  const labelsMap = new Map();
  allLabels.forEach((label) => labelsMap.set(label.parentId, label));

  const uniqueLabels = Array.from(labelsMap.values());

  const collectionLabelsMap = new Map();
  collection.labels.forEach((label) =>
    collectionLabelsMap.set(label.id, label)
  );

  uniqueLabels.sort((a, b) => {
    const aCreatedDate = new Date(
      collectionLabelsMap.get(a.parentId).createdDate
    );
    const bCreatedDate = new Date(
      collectionLabelsMap.get(b.parentId).createdDate
    );
    return aCreatedDate - bCreatedDate;
  });

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
              <Label
                style={{
                  color: label.color,
                }}
              />
            }
            onClick={() => onFilter(label.parentId)}
          />
        ))}
      </Box>
    </div>
  );
};
