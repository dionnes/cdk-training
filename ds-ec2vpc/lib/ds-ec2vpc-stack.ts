import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DsEc2VpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // use default vpc
    const vpc = ec2.Vpc.fromLookup(this, 'dsVPC', {
      isDefault: true
    });

    // create ec2 instance
    const dsvm = new ec2.Instance(this, 'dsvm1', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage(),
      keyPair: ec2.KeyPair.fromKeyPairName(this, 'dskey', 'splunk-key'),
      instanceName: 'ds-linux-vm'
    });

    // print instance ID
    // new CfnOutput(this, 'ServiceAccountIamRole', { value: serviceAccount.role.roleArn });
    new cdk.CfnOutput(this, 'dsvm1ID', {
      description: 'prints instance ID',
      value: dsvm.instanceId
    });

    // print instance DNS
    new cdk.CfnOutput(this, 'dsvm1PIP', {
      description: 'prints instance public IP',
      value: dsvm.instancePublicIp
    });

  }
}
