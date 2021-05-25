import { BlobService } from './../../../services/AzureBlobService';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer, { Multer } from 'multer';
import { Constants } from '../../../constants';

const upload = multer();

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array(Constants.PROJECT_PHOTOS));

apiRoute.post(async (req: NextApiRequest & Express.Request, res: NextApiResponse) => {
  const files = req.files as Express.Multer.File[]
  files.forEach(async (item, index) => {
    await BlobService.saveFile(item)
  })
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};