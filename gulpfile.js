var gulp = require('gulp'),
    sass = require('gulp-sass'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate');

const
    iconFontName = "wg-iconfont",
    className = "wgi";

gulp.task('iconfont', function () {
    gulp.src('icons/**/*.svg')
        .pipe(iconfont({
            fontName: iconFontName,
            centerHorizontally: true,
            normalize: true,
            prependUnicode: true,
            fontHeight: 1001,
            format: ['ttf', 'eot', 'woff']
        }))
        .on('glyphs', function (glyphs) {
            gulp.src('scss/templates/_icons.scss')
                .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: iconFontName,
                    fontPath: '../fonts/' + iconFontName,
                    className: className
                }))
                .pipe(gulp.dest('scss'));
        })
        .pipe(gulp.dest('fonts/' + iconFontName));
});

gulp.task('sass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sass({
            indentWidth: 4,
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});