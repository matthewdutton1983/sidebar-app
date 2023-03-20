import { Card, Typography } from "@mui/material"

export const CommentCard = ({ comment }) => {
  return (
    <Card style={{ marginTop: 8, marginBottom: 8 }}>
      <Typography variant='body1'>{comment}</Typography>
    </Card>
  );
};