const gulp = require('gulp');
const config = require('./config').general;

module.exports = function() {
  return function() {
    return gulp.src(config.source)
      .pipe(gulp.dest(config.destination));
  };
};
