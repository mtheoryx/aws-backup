import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AWSBackup from '../lib/aws-backup-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AWSBackup.AWSBackupStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
