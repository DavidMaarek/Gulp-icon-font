var gulp = require('gulp'),
    sass = require('gulp-sass'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate');

gulp.task('iconfont', function () {
    gulp.src('icons/**/*.svg')
        .pipe(iconfont({
            fontName: 'my-iconfont',
            centerHorizontally: true,
            normalize: true,
            prependUnicode: true,
            fontHeight: 1001,
            format: ['ttf', 'eot', 'woff', 'off2']
        }))
        .on('glyphs', function (glyphs) {
            gulp.src('scss/templates/_icons.scss')
                .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: 'my-iconfont',
                    fontPath: '../fonts/iconfont/',
                    className: 'my-icon'
                }))
                .pipe(gulp.dest('scss'));
        })
        .pipe(gulp.dest('fonts/iconfont'));
});

gulp.task('sass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sass({
            indentWidth: 4
            , outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});