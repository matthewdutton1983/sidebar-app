import {
  IconButton,
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { StyledListItem } from "../../StyledComponents";
import { DeleteRounded } from "../../IconImports";
import { labelColors } from "../../../utils/labelColors";
import { useManageTemplates } from "./useManageTemplates";

export const ManageTemplates = () => {
  const {
    selectedTab,
    newTemplateName,
    newTemplateLabels,
    newLabelValue,
    handleInputChange,
    handleLabelInputChange,
    handleAddNewLabel,
    handleDeleteLabel,
    handleCreateTemplate,
    handleTabChange,
    handleCloseDrawer,
    isCreateTemplateEnabled,
  } = useManageTemplates();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Manage Templates
      </Typography>
      <br />
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        style={{ borderBottom: "1px solid #e8e8e8" }}
      >
        <Tab label="Select Existing Template" />
        <Tab label="Create New Template" />
      </Tabs>
      <br />
      {selectedTab === 0 && (
        <Box mt={2}>
          <Typography variant="body1">TODO: Existing Templates</Typography>
        </Box>
      )}
      {selectedTab === 1 && (
        <>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography fontWeight={"bold"}>
                  Please enter a name for this template
                </Typography>
                <TextField
                  value={newTemplateName}
                  placeholder="This is a required field"
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Box>
            </Grid>
            <Grid container item xs={12} alignItems="flex-start" spacing={2}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography fontWeight={"bold"}>
                    Add a label and press Enter:
                  </Typography>
                  <TextField
                    value={newLabelValue}
                    placeholder="This is a required field"
                    onChange={handleLabelInputChange}
                    margin="normal"
                    variant="outlined"
                    required
                    sx={{ flex: "1", width: "100%" }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleAddNewLabel();
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography fontWeight={"bold"}>
                    Label names ({newTemplateLabels.length})
                  </Typography>
                  <Box sx={{ marginTop: "16px", width: "100%" }}>
                    {newTemplateLabels.map((label, index) => (
                      <StyledListItem
                        key={index}
                        color={labelColors[index % labelColors.length]}
                        sx={{
                          flex: 1,
                          minHeight: "48px",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <Typography variant="body1">{label}</Typography>
                        <Box sx={{ marginLeft: "auto" }}>
                          <IconButton
                            onClick={() => handleDeleteLabel(index)}
                            sx={{
                              paddingRight: "16px",
                              bgcolor: "transparent",
                              "&:hover": { bgcolor: "transparent" },
                            }}
                          >
                            <DeleteRounded />
                          </IconButton>
                        </Box>
                      </StyledListItem>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTemplate}
            disabled={!isCreateTemplateEnabled()}
          >
            Create
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseDrawer}
            style={{ marginRight: "16px" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
