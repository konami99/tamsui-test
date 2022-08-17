import { Request, Response } from "express";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

export async function createEmailHandler(
  req: Request,
  res: Response,
) {
  const client = new SNSClient({
    region: "us-west-2",
    endpoint: 'http://localstack:4566',
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local',
    }
  });

  const ordersTopic = 'arn:aws:sns:us-west-2:000000000000:onexlab-sns';

  const out = await client.send(new PublishCommand({
    Message: "works2",
    TopicArn: ordersTopic,
  }));
  
  return res.status(200).send();
}