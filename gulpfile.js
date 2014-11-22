var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var isProduction = -1 !== process.argv.indexOf('--prod');

gulp.task('sass', function() {
    var stream = gulp.src('src/styles/base.scss')
        .pipe(sass())
        .on('error', console.log)
        .pipe(rename('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .on('error', console.log);

    if (isProduction) {
        stream.pipe(minifycss());
    }

    stream
        .pipe(gulp.dest('assets/css'))
        .pipe(connect.reload());
});

gulp.task('browserify', function () {
    var stream = gulp.src(['src/router.js'], {read: true})
        .pipe(browserify({
            debug: true,
            transform: ['hbsify'],
        }))
        .on('error', console.log)
        .pipe(rename('app.js'));

    if (isProduction) {
        stream.pipe(uglify());
    }

    stream
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

gulp.task('build', ['sass', 'browserify']);
gulp.task('default', ['build', 'connect', 'watch']);
