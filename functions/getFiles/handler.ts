import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const getFiles = async () => {
  const s3Client = new S3Client();

  const command = new ListObjectsV2Command({
    Bucket: 'input-3d-assets',
  });

  try {
    const response = await s3Client.send(command);
    console.log({ response });

    const files =
      response.Contents?.map((obj) => {
        return {
          model: obj.Key,
          url: `https://input-3d-assets.s3.amazonaws.com/${obj.Key}`, // Public URL format
        };
      }) || [];

    const generateSignedUrls = async (files: string[], bucketName: string) => {
      return await Promise.all(
        files.map(async (file) => {
          const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: file,
          });
          const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          }); // 1-hour validity
          return { key: file, url: signedUrl };
        })
      );
    };
    return {
      statusCode: 200,
      body: {
        message: 'Files retrieved successfully',
        model: files,
      },
    };
  } catch (error) {
    console.error(' Error fetching from S3:', error);
    throw error;
  }
};
