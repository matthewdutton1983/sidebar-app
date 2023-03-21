import { leftTools, rightTools } from './data/ToolsData';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Document } from './components/Document/Document';
import { useAnnotations } from './components/Annotation/useAnnotations';
import { useComments } from './components/Comments/useComments';
import './App.css';

function App() {
  const { annotations, handleAddAnnotation, handleDeleteAnnotation } = useAnnotations();
  const { comments } = useComments();

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
        comments={comments}
      />
    </div>
  );
};

export default App;
