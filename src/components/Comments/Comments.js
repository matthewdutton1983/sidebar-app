import { useState, useEffect } from "react";
import { Button, Card, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Logger } from "../../Logger";
import "./Comments.styles.css";

export const Comments = () => {
  const [comments, setComments] = useState(() => {
    const storedComments = localStorage.getItem("comments");
    return storedComments ? JSON.parse(storedComments) : [];
  });
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    Logger("Comments state updated.", { comments });
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (text) => {
    const comment = {
      id: uuidv4(),
      author: "Matthew Dutton", // replace with actual user
      text: text,
      timestamp: new Date().toLocaleString(),
    };
    setComments([...comments, comment]);

    Logger("Comment added.", {
      commentId: comment.id,
      author: comment.author,
      text: comment.text,
      timestamp: comment.timestamp,
    });
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    Logger("Comment deleted.", { commentId });
  };

  const handleSubmit = () => {
    if (commentText.trim() !== "") {
      handleAddComment(commentText.trim());
      setCommentText("");
    }
  };

  Logger("Rendering Comments component.");

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <TextField
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment ..."
        fullWidth
        multiline
      />
      <div className="comments-actions">
        <Typography variant="body2">
          Total comments: {comments.length}
        </Typography>
        <Button
          className="comments-send-btn"
          color="primary"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
      {comments.map((comment, index) => (
        <Card
          key={index}
          style={{ marginTop: 8, marginBottom: 8, padding: 16 }}
        >
          <Typography variant="subtitle1" fontWeight={"bold"}>
            {comment.author} wrote:
          </Typography>
          <Typography variant="body1" style={{ marginTop: 8 }}>
            {comment.text}
          </Typography>
          <div className="comments-actions">
            <Typography variant="body2">{comment.timestamp}</Typography>
            {comment.author === "Matthew Dutton" && (
              <Button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
