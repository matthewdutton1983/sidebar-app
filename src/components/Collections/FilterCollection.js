import { Box, Button, Chip, Typography } from "@mui/material";
import { Label } from "@mui/icons-material";
import { LabelsMenu } from "./LabelsMenu";
import "./Collection.styles.css";
import { useState } from "react";

export const FilterCollection = ({
  collection,
  documents,
  onFilter,
  selectedFilters,
  clearSelectedFilter,
  setLabels,
  setDocumentLabels,
  documentId,
}) => {
  const [isLabelsMenuOpen, setIsLabelsMenuOpen] = useState(false);
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

  const labelsToDisplay =
    selectedFilters.length > 0
      ? uniqueLabels.filter(
          (label) => !selectedFilters.includes(label.parentId)
        )
      : uniqueLabels;

  const handleFilter = (filterId) => {
    const isFilterSelected = selectedFilters.includes(filterId);
    let updatedFilters;
    if (isFilterSelected) {
      updatedFilters = selectedFilters.filter((filter) => filter !== filterId);
    } else {
      updatedFilters = [...selectedFilters, filterId];
    }
    onFilter(updatedFilters);
  };

  const handleEditLabels = () => {
    setIsLabelsMenuOpen(!isLabelsMenuOpen);
  };

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
      {selectedFilters.length > 0 && (
        <Box
          sx={{
            display: "flex",
            paddingLeft: "16px",
            paddingTop: "16px",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {selectedFilters.map((filterId) => {
            const selectedLabel = collectionLabelsMap.get(filterId);
            return (
              <Chip
                key={selectedLabel.id}
                label={selectedLabel.text}
                variant="outlined"
                onDelete={() => clearSelectedFilter(filterId)}
                style={{
                  borderColor: "lightgray",
                }}
                icon={<Label style={{ color: selectedLabel.color }} />}
              />
            );
          })}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "16px",
        }}
      >
        <Typography key="label" variant="subtitle1" fontWeight="normal">
          By labels
        </Typography>
        {/* <Button onClick={handleEditLabels} color="primary" variant="text">
          Edit
        </Button> */}
      </Box>
      {isLabelsMenuOpen && (
        <LabelsMenu
          onClose={() => setIsLabelsMenuOpen(false)}
          labels={uniqueLabels}
          setLabels={setLabels}
          setDocumentLabels={setDocumentLabels}
          documentId={documentId}
          collection={collection}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          paddingLeft: "16px",
          paddingTop: "16px",
          gap: "8px",
        }}
      >
        {labelsToDisplay.map((label) => (
          <Chip
            key={label.id}
            label={label.text}
            variant="outlined"
            style={{
              borderColor: "lightgray",
            }}
            icon={
              <Label
                style={{
                  color: label.color,
                }}
              />
            }
            onClick={() => handleFilter(label.parentId)}
          />
        ))}
      </Box>
      <Typography
        key="people"
        variant="subtitle1"
        fontWeight="normal"
        gutterBottom
        sx={{ paddingLeft: "16px", paddingTop: "16px" }}
      >
        By people
      </Typography>
      <Typography
        key="organizations"
        variant="subtitle1"
        fontWeight="normal"
        gutterBottom
        sx={{ paddingLeft: "16px", paddingTop: "16px" }}
      >
        By organizations
      </Typography>
      <Typography
        key="locations"
        variant="subtitle1"
        fontWeight="normal"
        gutterBottom
        sx={{ paddingLeft: "16px", paddingTop: "16px" }}
      >
        By locations
      </Typography>
    </div>
  );
};
