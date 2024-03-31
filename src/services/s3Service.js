const AWS = require('aws-sdk');
require('dotenv').config();

class S3Service {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    this.bucketName = process.env.S3_BUCKET_NAME;
  }

  async uploadFile(fileContent, key) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: fileContent
    };
    return await this.s3.upload(params).promise();
  }
}

module.exports = S3Service;