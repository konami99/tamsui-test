import express, { Express, Request, Response } from 'express';
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

const app: Express = express();
const port = 3003;

app.get('/', async (req: Request, res: Response) => {
  

  res.send('Express + TypeScript Server!<<<');
});

app.listen(port, async () => { 
  const client = new SQSClient({
    region: "us-west-2",
    endpoint: "http://192.168.1.108:4566/000000000000/onexlab",
    credentials: {
      accessKeyId: "local" as string,
      secretAccessKey: "local" as string
    }
  });
  const out = await client.send(
    new ReceiveMessageCommand({
      QueueUrl: 'http://192.168.1.108:4566/000000000000/onexlab',
      WaitTimeSeconds: 10,
    })
  );

  console.log(`results: ${JSON.stringify(out)}`);

  if (out.Messages === undefined || out.Messages.length === 0) {
    return;
  }

  // Process the message here.

  await client.send(new DeleteMessageCommand({
    QueueUrl: 'http://192.168.1.108:4566/000000000000/onexlab',
    ReceiptHandle: out.Messages[0].ReceiptHandle,
  }));
});
