import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DsVpcEc2Day5Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create vpc with main network 10.8.0.0/24 and 2 public subnets with /28
    // give name of vpc to ds-vpc and put ds in each subnet name
    const vpc = new cdk.aws_ec2.Vpc(this, 'ds-vpc', {
      cidr: '10.8.0.0/24',
      maxAzs: 2,
      vpcName: 'ds-vpc',
      subnetConfiguration: [
      {
        cidrMask: 28,
        name: 'ds-PublicSubnet1',
        subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
      },
      {
        cidrMask: 28,
        name: 'ds-PublicSubnet2',
        subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
      }
      ]
    });
    
  }
}
