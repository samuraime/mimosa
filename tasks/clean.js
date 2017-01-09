const del = require('del');
const config = require('./config').build;

module.exports = function() {
  return function() {
    return del([config.destination]);
  };
};
