# AWS Backup with CDK

## High-level goals

Create an AWS Backup implementation that uses tags on DynamoDB resources to backup tables to an alternate region.

The solution should be deployable to multiple environments via an ADO pipeline.

In this case, the environments are separate AWS accounts.

The primary region is us-east-2. The backup region is us-west-2.

### Initial assumptions

- Table names and ARNs are not required
- The tag values can be identifiers enough
- Backup frequency is every 4 hours. (RPO is 4 hours)
- Backup retention is 90 days.
- Tags will already exist on the dynamo tables.
- Backup plan will not fail if no matching tags are found

### Initial Knowns

- Need to create 3 dynamo tables.
  - Two tables have correct tags for backup
  - One table has incorrect tags for backup
- Configure the cdk application.
- Use DOTENV and DOTENV-CLI (locally) to validate in multiple regions. Do one region at a time, to simulate initial promotion through environments
- Backup solution will be deployed in the alternate region

### Initial Unknowns

If a table is deleted, how does this affect the backup?
Does backup pick up tables in other regions?

## Action Plan

- [ ] Initialize the cdk application (can this be done without a sub directory??)
- [ ] Validate correct installation of the cdk application
- [ ] Configure stack with account number and region, for now
- [ ] Create 3 tables with CDK
- [ ] Deploy the stack, validating correct account, profile configuration
- [ ] Add backup tags to 2 tables, but omit from 1 table. Tag: "4HourRPO"
- [ ] Deploy and validate tag application
- [ ] Plan the backup plan iterations (creation, validation, externalizing variables)
