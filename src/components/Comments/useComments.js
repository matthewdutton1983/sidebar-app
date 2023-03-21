import { useState } from 'react';

export const useComments = () => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  return { comments, handleAddComment };
};