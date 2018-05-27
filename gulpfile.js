'use strict';

const gulp = require('gulp');
const sourceMap = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// compile Sass files
gulp.task('sass', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sourceMap.init())
        .pipe(plumber())
        .pipe(sass())
        // .pipe(sass({
        //     outputStyle: 'compressed'
        // }))
        .pipe(autoprefix({
            grid: true
        }, 'last 2 versions'))
        .pipe(sourceMap.write())
        .pipe(gulp.dest('dist/css/'))
        //browserSync reload application
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('browserSync', function () {
    return browserSync.init({
        server: {
            baseDir: './'
        }
    })
})

gulp.task('default', ['sass', 'browserSync'], function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
})