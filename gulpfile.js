var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  browserSync = require('browser-sync'),
  rigger = require('gulp-rigger'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCss = require('gulp-clean-css');

var workDir = './';

var path = {
  app: {
    js: workDir + 'app/js/**/*.js',
    style: workDir + 'app/stylus/*.styl',
    img: workDir + 'app/img/**/*.*',
    html: workDir + 'app/html/*.html'
  },
  dist: {
    js: workDir + 'dist/js/libs/',
    css: workDir + 'dist/css/',
    img: workDir + 'dist/img/',
    html: workDir + 'dist/'
  },
  watch: {
    js: workDir + 'app/js/**/*.js',
    style: workDir + 'app/stylus/**/*.styl',
    img: workDir + 'app/img/**/*.*',
    html: workDir + 'app/html/**/*.html'
  }
};

gulp.task('html', function () {
  gulp.src(path.app.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('css', function () {
  return gulp.src(path.app.style)
    .pipe(stylus())
    .pipe(cleanCss())
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('scripts', function () {
  return gulp.src([
    'app/js/libs/jquery/dist/jquery.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
});

gulp.task('sync', function () {
  browserSync({
    server: {
      baseDir: 'dist'
    },
    notify: false
  });
});

gulp.task('watch', ['sync', 'css', 'html'], function () {
  gulp.watch(path.watch.style, ['css']);
  gulp.watch(path.watch.html, ['html']);
});