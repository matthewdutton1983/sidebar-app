import { useState } from "react";
import { Chip, TextField, Typography } from '@mui/material';
import './Classification.styles.css';

export const Classification = ({ tags, onAddTag, onDeleteTag }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className='classification'>
      <Typography variant='h6' gutterBottom>
        Categorize Document
      </Typography>
      <TextField
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Add a new tag and press Enter'
        fullWidth
      />
      <div className='chips-container'>
        {tags.map((tag, index) => (
          <Chip
            className='chip'
            key={index}
            label={tag}
            onDelete={() => onDeleteTag(tag)}
          />
        ))}
      </div>
    </div>
  );
}; 