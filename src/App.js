import { useState } from 'react';
import { leftTools, rightTools } from './data/ToolsData';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Document } from './components/Document/Document';
import './App.css';

function App() {
  const [annotations, setAnnotations] = useState([]);
  
  const handleAddAnnotation = (annotation) => {
    setAnnotations((prevAnnotations) => [...prevAnnotations, annotation]);
  };

  const handleDeleteAnnotation = (index) => {
    const annotationToDelete = annotations[index];
    const spanElements = document.getElementsByTagName("span");
    
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
    
    setAnnotations((prevAnnotations) => prevAnnotations.filter((_, i) => i !== index)
    );
  };

  return (
    <div className='container'>
      <Toolbar 
        tools={leftTools} 
        position='left' 
      />
      <Document onAnnotate={handleAddAnnotation} />
      <Toolbar 
        tools={rightTools} 
        position='right'
        annotations={annotations} 
        onDeleteAnnotation={handleDeleteAnnotation} 
      />
    </div>
  );
};

export default App;
