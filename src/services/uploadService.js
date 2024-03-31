const sharp = require('sharp');
const S3Service = require('./s3Service');
const Comment = require('../models/Comment');

class UploadService {
    constructor() {
        this.s3Service = new S3Service();
    }

    async processUpload(fileInfo) {
        if (fileInfo.mimetype.startsWith('image/')) {
            fileInfo.data = sharp(fileInfo.data);

            const metadata = await fileInfo.data.metadata();
            const { width, height } = metadata;

            if (width > 320 || height > 240) {
                await fileInfo.data.resize({ width: 320, height: 240, fit: 'inside' });
            }
        } else if (fileInfo.mimetype === 'text/plain') {
            if (fileInfo.size > 100 * 1024) {
                throw new Error('File size exceeds maximum limit of 100 KB');
            }
        } else {
            throw new Error('Invalid file format');
        }

        const s3Data = await this.s3Service.uploadFile(fileInfo.data, `uploads/${fileInfo.name}`);
        return s3Data.Location;
    }

    async saveComment(commentData) {
        return await Comment.create(commentData);
    }
}

module.exports = UploadService;