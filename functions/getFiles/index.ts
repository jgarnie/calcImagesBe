import type {} from '../../.sst/platform/config';

export default new sst.aws.Function('GetFiles', {
  name: `getFiles`,
  permissions: [
    {
      actions: ['s3:ListBucket', 's3:GetObject'],
      resources: [
        `arn:aws:s3:::input-3d-assets/*`,
        `arn:aws:s3:::input-3d-assets`,
      ],
    },
  ],
  handler: './functions/getFiles/handler.getFiles',
  timeout: '30 seconds',
  memory: '1024 MB',
});
