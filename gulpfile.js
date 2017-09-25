const gulp = require('gulp');
const concat = require('gulp-concat');
const browserySync = require('browser-sync');

const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const dependencies = require('./dependencies');
const scripts = require('./script');
const styles = require('./style');
const ngAnnotate = require('gulp-ng-annotate');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

var devMode = false;
var static_path = './static/js/'

gulp.task('dependecies', function(){
    gulp.src(dependencies)
        .pipe(concat('dependecies.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())        
        .pipe(gulp.dest(static_path))
        .pipe(browserySync.reload({
            stream: true
        }));
});

gulp.task('js', function(){
    gulp.src(scripts)
        .pipe(concat('script.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(static_path))
        .pipe(browserySync.reload({
            stream: true
        }));
});

gulp.task('css', function(){
    gulp.src(styles)
        .pipe(cleanCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./static/css/'))
        .pipe(browserySync.reload({
            stream: true
        }));
});

gulp.task('html', function(){
    gulp.src('./app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true,
                       removeOptionalTags: true}))
        .pipe(gulp.dest('./static/'))
        .pipe(browserySync.reload({
            stream: true
        }));
});

gulp.task('imgs', function(){
    gulp.src(['./assets/images/**/*.+(png|jpeg|jpg|svg)'])
        .pipe(gulp.dest('./static/images/'))
        .pipe(browserySync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function(){
    browserySync.init(null, {
        open: false,
        server: {
            baseDir: 'static'
        }
    });
});

gulp.task('build', function(){
    gulp.start(['css', 'dependecies', 'js','imgs', 'html']);
});

gulp.task('start', function(){
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./assets/**/*.css'], ['css']);
    gulp.watch(scripts, ['js']);
    gulp.watch(dependencies, ['dependecies']);
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./assets/images/**/*.*'], ['imgs']);    
});

gulp.task('default', function(){
    gulp.start(['start']);
})