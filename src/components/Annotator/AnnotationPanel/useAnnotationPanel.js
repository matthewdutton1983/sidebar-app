import { useManageTemplates } from "../ManageTemplates/useManageTemplates";

export const useAnnotationPanel = (annotations, onDeleteAnnotation) => {
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
    isCreateTemplateEnabled,
    isDrawerOpen,
    setIsDrawerOpen,
    existingTemplates,
    setExistingTemplates,
  } = useManageTemplates();

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    handleInputChange({ currentTarget: { value: "" } });
  };

  const getAnnotations = () => {
    if (!annotations || annotations.length === 0) {
      return null;
    }

    return annotations.map((annotation, index) => ({
      key: index,
      text: annotation.text,
      timestamp: annotation.timestamp,
      start: annotation.start,
      end: annotation.end,
      onDelete: () => onDeleteAnnotation(index),
    }));
  };

  const getNewTemplate = () => ({
    name: newTemplateName.trim(),
    labels: newTemplateLabels,
  });

  const handleSelectTemplate = (template) => {
    handleCloseDrawer();
  };

  const handleDeleteTemplate = (index) => {
    const newTemplates = [...existingTemplates];
    newTemplates.splice(index, 1);
    setExistingTemplates(newTemplates);
  };

  return {
    annotations: getAnnotations(),
    isDrawerOpen,
    newTemplateName,
    newTemplateLabels,
    newLabelValue,
    selectedTab,
    handleOpenDrawer,
    handleCloseDrawer,
    handleInputChange,
    handleLabelInputChange,
    handleAddNewLabel,
    handleDeleteLabel,
    handleCreateTemplate,
    handleTabChange,
    getNewTemplate,
    isCreateTemplateEnabled,
    handleSelectTemplate,
    handleDeleteTemplate,
  };
};
