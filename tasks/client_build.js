const webpack = require('webpack');
const util = require('gulp-util');

module.exports = function(singleRun, callback) {
  return function(cb) {
    const webpackConfig = singleRun ? require('./config/webpack.dist') : require('./config/webpack');
    const webpackBuild = webpack(webpackConfig);
    let firstRun = true;

    const callbackOnBuild = function(err, stats) {
      if (err) {
        throw new util.PluginError('webpack:error', err);
      }

      const statistics = stats.toJson({
        children: false,
        source: false,
        modules: false,
        chunkModules: false
      });

      const elapsedTime = Math.round(statistics.time / 10) / 100;

      if (singleRun) {
        cb();
      } else {
        if (firstRun) {
          cb();
          firstRun = false;
        } else {
          util.log(`webpack:build ${elapsedTime} s`);

          callback(
            statistics.assets.map((file) => file.name)
          );
        }
      }
    };

    if (singleRun) {
      webpackBuild.run(callbackOnBuild);
    } else {
      webpackBuild.watch({ aggregateTimeout: 100 }, callbackOnBuild);
    }
  };
};
