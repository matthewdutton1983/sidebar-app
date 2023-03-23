import { useState } from 'react';
import { useBoolean } from 'react-use';

export const useAnnotationPanel = (annotations, onDeleteAnnotation) => {
  const [isDrawerOpen, setIsDrawerOpen] = useBoolean(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateLabels, setNewTemplateLabels] = useState([]);
  const [newLabelValue, setNewLabelValue] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer =() => {
    setIsDrawerOpen(false);
    setNewTemplateName('');
  };

  const handleInputChange = (event) => {
    setNewTemplateName(event.currentTarget.value);
  };

  const handleLabelInputChange = (event) => {
    setNewLabelValue(event.target.value);
  };

  const handleAddNewLabel = () => {
    if (newLabelValue.trim() !== '') {
      setNewTemplateLabels([...newTemplateLabels, newLabelValue.trim()]);
      setNewLabelValue('');
    }
  };

  const handleDeleteLabel = (index) => {
    const newLabels = [...newTemplateLabels];
    newLabels.splice(index, 1);
    setNewTemplateLabels(newLabels);
  };

  const handleCreateTemplate = () => {
    console.log(`Creating new template: ${newTemplateName}`)
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
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

  const isCreateTemplateEnabled = () => {
    return newTemplateName.trim() !== '' && newTemplateLabels.length > 0;
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
  };
};