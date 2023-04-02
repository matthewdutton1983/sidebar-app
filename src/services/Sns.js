import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
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
    TopicArn: `arn:aws:sns:us-east-1:${process.env.AWS_ACCOUNT_NUMBER}:COLLECTION_CREATED`,
  };

  const command = new PublishCommand(params);

  try {
    const data = await snsClient.send(command);
    console.log(
      `SNS message published with type ${payload.type} for creating bucket: ${bucketName}`
    );
    console.log(`SNS publish response data:`, data);
  } catch (error) {
    console.error(
      `Error publishing SNS message for bucket: ${bucketName}`,
      error
    );
    throw error;
  }
};
