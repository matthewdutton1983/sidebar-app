import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Drawer, Tab, Tabs, Typography } from "@mui/material";
import { ExistingTemplates } from "./ExistingTemplates";
import { CreateTemplate } from "./CreateTemplate";
import { labelColors } from "../../utils/labelColors";
import { logger } from "../../logger";

export const TemplateManager = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [existingTemplates, setExistingTemplates] = useState(() => {
    const storedTemplates = localStorage.getItem("existingTemplates");
    return storedTemplates ? JSON.parse(storedTemplates) : [];
  });
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateLabels, setNewTemplateLabels] = useState([]);
  const [newLabelValue, setNewLabelValue] = useState("");
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [newTemplateCreated, setNewTemplateCreated] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "existingTemplates",
      JSON.stringify(existingTemplates)
    );
  }, [existingTemplates]);

  const handleTabChange = (event, newSelectedTab) => {
    setSelectedTab(newSelectedTab);
    logger(`Selected tab changed to ${newSelectedTab}`);
  };

  const handleInputChange = (event) => {
    setNewTemplateName(event.currentTarget.value);
    logger(`Template name input value set to ${event.currentTarget.value}`);
  };

  const handleLabelInputChange = (event) => {
    setNewLabelValue(event.target.value);
    logger(`New label input value set to ${event.target.value}`);
  };

  const handleAddNewLabel = () => {
    if (newLabelValue.trim() !== "") {
      setNewTemplateLabels([...newTemplateLabels, newLabelValue.trim()]);
      setNewLabelValue("");
      logger("New label value added to template labels array");
    }
  };

  const handleDeleteLabel = (index) => {
    const newLabels = [...newTemplateLabels];
    newLabels.splice(index, 1);
    setNewTemplateLabels(newLabels);
    logger(`Label with index ${index} deleted from template labels array`);
  };

  const handleCreateTemplate = () => {
    if (newTemplateName.trim() === "" || newTemplateLabels.length === 0) {
      setFormIncomplete(true);
      logger("Template creation failed, template name or labels missing");
    } else {
      const newTemplate = {
        id: uuidv4(),
        name: newTemplateName.trim(),
        labels: newTemplateLabels,
        author: "Matthew Dutton", // replace with active user
        timestamp: new Date().toLocaleString(),
      };
      setExistingTemplates((existingTemplates) => [
        ...existingTemplates,
        newTemplate,
      ]);
      setNewTemplateName("");
      setNewTemplateLabels([]);
      setNewLabelValue("");
      setSelectedTab(0);
      setFormIncomplete(false);
      setNewTemplateCreated(true);
      logger(`New template created with name ${newTemplate.name}`);
    }
  };

  const handleDeleteTemplate = (template) => {
    setExistingTemplates((existingTemplates) =>
      existingTemplates.filter(
        (existingTemplate) => existingTemplate.id !== template.id
      )
    );
    logger(`Template with id ${template.id} deleted`);
  };

  const handleSnackbarClose = () => {
    setFormIncomplete(false);
    setNewTemplateCreated(false);
    logger("Snackbar closed");
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={onClose}
      PaperProps={{ sx: { width: "50%" } }}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          TemplateManager{" "}
        </Typography>
        <br />
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          style={{ borderBottom: "1px solid #e8e8e8" }}
        >
          <Tab label="Existing Templates" />
          <Tab label="Create New Template" />
        </Tabs>
        <br />
        {selectedTab === 0 && (
          <ExistingTemplates
            existingTemplates={existingTemplates}
            handleDeleteTemplate={handleDeleteTemplate}
          />
        )}
        {selectedTab === 1 && (
          <CreateTemplate
            newTemplateName={newTemplateName}
            newLabelValue={newLabelValue}
            newTemplateLabels={newTemplateLabels}
            handleInputChange={handleInputChange}
            handleLabelInputChange={handleLabelInputChange}
            handleAddNewLabel={handleAddNewLabel}
            handleDeleteLabel={handleDeleteLabel}
            handleCreateTemplate={handleCreateTemplate}
            setSelectedTab={setSelectedTab}
            labelColors={labelColors}
            formIncomplete={formIncomplete}
            setFormIncomplete={setFormIncomplete}
          />
        )}
      </Box>
    </Drawer>
  );
};