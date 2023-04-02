const { S3Client, UploadCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadDocument = async (collectionId, document, docId) => {
  console.log("Uploading document:", document);
  const bucketName = collectionId;
  const documentKey = `${collectionId}-${docId}`;
  const params = {
    Bucket: bucketName,
    Key: documentKey,
    Body: document,
  };
  console.log("Upload parameters:", params);
  try {
    const uploadCommand = new UploadCommand(params);
    const data = await s3Client.send(uploadCommand);

    console.log("Upload successful:", data);

    return { id: docId, name: document.name, path: data.Location };
  } catch (err) {
    console.error("Upload error:", err);
  }
};
