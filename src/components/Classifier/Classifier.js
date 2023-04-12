import { useState, useEffect } from "react";
import { Chip, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Logger } from "../../Logger";
import "./Classifier.styles.css";

export const Classifier = () => {
  const [tags, setTags] = useState(() => {
    const storedTags = localStorage.getItem("tags");
    return storedTags ? JSON.parse(storedTags) : [];
  });
  const [tagText, setTagText] = useState("");

  useEffect(() => {
    Logger("Tags state updated.", { tags });
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  const handleAddTag = (text) => {
    const tag = {
      id: uuidv4(),
      author: "Matthew Dutton", // replace with actual user
      text: text.trim(),
      timestamp: new Date().toLocaleString(),
    };
    if (!tag.text || tags.some((t) => t.text === tag.text)) {
      return;
    }
    setTags([...tags, tag]);
    setTagText("");

    Logger("Tag added.", {
      tagId: tag.id,
      author: tag.author,
      text: tag.text,
      timestamp: tag.timestamp,
    });
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag.id !== tagToDelete.id));

    Logger("Tag deleted.", {
      tagId: tagToDelete.id,
      author: tagToDelete.author,
      text: tagToDelete.text,
      timestamp: tagToDelete.timestamp,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag(tagText);
    }
  };

  Logger("Rendering Classifier component.");

  return (
    <div className="classification">
      <Typography variant="h6" gutterBottom>
        Classifier
      </Typography>
      <TextField
        value={tagText}
        onChange={(event) => setTagText(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new tag and press Enter"
        fullWidth
      />
      <div className="chips-container">
        <div className="tags-count">
          <Typography variant="body2">Total tags: {tags.length}</Typography>
        </div>
        <div className="chips-wrapper">
          {tags.map((tag) => (
            <Chip
              className="chip"
              key={tag.id}
              label={tag.text}
              onDelete={() => handleDeleteTag(tag)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
