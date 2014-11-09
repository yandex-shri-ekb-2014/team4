// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var bf = require('gulp-browserify');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');

//Lint Task
gulp.task('lint', function() {
   return gulp.src('app/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/base.scss')
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
        .pipe(rename('compile.js'))
        .pipe(gulp.dest('build/js'));

});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('build/js/compile.js')
        .pipe(rename('compile.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Move index
gulp.task('move_html', function(){
    return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'));
});

// Move images
gulp.task('move_images', function(){
    return gulp.src('src/**/*.png')
    .pipe(gulp.dest('build/images'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/*.js', ['lint', 'scripts']);
    gulp.watch('app/*.scss', ['sass']);

    gulp.watch('src/*.scss', ['sass']);
    gulp.watch('src/**/*.png', ['move_images']);
    gulp.watch('src/*.html', ['move_html']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'bf', 'scripts', 'move_html', 'watch']);
