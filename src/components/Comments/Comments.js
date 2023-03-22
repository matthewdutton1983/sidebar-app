import { useState } from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { ReplyRounded } from "@mui/icons-material";
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
      {comments.length === 0 ? (
        <NoDataMessage style={{ paddingTop: '15px' }}>
          No one has commented on this document.
        </NoDataMessage>
      ) : (
        comments.map((comment, index) => (
          <Card key={index} style={{ marginTop: 8, marginBottom: 8, padding: 16 }}>
            <Typography variant='subtitle1' fontWeight={'bold'}>{comment.author} wrote:</Typography>
            <Typography variant='body1' style={{ marginTop: 8}}>{comment.text}</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: 8 }}>
                <Typography variant='caption'>{comment.timestamp}</Typography>
                <Button>
                  <ReplyRounded style={{ marginRight: 8 }}/> Reply
                </Button>
              </Box>
          </Card>
        ))
      )}
    </div>
  );
};