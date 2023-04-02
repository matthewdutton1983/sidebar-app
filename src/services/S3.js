const {
  S3Client,
  CreateBucketCommand,
  PutBucketCorsCommand,
  UploadCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAT5UENV5U4RBTTUWN",
    secretAccessKey: "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",
  },
});

export const createBucket = async (bucketName) => {
  const createBucketParams = {
    Bucket: bucketName,
  };

  const putBucketCorsParams = {
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["GET", "POST"],
          AllowedOrigins: ["http://localhost:3000"],
          ExposeHeaders: [
            "ETag",
            "x-amz-date",
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-version-id",
          ],
          MaxAgeSeconds: 3000,
        },
      ],
    },
  };

  const createBucketCommand = new CreateBucketCommand(createBucketParams);
  const putBucketCorsCommand = new PutBucketCorsCommand(putBucketCorsParams);

  await Promise.all([
    s3Client.send(createBucketCommand),
    s3Client.send(putBucketCorsCommand),
  ]);

  console.log(`Bucket created ${bucketName}`);
  console.log(`CORS configuration set on bucket ${bucketName}`);
};

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
