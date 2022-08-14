import AWS from 'aws-sdk';

describe("", () => {
  it("", () => {
    const config = {
      endpoint: new AWS.Endpoint('http://elasticmq:9324'),
      accessKeyId: 'local',
      secretAccessKey: 'local',
      region: 'us-west-2',
      apiVersion: '2012-11-05'
    }
    const sqs = new AWS.SQS(config);
    
    var params = {
      // Remove DelaySeconds parameter and value for FIFO queues
      MessageAttributes: {
        "Title": {
          DataType: "String",
          StringValue: "The Whistler"
        },
        "Author": {
          DataType: "String",
          StringValue: "John Grisham"
        },
        "WeeksOn": {
          DataType: "Number",
          StringValue: "6"
        }
      },
      MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageGroupId: "Group1",  // Required for FIFO queues
      QueueUrl: "/1234567890/test_queue",
    };
    console.log('here');
    sqs.sendMessage(params, (err, data) => {
      console.log('111');
    });
  });
});
