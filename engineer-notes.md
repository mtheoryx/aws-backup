# AWS Backup with CDK

## High-level goals

Create an AWS Backup implementation that uses tags on DynamoDB resources to backup tables to an alternate region.

The solution should be deployable to multiple environments. In this case, the environments are separate AWS accounts.

The primary region is us-east-2. The backup region is us-west-2.

## Initial assumptions

Table names and ARNs are not required
The tag values can be identifiers enough

## Initial Knowns

- Need to create 3 dynamo tables.
  - Two tables have correct tags for backup
  - One table has incorrect tags for backup
- Configure the cdk application.
- Use DOTENV and DOTENV-CLI (locally) to validate in multiple regions. Do one region at a time, to simulate initial promotion through environments
- Backup schedule should be 4 hours
- Retention period should be 90 days
- Backup solution will be deployed in the alternate region

## Initial Unknowns

If a table is deleted, how does this affect the backup?
Does backup pick up tables in other regions?
