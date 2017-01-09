const gulp = require('gulp');
const config = require('./config').server;

module.exports = function() {
  return function() {
    return gulp.src(config.source)
      .pipe(gulp.dest(config.destination));
  };
};
