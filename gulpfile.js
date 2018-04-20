const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassUnicode = require('gulp-sass-unicode'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    runSequence = require('run-sequence');

const
    iconFontName = "wg-iconfont",
    className = "wgi";

gulp.task('iconfont', function () {
    return gulp.src('icons/**/*.svg')
        .pipe(iconfont({
            fontName: iconFontName,
            centerHorizontally: true,
            normalize: true,
            prependUnicode: true,
            fontHeight: 1001,
            format: ['ttf', 'eot', 'woff']
        }))
        .on('glyphs', function (glyphs) {
            const options = {
                className,
                iconFontName,
                fontPath: '../fonts/', // set path to font (from your CSS file if relative)
                glyphs: glyphs.map(mapGlyphs)
            };
            gulp.src('scss/templates/_icons.scss')
                .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: iconFontName,
                    fontPath: '../fonts/' + iconFontName,
                    className: className
                }))
                .pipe(gulp.dest('scss'));

        // if you don't need sample.html, remove next 4 lines
        gulp.src('templates/index.html')
            .pipe(consolidate('lodash', options))
            .pipe(gulp.dest('./')) // set path to export your sample HTML
        })
        .pipe(gulp.dest('fonts/' + iconFontName));
});

/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs (glyph) {
    return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
}

gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass({
            indentWidth: 2,
            outputStyle: 'expanded'
        }))
        .pipe(sassUnicode())
        .pipe(gulp.dest('css'));
});

gulp.task('default', function (callBack) {
  runSequence('iconfont', 'sass', callBack);
});