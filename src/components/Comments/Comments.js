import { useState } from 'react';
import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import { ReplyRounded } from '@mui/icons-material';
import { NoDataMessage } from '../StyledComponents';
import { useComments } from './useComments';
import { isEmpty } from 'lodash';

export const Comment = () => {
  const { comments, handleAddComment } = useComments();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim() !== '') {
      handleAddComment(commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className='comments'>
      <Typography variant='h6' gutterBottom>
        Comments
      </Typography>
      <TextField 
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder='Add a comment ...'
        fullWidth
        multiline
      />
      <Grid container justifyContent='flex-end' style={{ marginTop: 8 }}>
        <Button color='primary' onClick={handleSubmit} style={{ marginLeft: 8 }}>
          Send
        </Button>
      </Grid>
      {isEmpty(comments) ? (
        <NoDataMessage style={{ paddingTop: '15px' }}>
          No one has commented on this document.
        </NoDataMessage>
      ) : (
        comments.map((comment, index) => (
          <Card key={index} style={{ marginTop: 8, marginBottom: 8, padding: 16 }}>
            <Typography variant='subtitle2'>{comment.author} wrote:</Typography>
            <Typography variant='body1' style={{ marginTop: 8}}>{comment.text}</Typography>
            <Typography variant='caption' style={{ marginTop: 8}}>{comment.timestamp}</Typography>
            <Button>
              <ReplyRounded /> Reply
            </Button> 
          </Card>
        ))
      )}
    </div>
  );
};