const miniLr = require('mini-lr');
const liveReload = miniLr();
const config = require('./config').liveReload;

module.exports = function() {
  return function() {
    liveReload.listen(config.port);
  };
};

module.exports.notifyChanged = function (files) {
  liveReload.changed({
    body: {
      files: files
    }
  });
};
