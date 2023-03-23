import { useState } from 'react';
import { Chip, TextField, Typography } from '@mui/material';
import { NoDataMessage } from '../StyledComponents';
import { isEmpty } from 'lodash';
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
        {isEmpty(tags) ? (
          <NoDataMessage>
            There are currently no tags for this document.
          </NoDataMessage>
        ) : (
          tags.map((tag, index) => (
            <Chip
              className='chip'
              key={index}
              label={tag}
              onDelete={() => onDeleteTag(tag)}
              size='medium'
            />
          ))
        )}
      </div>
    </div>
  );
}; 