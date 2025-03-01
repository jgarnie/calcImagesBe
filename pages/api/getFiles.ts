import type { NextApiRequest, NextApiResponse } from 'next';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const lambdaClient = new LambdaClient({
      requestHandler: {
        requestTimeout: 90_000,
        httpsAgent: { maxSockets: 200 },
      },
    });

    const response = await lambdaClient.send(
      new InvokeCommand({
        FunctionName:
          'arn:aws:lambda:eu-central-1:897722707082:function:getFiles',
        InvocationType: 'RequestResponse',
      })
    );

    const payload = JSON.parse(new TextDecoder().decode(response.Payload));

    return res.status(payload.statusCode || 200).json(payload);
  } catch (error) {
    console.error('❌ API GET failed:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
