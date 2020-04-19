const Sequelize = require("sequelize");
const Table = require('./table');

module.exports = class Generator {
  
  constructor(database, username, password, options) {
    if (database instanceof Sequelize) {
      this.sequelize = database;
    } else {  
      this.sequelize = new Sequelize(database, username, password, options || {});
    }
    this.queryInterface = this.sequelize.getQueryInterface();
  }

  async getTables() {
    if (!this._tables) {
      const tables = await this.queryInterface.showAllTables();  
      this._tables = {};
      tables.forEach((name) => {
        this._tables[name] = new Table(this, name);
      });
    }
    return Object.keys(this._tables);
  }

  async getTable(name) {
    if (!this._tables) {
      await this.getTables();
    }
    if (!this._tables[name]) {
      throw new Error('Undefined table ' + name);
    }
    return this._tables[name];
  }

}