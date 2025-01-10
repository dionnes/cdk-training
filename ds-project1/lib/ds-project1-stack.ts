import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';

export class DsProject1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create dynamodb table to store the s3 bucket names with primary key as bucket name and data type as string
    const table = new cdk.aws_dynamodb.Table(this, 'DsSampleTable', {
      partitionKey: { name: 'bucketName', type: cdk.aws_dynamodb.AttributeType.STRING },
      tableName: 'ds-sample-table',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
        
    // create lambda function named ds-sample-function with python runtime and printing hello world message
    const dsSampleFunction = new lambda.Function(this, 'DsSampleFunction', {
      runtime: lambda.Runtime.PYTHON_3_8,
      functionName: 'ds-sample-function',
      // write python code to print all the s3 buckets using boto3
      // modify python code to write the bucketname to the dynamodb table
      code: lambda.Code.fromInline(`
import time
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ds-sample-table')

def handler(event, context):
  s3 = boto3.client('s3')
  response = s3.list_buckets()
  buckets = [bucket['Name'] for bucket in response['Buckets']]
  for bucket in buckets:
    table.put_item(Item={'bucketName': bucket})
  print("S3 Buckets:", buckets)
  return {"statusCode": 200, "body": str(buckets)}
      `),
      handler: 'index.handler',
    });

    // grant the lambda function access to s3 buckets
    // const s3Policy = new lambda.PolicyStatement({
    const s3Policy = new iam.PolicyStatement({  
      actions: ['s3:ListAllMyBuckets'],
      resources: ['arn:aws:s3:::*'],
    });
    dsSampleFunction.addToRolePolicy(s3Policy);

    // grant the lambda function access to dynamodb table
    const dynamoDbPolicy = new iam.PolicyStatement({
      actions: ['dynamodb:*'],
      resources: [table.tableArn],
    });
    dsSampleFunction.addToRolePolicy(dynamoDbPolicy);
    

    // add aws cloudwatch event rule to trigger lambda function every 3 minutes
    const rule = new events.Rule(this, 'Rule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(3)),
      // ruleName: 'ds-sample-rule',
      // targets: [new targets.LambdaFunction(dsSampleFunction)]
    });
    rule.addTarget(new targets.LambdaFunction(dsSampleFunction));



  }
}
