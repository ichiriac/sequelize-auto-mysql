const Base = require('./base');
module.exports = class Javascript extends Base {
  _visit(table) {
    this.header();
    this.writeLine(this.getString(table.getModelName()));
    this.writeFields(table);
    this.writeTableOptions(table);
    this.footer();
  }
  writeFields(table) {
    this.write(',');
    this.writeLine('{').increment();
    const fields = table.getFields();
    fields.forEach(function(field) {
      const options = table.getField(field);
    });
    this.decrement().writeLine('}');
  }
  writeTableOptions(table) {
    this.write(',');
    this.writeLine('{').increment();
    this.writeLine('tableName: ' + this.getString(table.getName()));
    // @todo
    this.decrement().writeLine('}');
  }
  header() {
    this.writeLine(
      'module.exports = function (sequelize, DataTypes) {'
    ).increment();
    this.writeLine(
      'return sequelize.define('
    ).increment();
  }
  footer() {
    this.decrement().writeLine(
      ');'
    );    
    this.decrement().writeLine(
      '}'
    );
  }
}