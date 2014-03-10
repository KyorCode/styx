var gulp = require('gulp');

var jshint = require('gulp-jshint');

gulp.task('jshint',function(){
   gulp.src(['./lib/*.js','./test/*.js'])
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

gulp.task('default',['jshint'],function(){
    gulp.watch(['./lib/*.js','./test/*.js'],['jshint']);
});