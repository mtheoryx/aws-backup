import * as cdk from "@aws-cdk/core";
import * as backup from "@aws-cdk/aws-backup";
import * as events from "@aws-cdk/aws-events";

export class AWSBackupStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Backup Vault
    const vault = new backup.BackupVault(this, "DynamoBackupVault", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Backup Rule
    const dynamoRule = new backup.BackupPlanRule({
      scheduleExpression: events.Schedule.cron({
        minute: "0",
        hour: "0/4",
      }),
      ruleName: "Backup every 4 hours",
      deleteAfter: cdk.Duration.days(90),
    });

    // Backup plan
    const plan = new backup.BackupPlan(this, "DynamoBackupPlan", {
      backupVault: vault,
      backupPlanRules: [dynamoRule],
      backupPlanName: "Dynamo 4 hour RPO",
    });

    // Backup Selection
    const dynamoSelection = new backup.BackupSelection(
      this,
      "DynamoRPOSelection",
      {
        backupPlan: plan,
        resources: [backup.BackupResource.fromTag("backup", "4HourRPO")],
      }
    );
  }
}
