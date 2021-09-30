# AWS Backup with CDK

## High-level goals

Create an AWS Backup implementation that uses tags on DynamoDB resources to backup tables to an alternate region.

The solution should be deployable to multiple environments via an ADO pipeline.

In this case, the environments are separate AWS accounts.

The primary region is us-east-2. The backup region is us-west-1.

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

## DynamoDB Action Plan

- [x] Initialize the cdk application
  - [x] Do a basic app first, validate, then delete it
    - `cdk init app --language typescript`
  - [x] can this be done without a sub directory? NOPE
    - `cdk init cannot be run in a non-empty directory!`
- [x] Validate correct installation of the cdk application
- [x] Configure stack with account number and region, for now
- [x] Create 3 tables with CDK
- [x] Deploy the stack, validating correct account, profile configuration
- [x] Add backup tags to 2 tables, but omit from 1 table. Tag: {"backup": "4HourRPO"}
- [x] Deploy and validate tag application
- [x] Plan the backup plan iterations (creation, validation, externalizing variables)

## AWS Backup Action Plan

- [x] Create isolated stack for backup plan
- [x] Install aws-backup package
- [x] Create backup vault, set policy to DESTROY (cdk sets it to RETAIN, which is different than other resources)
- [ ] Create the backup plan selection
- [ ] Create the resource selection, based on tags (4HourRPO)
- [ ] Adjust the schedule for 4 hours
- [ ] Adjust the retention for 90 days
- [ ] Add a move to cold storage after 30 days

## Assumptions challenged

DynamoDB is not supported for cross-region backup!!
