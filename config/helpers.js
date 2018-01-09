var path = require('path');
var ROOT = path.resolve(__dirname, '..');

var root = path.join.bind(path, ROOT);

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

exports.hasProcessFlag = hasProcessFlag;
exports.root = root;
