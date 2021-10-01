import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class DynamoTablesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const eventsTable = new dynamodb.Table(this, "Events", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    cdk.Tags.of(eventsTable).add("backup", "false");
    cdk.Tags.of(eventsTable).add("retention", "0");

    // Backed-up table
    const userTable = new dynamodb.Table(this, "Users", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    cdk.Tags.of(userTable).add("backup", "4HourRPO");
    cdk.Tags.of(userTable).add("retention", "90");

    // @TODO: Backed-up table for later deletion test

    // @TODO: Table with a local secondary index

    // @TODO: Table with a global secondary index
  }
}
