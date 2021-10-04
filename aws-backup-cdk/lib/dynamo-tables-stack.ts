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
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    cdk.Tags.of(eventsTable).add("backup", "false");
    cdk.Tags.of(eventsTable).add("retention", "0");

    // Backed-up table
    const userTable = new dynamodb.Table(this, "Users", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    cdk.Tags.of(userTable).add("backup", "4HourRPO");
    cdk.Tags.of(userTable).add("retention", "90");

    // 2nd non-backed up table to test selection

    const notificationsTable = new dynamodb.Table(this, "Notifications", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    cdk.Tags.of(notificationsTable).add("backup", "false");
    cdk.Tags.of(notificationsTable).add("retention", "0");

    // @TODO: Backed-up table for later deletion test
    const administratorTable = new dynamodb.Table(this, "Administrators", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    cdk.Tags.of(administratorTable).add("backup", "4HourRPO");
    cdk.Tags.of(administratorTable).add("retention", "90");

    // Backed up Table with a local secondary index
    const paymentTable = new dynamodb.Table(this, "Payments", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      sortKey: {name: "createdAt", type: dynamodb.AttributeType.NUMBER},
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    cdk.Tags.of(paymentTable).add("backup", "4HourRPO");
    cdk.Tags.of(paymentTable).add("retention", "90");

    paymentTable.addLocalSecondaryIndex({
      indexName: 'paymentStatusIndex',
      sortKey: { name: 'status', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL
    });

    // Backed up Table with a global secondary index
    const itemTable = new dynamodb.Table(this, "Items", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamodb.AttributeType.NUMBER },
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    cdk.Tags.of(itemTable).add("backup", "4HourRPO");
    cdk.Tags.of(itemTable).add("retention", "90");

    itemTable.addGlobalSecondaryIndex({
      indexName: 'warehouseIdIndex',
      partitionKey: { name: 'warehouseId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'status', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL
    })
  }
}
