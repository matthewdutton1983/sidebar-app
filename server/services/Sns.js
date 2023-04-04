import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

console.log("AWS Credentials:", {
  accessKeyId: snsClient.config.credentials.accessKeyId,
  secretAccessKey: snsClient.config.credentials.secretAccessKey,
});

export const publishNewCollectionMessage = async (bucketName) => {
  const payload = {
    type: "COLLECTION_CREATED",
    details: {
      bucketName: bucketName,
    },
  };

  const params = {
    Message: JSON.stringify(payload),
    TopicArn: `arn:aws:sns:us-east-1:269786918761:COLLECTION_CREATED`,
  };

  try {
    const command = new PublishCommand(params);
    const data = await snsClient.send(command);
    console.log(
      `SNS message published with type ${payload.type} for creating bucket: ${bucketName}`
    );
    console.log("SNS publish response data:", data);
  } catch (error) {
    console.error(
      `Error publishing SNS message for bucket: ${bucketName}`,
      error
    );
    throw error;
  }
};

export const publishDocumentsUploadedMessage = async (
  collectionId,
  documentUploads
) => {
  console.log("collectionId in publishDocumentsUploadedMessage:", collectionId);
  const payload = {
    type: "DOCUMENTS_UPLOADED",
    details: {
      bucketName: collectionId,
      documents: documentUploads,
    },
  };

  const params = {
    Message: JSON.stringify(payload),
    TopicArn: `arn:aws:sns:us-east-1:269786918761:DOCUMENTS_UPLOADED`,
  };

  try {
    const command = new PublishCommand(params);
    const data = await snsClient.send(command);
    console.log(
      `SNS message published with type ${
        payload.type
      } for uploaded documents: ${documentUploads.map((doc) => doc.name)}`
    );
    console.log(`SNS publish response data:`, data);
  } catch (error) {
    console.error(
      `Error publishing SNS message for uploaded documents: ${documentUploads
        .map((doc) => doc.name)
        .join(", ")}`,
      error
    );
    throw error;
  }
};
