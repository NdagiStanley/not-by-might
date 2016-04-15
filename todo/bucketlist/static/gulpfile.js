var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
  return gulp.src('/Users/stanmd/Projects/CP/CP#/not-by-might/todo/bucketlist/static/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('/Users/stanmd/Projects/CP/CP#/not-by-might/todo/bucketlist/static/build/css/'))
    })


gulp.task('uglify', function() {
  return gulp.src('/Users/stanmd/Projects/CP/CP#/not-by-might/todo/bucketlist/static/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('/Users/stanmd/Projects/CP/CP#/not-by-might/todo/bucketlist/static/build/js/'))
    })

gulp.task('minify', ['minify-css', 'uglify']);
