var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
    return gulp.src('src/styles/base.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe(connect.reload());
});

gulp.task('browserify', function () {
    return gulp.src(['src/router.js'], {read: true})
        // .pipe(browserify({
        //     debug: true,
        //     transform: ['jstify'] // hbsify, нужно будет погуглить пакет, который за это отвечает, он так и называется вроде
        // }))
        .pipe(rename('compile.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(connect.reload());

});

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.{js,hbs}'], ['browserify']);
    gulp.watch(['src/**/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'browserify', 'connect', 'watch']);
