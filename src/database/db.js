const Sequelize = require('sequelize');

class Database {
  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite'
    });
  }
}

module.exports = new Database().sequelize;