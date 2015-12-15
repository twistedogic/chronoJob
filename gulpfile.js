var gulp = require('gulp'),
	gutil = require('gulp-util'),
	mocha = require('gulp-mocha'),
  istanbul = require('gulp-istanbul');

gulp.task('pre-test', function () {
  return gulp.src(['lib/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test',['pre-test'],function(){
	return gulp.src('./test/*.js',{read:false})
	// .pipe(mocha({reporter: 'nyan'}))
	.pipe(mocha())
	.on('error', gutil.log)
  .pipe(istanbul.writeReports());
})

gulp.task('watch',function(){
	gulp.watch(['./lib/**/*.js'],['test'])
})

gulp.task('default',['test']);
