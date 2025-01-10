import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class DsDay4LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // write lambda function in python runtime to print hello world
    const helloWorldFunction = new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromInline(`
        def handler(event, context):
          print("Hello, World!")
          return {
              'statusCode': 200,
              'body': 'Hello, World!'
          }
      `),
      handler: 'index.handler',
      functionName: 'DSHelloWorldFunction'
    });
  }
}
