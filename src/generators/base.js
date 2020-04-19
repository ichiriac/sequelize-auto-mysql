module.exports = class Base {
  constructor(opt) {
    if (!opt) {
      opt = {};
    }
    this._space = opt.space || '  ';
    this._linebreak = opt.linebreak || "\n";
    this._header = opt.header || '';
    this._footer = opt.footer || '';
  }
  generate(table) {
    this._buffer = '';
    this._inc = '';
    if (this._header) {
      this._buffer += this._header;
    }
    this._visit(table);
    if (this._footer) {
      this._buffer += this._footer;
    }
    return this._buffer;
  }
  _visit(table) {
    throw new Error('The function _visit must be implemented');
  }
  write(code) {
    this._buffer += code;
    return this;
  }
  writeLine(code) {
    this._buffer += this._linebreak + this._inc + code;
    return this;
  }
  getString(value) {
    return JSON.stringify(value);
  }
  increment() {
    this._inc += this._space;
    return this;
  }
  decrement() {
    if (this._inc.length > this._space.length) {
      this._inc = this._inc.substring(0, this._inc.length - this._space.length);
    } else {
      this._inc = '';
    }
    return this;
  }
}