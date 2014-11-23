// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
autoprefixer = require('gulp-autoprefixer'),
bf = require('gulp-browserify'),
ignore = require('gulp-ignore'),
rimraf = require('gulp-rimraf'),
livereload = require('gulp-livereload');
plumber = require('gulp-plumber');

//Lint Task
gulp.task('lint', function() {
   return gulp.src('app/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/base.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/css'));

});

// Browserify
gulp.task('bf', function () {
    return gulp.src(['app/router.js'], {read: true})
        // .pipe(browserify({
        //     debug: true,
        //     transform: ['jstify'] // hbsify, нужно будет погуглить пакет, который за это отвечает, он так и называется вроде
        // }))
        .pipe(plumber())
        .pipe(rename('compile.js'))
        .pipe(gulp.dest('build/js'));

});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('build/js/compile.js')
        .pipe(plumber())
        .pipe(rename('compile.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Move index
gulp.task('move_html', function(){
    return gulp.src('src/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('build/'));
});

// Move images
gulp.task('move_images', function(){
    return gulp.src('src/**/*.png')
    .pipe(plumber())
    .pipe(gulp.dest('build/images'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('app/*.js', ['lint', 'scripts']);
    gulp.watch('app/*.scss', ['sass']);

    gulp.watch('src/*.scss', ['sass']);
    gulp.watch('src/**/*.png', ['move_images']);
    gulp.watch('src/*.html', ['move_html']);
    gulp.watch('src/**').on('change', livereload.changed);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'bf', 'scripts', 'move_html', 'watch']);
