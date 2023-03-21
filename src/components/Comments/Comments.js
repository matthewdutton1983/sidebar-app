import { useState } from "react";
import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { NoDataMessage } from "../StyledComponents";
import { useComments } from "./useComments";

export const Comment = () => {
  const { comments, handleAddComment } = useComments();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim() !== '') {
      handleAddComment(commentText.trim());
      setCommentText('');
    }
  };

  const handleCancel = () => {
    setCommentText('');
  };

  return (
    <div className='comments'>
      <Typography variant='h6' gutterBottom>
        Comments
      </Typography>
      <TextField 
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder='Add your comment ...'
        fullWidth
        multiline
        // onKeyDown={(e) => {
        //   if (e.key === 'Enter' && e.target.value.trim() !== '') {
        //     handleAddComment(e.target.value.trim());
        //     e.target.value = '';
        //     e.preventDefault();
        //   }
        // }}
      />
      <Grid container justifyContent='flex-end' style={{ marginTop: 8 }}>
        <Button color='primary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleSubmit} style={{ marginLeft: 8 }}>
          Submit
        </Button>
      </Grid>
      {comments.length === 0 ? (
        <NoDataMessage style={{ paddingTop: '15px' }}>
          No one has commented on this document.
        </NoDataMessage>
      ) : (
        comments.map((comment, index) => (
          <Card key={index} style={{ marginTop: 8, marginBottom: 8, padding: 16 }}>
            <Typography variant='subtitle2'>{comment.author} wrote:</Typography>
            <Typography variant='body1' style={{ marginTop: 8}}>{comment.text}</Typography>
            <Typography variant='caption' style={{ marginTop: 8}}>{comment.timestamp}</Typography>
            <Button size='small' style={{ marginLeft: 8}}>Reply</Button>
            {/* <Typography variant='body1'>{comment}</Typography> */}
          </Card>
        ))
      )}
    </div>
  );
};