const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const config = require('./config').client;

module.exports = function (singleRun) {
  return function () {
    let gulpStream = gulp.src('./client/main.scss').pipe(sass());

    if (singleRun) {
      gulpStream = gulpStream.pipe(cssnano());
    }

    return gulpStream.pipe(gulp.dest(config.destination));
  };
};
