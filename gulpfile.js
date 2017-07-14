var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templates = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');
let cleanCSS = require('gulp-clean-css');

gulp.task('templates', function () {
  gulp.src([
      './**/*.html',
      '!./node_modules/**',
      '!./demo/**'
    ])
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('tmp'));
});

// Concat and minify all your css

gulp.task('css', function () {
    let cssFiles = [
        './node_modules/blueimp-gallery/css/blueimp-gallery-indicator.css',
        './node_modules/blueimp-gallery/css/blueimp-gallery-video.css',
        './node_modules/blueimp-gallery/css/blueimp-gallery.css',
        './src/ng-blueimp-gallery.css'
    ];
    gulp.src(cssFiles)
        .pipe(concat('ng-blueimp-gallery.css'))
        .pipe(gulp.dest('dist'));
    gulp.src(cssFiles)
        .pipe(cleanCSS())
        .pipe(concat('ng-blueimp-gallery.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('blueimp', function () {
    let blueimpGallery = './node_modules/blueimp-gallery/js/blueimp-gallery.js';
    let blueimpGalleryIndicator = './node_modules/blueimp-gallery/js/blueimp-gallery-indicator.js';
    gulp.src([
        blueimpGallery,
        blueimpGalleryIndicator
    ])
        .pipe(gulp.dest('dist'));
    gulp.src([
        blueimpGallery
    ])
        .pipe(concat('blueimp-gallery.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    gulp.src([
        blueimpGalleryIndicator
    ])
        .pipe(concat('blueimp-gallery-indicator.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Concat and uglify all your JavaScript

gulp.task('default', ['templates', 'css', 'blueimp'], function() {
    let jsFiles = [
        './**/*.js',
        '!./node_modules/**',
        '!./demo/**',
        '!./gulpfile.js',
        '!./dist/**'
    ];
    gulp.src(jsFiles)
        .pipe(concat('ng-blueimp-gallery.js'))
        .pipe(gulp.dest('dist'));
    gulp.src(jsFiles)
        .pipe(concat('ng-blueimp-gallery.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});