import { useComments } from "./useComments";
import { Card, TextField, Typography } from "@mui/material"

export const Comment = () => {
  const { comments, handleAddComment } = useComments();

  return (
    <div className='comments'>
      <Typography variant='h6' gutterBottom>
        Comments
      </Typography>
      <TextField 
        placeholder='Add your comment ...'
        fullWidth
        multiline
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            handleAddComment(e.target.value.trim());
            e.target.value = '';
            e.preventDefault();
          }
        }}
      />
      {comments.map((comment, index) => (
      <Card key={index} comment={comment} style={{ marginTop: 8, marginBottom: 8 }}>
        <Typography variant='body1'>{comment}</Typography>
      </Card>
      ))}
    </div>
  );
};