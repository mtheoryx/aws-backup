#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { DynamoTablesStack } from "../lib/dynamo-tables-stack";
import { AWSBackupStack } from "../lib/aws-backup-stack";
import * as dotenv from "dotenv";

// Environment Configuration
if (process.env.ENV === "DEV") {
  dotenv.config();
}

const env = {
  account: `${process.env.ACCOUNT}`,
  region: `${process.env.REGION}`,
};

const environment = process.env.ENVIRONMENT;

const app = new cdk.App();

// AWS Backup stack
const backupStack = new AWSBackupStack(app, "AWSBackupStack", {
  env,
  tags: {
    environment: `${environment}`,
    duration: "temporary",
    cdk: "true",
  },
});

// DynamoDB Stack
const dynamoDbStack = new DynamoTablesStack(app, "DynamoTablesStack", {
  env,
  tags: {
    environment: `${environment}`,
    duration: "temporary",
    cdk: "true",
  },
});
