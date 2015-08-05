var gulp = require('gulp'),
    gutil = require('gulp-util'),
    mocha = require('gulp-mocha');

gulp.task('test',function(){
    return gulp.src('./test/*.js',{read:false})
    .pipe(mocha({reporter: 'nyan'}))
    .on('error', gutil.log);
})

gulp.task('watch',function(){
    gulp.watch(['./lib/**'],['test'])
})

gulp.task('default',['test']);