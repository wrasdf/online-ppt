'use strict';
// generated on 2014-11-07 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence').use(gulp);

gulp.task('scss', function () {
    return gulp.src('app/styles/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('stylesImages', function(){
    return gulp.src('app/styles/images/**/*')        
        .pipe(gulp.dest('.tmp/styles/images'))
        .pipe($.size());
});

gulp.task('styles', ['scss', 'stylesImages']);

gulp.task('html', ['styles', 'jshint'], function () {

    var htmlFilter = $.filter('**/*.html');
    var assets = $.useref.assets({searchPath: '{.tmp,app}'});
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.minifyCss()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(htmlFilter)
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

function optimizeImages(src, dist){
    return gulp.src(src)
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(dist))
        .pipe($.size());
}

gulp.task('optimizeCommonImages', function () {
    return optimizeImages('app/images/**/*', 'dist/images');
});

gulp.task('optimizeStylesImages', function () {
    return optimizeImages('app/styles/images/**/*', 'dist/styles/images/');
});

gulp.task('optimizeImages', function(){
    runSequence('optimizeCommonImages','optimizeStylesImages');
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('connect', function () {
    $.connect.server({
        root: ['app', '.tmp'],
        port: 9000,
        server: '0.0.0.0',
        livereload: true
    });
});

gulp.task('connect:dist', function () {
    $.connect.server({
        root: ['dist'],
        port: 9000,
        server: '0.0.0.0',
        livereload: true
    });
});

gulp.task('watch', function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
});



// js hint
gulp.task('jshint', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .on('error', function(err) {
      throw err;
    });
});

// js unit test task
gulp.task('jsut', function() {
  return gulp.src('test/spec/**/*.js')
    .pipe($.karma({
      configFile: 'karma.conf.js',
      singleRun: true,
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('test', function(){    
    runSequence('jshint', 'jsut');
});

gulp.task('build', function(){
    runSequence('optimizeImages','html', 'fonts', 'extras');
});

gulp.task('default', ['clean'], function () {
    gulp.start('serve');
});

gulp.task('serve', ['styles', 'connect', 'watch'], function () {
    require('opn')('http://localhost:9000');
});

gulp.task('serve:dist', ['build', 'connect:dist', 'watch'], function () {
    require('opn')('http://localhost:9000');
});














