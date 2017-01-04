'use strict';

//////////////////////////////
// Requires
//////////////////////////////

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//////////////////////////////
// HTML
//////////////////////////////

// Copies HTML from the src folder to the public folder
gulp.task('html', function(){
  return gulp.src('src/pages/**/*.html')
    .pipe(gulp.dest('public'));
});

//////////////////////////////
// Images
//////////////////////////////

gulp.task('images', function(){
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'));
});

//////////////////////////////
// JS
//////////////////////////////

gulp.task('js', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

//////////////////////////////
// Sass
//////////////////////////////

gulp.task('sass', function(){
  return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('public/css'));
});

//////////////////////////////
// Watch
//////////////////////////////

gulp.task('watch', function(){
  gulp.watch('src/sass/**/*.scss', ['sass'])
  gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('src/images/**/*', ['images']);
});

//////////////////////////////
// Build
//////////////////////////////

gulp.task('build', ['sass', 'js', 'images', 'html']);

//////////////////////////////
// Serve
//////////////////////////////
gulp.task('serve', ['build'], function(){
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

//////////////////////////////
// Default
//////////////////////////////
gulp.task('default', ['serve', 'watch']);
