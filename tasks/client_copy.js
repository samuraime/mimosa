const gulp = require('gulp');
const watch = require('gulp-watch');
const deleteLines = require('gulp-delete-lines');
const config = require('./config').client;

module.exports = function(singleRun, callback) {
  return function() {
    const gulpStream = gulp.src(config.source);

    if (!singleRun) {
      const clientWatch = watch(config.source, { verbose: true });

      if (callback) {
        clientWatch.on('change', (fileName) => {
          callback([fileName]);
        });
      }

      gulpStream.pipe(clientWatch);
    } else {
      gulpStream.pipe(deleteLines({
        filters: [
          /livereload/i
        ]
      }));
    }

    return gulpStream.pipe(gulp.dest(config.destination));
  };
};
