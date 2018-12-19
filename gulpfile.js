/************
 * PACKAGES *
 ************/
const	gulp		= require('gulp'),
		autoprefixer= require('gulp-autoprefixer'),
		connect		= require('gulp-connect'),
		minify		= require('gulp-minify'),
		open		= require('gulp-open'),
		rename		= require('gulp-rename'),
		sass		= require('gulp-sass'),
		sourcemaps	= require('gulp-sourcemaps'),
		log			= require('./logger')();

/***************
 * CONFIG VARS *
 ***************/
const	_$sass	= './sass/**/*.scss',
		_$main	= './sass/main.scss',
		_$css	=  './public/css/';

/***************************************************
 *                      SASS                       *
 * COMPILES, AUTOPREFIXES, SOURCEMAPS AND MINIFIES *
 ***************************************************/
gulp.task('sass', () => {
	return gulp.src(_$main)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		})).on('error', sass.logError)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
		.pipe(rename('main.min.scss'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(_$css))
		.pipe(connect.reload())
		.on('end', ()=>{
			log('SaSS Compilado', 'purple');
		});
});

/************************
 *       WATCHERS       *
 * WATCHES SASS CHANGES *
 ************************/
gulp.task('watchers', (done) => {
	log('Watches Init', 'yellow');
	gulp.watch(_$sass, gulp.series('sass'));
	done();
});

/**********************
 * TASKS TO BE CALLED *
 **********************/
gulp.task('dev', gulp.parallel('watchers'));