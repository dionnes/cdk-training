import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class DsDay4BestwayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define array with 2 bucket names
    const bucketNames = ['ds-day4-bestway-bucket11', 'ds-day4-bestway-bucket22'];

    // create loop for bucketNames
    for (const bucketName of bucketNames) {
      new s3.Bucket(this, bucketName, {
        versioned: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        bucketName: bucketName
      });
    }
    
    // // create 2 s3 buckets
    // for (let i = 1; i <= 2; i++) {
    //   new s3.Bucket(this, `MyBucket${i}`, {
    //     versioned: true,
    //     removalPolicy: cdk.RemovalPolicy.DESTROY,
    //     autoDeleteObjects: true,
    //     bucketName: `ds-day4-bestway-bucket${i}`
    //   });
    // }
 
    // // create s3 bucket
    // const bucket = new s3.Bucket(this, 'MyBucket', {
    //   versioned: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   autoDeleteObjects: true,
    //   bucketName: 'ds-day4-bestway-bucketttt'
    // });

  }
}
