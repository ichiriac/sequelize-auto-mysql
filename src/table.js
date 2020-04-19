module.exports = class Table {
  constructor(generator, name) {
    this._generator = generator;
    this._name = name;
  }
  async getFields() {
    if (!this._fields) {
      this._fields = {};
      const fields = await this._generator.queryInterface.describeTable(this._name);
      for(let name in fields) {
        let field = fields[name];
        this._fields[name] = field;
      }
    }
    return Object.keys(this._fields);
  }
  async getField(name) {

  }
  getName() {
    return this._name;
  }
  getModelName() {
    return this._name;
  }
  getIndexes() {

  }
  getIndex(name) {

  }
}