package main

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sqs"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"time"
)

func GetQueueURL(sess *session.Session, queue string) (*sqs.GetQueueUrlOutput, error) {
	sqsClient := sqs.New(sess)

	result, err := sqsClient.GetQueueUrl(&sqs.GetQueueUrlInput{
		QueueName: &queue,
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func main() {
	for {
		sess, err := session.NewSession(&aws.Config{
			Region: aws.String("us-west-2"),
			Endpoint: aws.String("http://localstack:4566"),
			Credentials: credentials.NewStaticCredentials("local", "local", ""),
		})
	
		if err != nil {
			fmt.Printf("Failed to initialize new session: %v", err)
			return
		}
	
		queueName := "onexlab"
	
		urlRes, err := GetQueueURL(sess, queueName)
		if err != nil {
			fmt.Printf("Got an error while trying to create queue: %v", err)
			return
		}
	
		sqsClient := sqs.New(sess)
	
		var timeout int64 = 5
	
		msgResult, err := sqsClient.ReceiveMessage(&sqs.ReceiveMessageInput{
			AttributeNames: []*string{
				aws.String(sqs.MessageSystemAttributeNameSentTimestamp),
			},
			MessageAttributeNames: []*string{
				aws.String(sqs.QueueAttributeNameAll),
			},
			QueueUrl:            urlRes.QueueUrl,
			MaxNumberOfMessages: aws.Int64(1),
			VisibilityTimeout:   &timeout,
		})

		messages := msgResult.Messages
		if len(messages) > 0 {
			handle := msgResult.Messages[0].ReceiptHandle
			// body := msgResult.Messages[0].Body
			fmt.Println("Message Handle: " + *handle)
			//fmt.Println("Got Queue URL: " + *urlRes.QueueUrl)

			// process message

			sqsClient.DeleteMessage(&sqs.DeleteMessageInput{
				QueueUrl:      urlRes.QueueUrl,
				ReceiptHandle: handle,
			})

			time.Sleep(2 * time.Second)
		} else {
			fmt.Println("No message")
		}
	}
}