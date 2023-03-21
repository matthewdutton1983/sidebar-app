import { useState } from 'react';

export const useAnnotations = () => {
  const [annotations, setAnnotations] = useState([]);

  const handleAddAnnotation = (annotation) => {
    setAnnotations((prevAnnotations) => [...prevAnnotations, annotation]);
  };

  const handleDeleteAnnotation = (index) => {
    const annotationToDelete = annotations[index];
    const spanElements = document.getElementsByTagName('span');

    for (let span of spanElements) {
      const startOffset = parseInt(span.dataset.startOffset, 10);
      const endOffset = parseInt(span.dataset.endOffset, 10);

      if (
        startOffset === annotationToDelete.start &&
        endOffset === annotationToDelete.end
      ) {
        const parent = span.parentNode;
        const textNode = document.createTextNode(span.textContent);
        parent.replaceChild(textNode, span);
        break;
      }
    }

    setAnnotations((prevAnnotations) => prevAnnotations.filter((_, i) => i !== index));
  };

  return { annotations, handleAddAnnotation, handleDeleteAnnotation };
};