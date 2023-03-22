import { useState } from 'react';

export const useComments = () => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (text) => {
    const newComment = {
      author: 'Matthew Dutton', // replace with actual user or SID
      text: text,
      timestamp: new Date().toLocaleString(),
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return { 
    comments, 
    handleAddComment 
  };
};