#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DsEc2VpcStack } from '../lib/ds-ec2vpc-stack';

const app = new cdk.App();
new DsEc2VpcStack(app, 'DsEc2VpcStack', {

  env: { account: '992382386705', region: 'us-east-1' },

});