const gulp = require('gulp');
const runSequence = require('run-sequence');

const clientCopyTask = require('./tasks/client_copy');
const clientBuildTask = require('./tasks/client_build');
const stylesheetTask = require('./tasks/stylesheet');
const liveReloadTask = require('./tasks/livereload');
const serverStartTasks = require('./tasks/server_start');
const serverCopyTask = require('./tasks/server_copy');
const generalCopyTask = require('./tasks/general_copy');
const eslintTask = require('./tasks/eslint');
const cleanTask = require('./tasks/clean');

gulp.task('server-start', serverStartTasks());
gulp.task('server-copy-dist', serverCopyTask());

gulp.task('general-copy-dist', generalCopyTask());

gulp.task('livereload', liveReloadTask());

gulp.task('client-copy', clientCopyTask(false, liveReloadTask.notifyChanged));
gulp.task('client-copy-dist', clientCopyTask(true));
gulp.task('client-build', clientBuildTask(false, liveReloadTask.notifyChanged));
gulp.task('client-build-dist', clientBuildTask(true));
gulp.task('client-stylesheet', stylesheetTask(false));
gulp.task('client-stylesheet-dist', stylesheetTask(true));
gulp.task('client-style', eslintTask());

gulp.task('client-stylesheet-watch', () => {
  gulp.watch(['client/*.scss', 'client/**/*.scss'], ['client-stylesheet']);
});

gulp.task('clean', cleanTask());

gulp.task('serve', (done) => {
  runSequence(
    'clean',
    ['client-build', 'client-copy', 'client-stylesheet', 'livereload', 'client-stylesheet-watch'],
    'server-start',
    done
  );
});

gulp.task('dist', (done) => {
  runSequence(
    'clean',
    ['client-build-dist', 'client-copy-dist', 'client-stylesheet-dist', 'server-copy-dist', 'general-copy-dist'],
    done
  );
});
