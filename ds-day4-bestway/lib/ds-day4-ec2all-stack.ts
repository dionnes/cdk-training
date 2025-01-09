import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DsDay4ec2allStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // use existing vpc
    const vpc = ec2.Vpc.fromLookup(this, 'dsVPC', {
        isDefault: true
    });

    // create security group
    const securityGroup = new ec2.SecurityGroup(this, 'dsSecurityGroup', {
        vpc,
        description: 'Allow ssh and http access',
        securityGroupName: 'ds-sg',
        allowAllOutbound: true
    });

    // allow ssh access from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow ssh access from anywhere');

    // allow http access from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow http access from anywhere');

    // allow https access from anywhere
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'allow https access from anywhere');

    // create ec2 instance
    const dsvm = new ec2.Instance(this, 'dsvm1', {
        vpc,
        instanceType: new ec2.InstanceType('t2.micro'),
        machineImage: new ec2.AmazonLinuxImage(),
        keyPair: ec2.KeyPair.fromKeyPairName(this, 'dskey', 'splunk-key'),
        instanceName: 'ds-linux-vm',
        securityGroup: securityGroup
    });



  }
}