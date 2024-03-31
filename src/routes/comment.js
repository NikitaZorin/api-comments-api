const express = require('express');
const Comment = require('../models/Comment');

class CommentRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post('/', this.createComment.bind(this));
  }

  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body);
      res.json({ success: true, message: 'Comment created successfully', comment });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = CommentRouter;