const gulp = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const image = require('gulp-image');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function () {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('pug', function () {
    return gulp.src('./src/pages/**/*.pug')
        .pipe(pug())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('image', function () {
    gulp.src('./src/assets/img/*')
        // .pipe(image())
        .pipe(gulp.dest('./build/assets/img'));
});

gulp.task('font', function () {
    gulp.src('./src/assets/fonts/*')
        .pipe(gulp.dest('./build/assets/fonts'));
});

gulp.task('js', function() {
    gulp.src('./src/scripts/*.js')
    // .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./build/scripts/'))
  });

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './build/'
        },
    })
});

gulp.task('autoprefixer', function () {
    return gulp.src('./build/styles/style.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('bootstrap-css', function(){
    return gulp.src('./vendors/bootstrap/css/bootstrap.min.css')
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('bootstrap-js', function(){
    return gulp.src('./vendors/bootstrap/js/bootstrap.min.js')
    .pipe(gulp.dest('./build/js'));
});

gulp.task('jquery', function(){
    return gulp.src('./vendors/jquery/jquery-3.3.1.min.js')
    .pipe(gulp.dest('./build/js'));
});

gulp.task("clean", function () {
    return del(['build/index.html', 'build/styles/style.css']);
});

// gulp.task('clean', function() {
//     return del.sync('dist'); // Delete folder before building
// });

gulp.task('watch', ['sass', 'pug', 'autoprefixer', 'html', 'image', 'font', 'js', 'browserSync'], function () {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('.src/**/*.scss', ['autoprefixer']);
    gulp.watch('./src/img/*', ['image']);
    gulp.watch('./src/fonts/*', ['font']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/pages/**/*.pug', ['pug']);
    gulp.watch('./src/scripts/*', ['js']);
    gulp.watch('build/*.html', browserSync.reload);
    gulp.watch("./build/**/*.css").on("change", browserSync.reload);
    gulp.watch('./build/**/*.js').on("change", browserSync.reload);
});

gulp.task('default', ['clean', 'watch', 'image']);