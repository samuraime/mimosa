const nodemon = require('gulp-nodemon');

module.exports = function() {
  return function () {
    return nodemon({
      script: 'server/index.js',
      watch: ['server'],
      ignore: ['node_modules/**'],
      nodeArgs: ['--harmony'],
      ext: 'js html',
      env: {
        NODE_ENV: 'development'
      }
    });
  };
};
