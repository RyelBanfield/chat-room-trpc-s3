import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: "v4",
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const ex = (req.body as { fileType: string }).fileType.split(
    "%2F"
  )[1] as string;

  const Key = `${randomUUID()}.${ex}`;

  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key,
    Expires: 60,
    ContentType: `image/${ex}`,
  };

  const uploadURL = s3.getSignedUrl("putObject", s3Params);

  res.status(200).json({ uploadURL, Key });
};

export default handler;
