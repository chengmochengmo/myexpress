var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    pxtorem  =  require('gulp-px2rem-plugin');
gulp.task('auto', function () {
    gulp.watch('public/index/less/**/*.less', ['docss']);
});

gulp.task('docss', function () {
    docss()
});

function docss() {
    gulp.src(['public/index/less/**/*.less','!**/base.less'])
        .pipe(less())
        .pipe(pxtorem({'width_design':720,'valid_num':6,'pieces':36}))
        // .pipe(cssmin())
        .pipe(gulp.dest('public/index/css'));
}
