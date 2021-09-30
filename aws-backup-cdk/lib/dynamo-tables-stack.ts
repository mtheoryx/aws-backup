import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class DynamoTablesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const eventsTable = new dynamodb.Table(this, "Events", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
    });

    cdk.Tags.of(eventsTable).add("backup", "false");
  }
}
