const eslint = require('gulp-eslint');
const gulp = require('gulp');
const config = require('./config').client;

module.exports = function() {
  return function() {
    return gulp.src(config.app)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  };
};
