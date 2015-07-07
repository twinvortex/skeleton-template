var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

// Copy css min files / fonts / js min files from twitter bootstrap, jquery, font-awesome
gulp.task('copycss', function() {
	gulp.src('./node_modules/bootstrap/dist/bootstrap.min.css')
		.pipe(gulp.dest('./public/assets/css'));

	gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('./public/assets/css'));
});

gulp.task('copyfonts', function() {
	gulp.src('./node_modules/bootstrap/dist/fonts/**/*.{ttf,woff,woff2,eot,svg,otf}')
		.pipe(gulp.dest('./public/assets/fonts'));

	gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,woff2,eot,svg,otf}')
		.pipe(gulp.dest('./public/assets/fonts'));
});

gulp.task('copyjs', function() {
	gulp.src('./node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('./public/assets/js'));

	gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
		.pipe(gulp.dest('./public/assets/js'));
})
// END of copy

gulp.task('css', function () {
	gulp.src('assets/sass/**/*.scss')
		.pipe(sass({errLogToConsole: true}))
		.pipe(autoprefixer('last 15 versions'))
		.pipe(minifycss())
		.pipe(gulp.dest('public/assets/css'))
});

gulp.task('compress', function () {
	gulp.src('assets/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/assets/js'))
});

gulp.task('images', function () {
	gulp.src('assets/images/**/*.jpg')
		.pipe(gulp.dest('public/assets/images'));

	gulp.src('assets/images/**/*.png')
		.pipe(gulp.dest('public/assets/images'));

	gulp.src('assets/images/**/*.gif')
		.pipe(gulp.dest('public/assets/images'));
});

gulp.task('watch', function () {
	gulp.watch('assets/sass/**/*.scss', ['css']);
	gulp.watch('assets/js/**/*.js', ['compress']);
	gulp.watch('assets/images/**/*.jpg', ['images']);
	gulp.watch('assets/images/**/*.png', ['images']);
	gulp.watch('assets/images/**/*.gif', ['images']);
});

gulp.task('default', ['watch', 'copycss', 'copyfonts', 'copyjs']);