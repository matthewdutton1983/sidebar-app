import { useState } from "react";
import { useBoolean } from "react-use";

export const useManageTemplates = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateLabels, setNewTemplateLabels] = useState([]);
  const [newLabelValue, setNewLabelValue] = useState("");
  const [existingTemplates, setExistingTemplates] = useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = useBoolean(false);

  const handleInputChange = (event) => {
    setNewTemplateName(event.currentTarget.value);
  };

  const handleLabelInputChange = (event) => {
    setNewLabelValue(event.target.value);
  };

  const handleAddNewLabel = () => {
    if (newLabelValue.trim() !== "") {
      setNewTemplateLabels([...newTemplateLabels, newLabelValue.trim()]);
      setNewLabelValue("");
    }
  };

  const handleDeleteLabel = (index) => {
    const newLabels = [...newTemplateLabels];
    newLabels.splice(index, 1);
    setNewTemplateLabels(newLabels);
  };

  const handleCreateTemplate = () => {
    if (newTemplateName.trim() !== "" && newTemplateLabels.length > 0) {
      const newTemplate = {
        name: newTemplateName,
        labels: newTemplateLabels,
      };
      setExistingTemplates([...existingTemplates, newTemplate]);
      setNewTemplateName("");
      setNewTemplateLabels([]);
      setSelectedTab(0);
      setIsDrawerOpen(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const isCreateTemplateEnabled = () => {
    return newTemplateName.trim() !== "" && newTemplateLabels.length > 0;
  };

  return {
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
    isCreateTemplateEnabled,
    isDrawerOpen,
    setIsDrawerOpen,
    existingTemplates,
  };
};
