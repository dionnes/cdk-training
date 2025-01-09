#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DsDay4BestwayStack} from '../lib/ds-day4-bestway-stack';
import { DsDay4ec2allStack } from '../lib/ds-day4-ec2all-stack';

const app = new cdk.App();
new DsDay4BestwayStack(app, 'DsDay4BestwayStack', {

  // env: { account: '992382386705', region: 'us-east-1' },

});

new DsDay4ec2allStack(app, 'DsDay4ec2allStack', {

  env: { account: '992382386705', region: 'us-east-1' },

});