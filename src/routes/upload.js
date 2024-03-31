const express = require('express');
const expressFileUpload = require('express-fileupload');
const UploadService = require('../services/uploadService');
const uploadService = new UploadService();

class UploadRouter {
  constructor() {
    this.router = express.Router();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.router.use(expressFileUpload());
  }

  setupRoutes() {
    this.router.post('/', this.uploadFile.bind(this));
  }

  async uploadFile(req, res) {

    try {
      if (!req.files || !req.files.files) {
        return res.status(400).json({ success: false, message: 'File not uploaded' });
      }

      const file = req.files.files;

      const fileUrl = await uploadService.processUpload(file);

      const comment = await uploadService.saveComment({
        userName: req.body.userName,
        email: req.body.email,
        text: req.body.text,
        fileUrl: fileUrl
      });

      res.json({ success: true, message: 'File uploaded successfully', file: comment });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = UploadRouter;