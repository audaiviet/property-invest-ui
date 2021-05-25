import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient, BlockBlobParallelUploadOptions } from '@azure/storage-blob'

const account = process.env.STORAGE_ACCOUNT_NAME
const defaultAzureCredential = new DefaultAzureCredential();

export interface IBlobService {
    getBlobService(): BlobServiceClient,
    saveFile(file: Express.Multer.File): Promise<void>
}

export class BlobService {
    private static blobService: BlobServiceClient = undefined
    private static getBlobService(): BlobServiceClient {
        if (!BlobService.blobService) {
            BlobService.blobService = new BlobServiceClient(
                `https://${account}.blob.core.windows.net`,
                defaultAzureCredential
            );
        }
        return BlobService.blobService
    }

    static async saveFile(file: Express.Multer.File) {
        const containerClient = BlobService.getBlobService().getContainerClient(process.env.BLOB_CONTAINER_NAME);
        const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);

        const options: BlockBlobParallelUploadOptions = {
            blobHTTPHeaders: { blobContentType: file.mimetype },
            blockSize: file.size,
            metadata: {
                'name': file.originalname
            }
        }
        const uploadBlobResponse = await blockBlobClient.uploadData(file.buffer, options);
        console.log(`Upload block blob ${file.originalname} successfully`, uploadBlobResponse.requestId);
    }
}