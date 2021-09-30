#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { DynamoTablesStack } from "../lib/dynamo-tables-stack";
import { DynamoBackupTablesStack } from "../lib/dynamo-backup-tables-stack";

const app = new cdk.App();

// No backup Tables
const disposableStack = new DynamoTablesStack(app, "DynamoTablesStack", {
  env: { account: "716374413161", region: "us-east-2" },
  tags: {
    environment: "primary",
    duration: "temporary",
    cdk: "true",
  },
});

cdk.Tags.of(disposableStack).add("backup", "false", {
  includeResourceTypes: ["AWS::DynamoDB::Table"],
});

// Backup tables
const retentionStack = new DynamoBackupTablesStack(
  app,
  "DynamoBackupTablesStack",
  {
    env: { account: "716374413161", region: "us-east-2" },
    tags: {
      environment: "primary",
      duration: "temporary",
      cdk: "true",
    },
  }
);

cdk.Tags.of(retentionStack).add("backup", "4HourRPO", {
  includeResourceTypes: ["AWS::DynamoDB::Table"],
});
