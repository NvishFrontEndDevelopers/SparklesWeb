'use strict';

 //////////////
 // Required
 //////////////
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var del = require('del')
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
var vinylPaths = require('vinyl-paths');
var reload = browserSync.reload;
 



  //////////////
 // Images task Task
 //////////////

 gulp.task('images',function(){
 gulp.src('app/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
 });
//////////////
 // Scripts Task
 //////////////




gulp.task('scripts',function(){
	gulp.src(['app/js/**/*.js','!app/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream:true}));
});
 //////////////
 // Sass Task
 //////////////
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
  	.pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream:true}));
});
 
 gulp.task('sass:min', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('app/css'))
   
});
 

 //////////////
 // HTML Task
 //////////////


gulp.task('html',function(){
gulp.src('app/**/*.html')
.pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clear out all files and folders from build folder
gulp.task('build:cleanfolder', function() {
	return gulp.src(['build'])
    .pipe(vinylPaths(del));
});


// task to create build directory for all files
gulp.task('build:copy', ['build:cleanfolder'], function() {
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});


// task to remove unwanted build files
// list all files and directories here that you don't want to include
gulp.task('build:remove', ['build:copy'], function(cb) {


	return gulp.src([
      'build/sass',
     	'build/js/!(*.min.js)'
     
    ])
    .pipe(vinylPaths(del));
});


gulp.task('build', ['build:copy', 'build:remove']);





 //////////////
 // Browser Task
 //////////////

 gulp.task('browser-sync',function(){
browserSync({
	 server : {
        baseDir : './app',
        routes : {
           "/node_modules": "node_modules"
        }
    }
})
 });

  gulp.task('build:serve',function(){
browserSync({
	server: {
		baseDir: "./build/"
	}
})
 });
  //////////////
 // Watch Task
 //////////////

 gulp.task('watch',function(){
 	gulp.watch('app/js/**/*.js',['scripts']);
 	gulp.watch('app/**/*.html',['html']);
 	 gulp.watch('app/sass/**/*.scss', ['sass','sass:min']);
 	 	 gulp.watch('app/images/**/*', ['images']);
 })



gulp.task('default',['images','scripts','sass','sass:min','html','browser-sync','watch'])

