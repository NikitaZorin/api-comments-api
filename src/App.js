const express = require('express');
const Database = require('./database/db');
const CommentsRouter = require('./routes/comment');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const UploadRouter = require('./routes/upload');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupDatabase();
    this.setupSwagger();
    this.port = process.env.PORT || 3000
  }

  setupMiddleware() {
    this.app.use(express.json());
  }

  setupRoutes() {
    const commentsRouter = new CommentsRouter();
    const uploadRouter = new UploadRouter();
    
    this.app.use('/api/comments', commentsRouter.router);
    this.app.use('/api/upload', uploadRouter.router);
  }

  setupDatabase() {
    Database.sync({ alter: true })
      .then(() => {
        console.log('Database synced');
      })
      .catch((err) => {
        console.error('Error syncing database:', err);
      });
  }

  setupSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = App;
