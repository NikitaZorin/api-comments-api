const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Comment = sequelize.define('comment', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  homePage: DataTypes.STRING,
  text: DataTypes.TEXT,
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Comment;