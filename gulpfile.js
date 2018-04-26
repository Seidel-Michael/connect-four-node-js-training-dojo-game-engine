const gulp = require('gulp');
const ts = require('gulp-typescript');
const exec = require('child_process').exec;

const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', ['tslint'], () => {
  tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});

gulp.task('tslint', (cb) => {
  exec('npm run lint', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('default', ['build'], (cb) => {
  exec('node dist/index.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});