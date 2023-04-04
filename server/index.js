import express from "express";
import {
  publishNewCollectionMessage,
  publishDocumentsUploadedMessage,
} from "./services/Sns.js";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// handle requests to create a new collection
app.post("/api/collections", async (req, res) => {
  console.log("POST /collections");
  try {
    const { bucketName } = req.body;
    await publishNewCollectionMessage(bucketName);
    res
      .status(200)
      .json({ message: `Collection ${bucketName} created successfully` });
  } catch (error) {
    console.error("Error publishing SNS message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// handle requests to upload documents to a collection
app.post("/api/collections/:collectionId/documents", async (req, res) => {
  console.log(`POST /collections/${req.params.collectionId}/documents`);
  try {
    const { collectionId } = req.params;
    const { documents } = req.body;
    await publishDocumentsUploadedMessage(collectionId, documents);
    res.status(200).json({ message: "Documents uploaded successfully" });
  } catch (error) {
    console.error("Error publishing SNS message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
