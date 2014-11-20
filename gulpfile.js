'use strict';
// generated on 2014-11-07 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence').use(gulp);

function compileScssFile(srcFiles, destPath) {
    return gulp.src(srcFiles)
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(destPath))
        .pipe($.size());     
}

function copyImages(srcFiles, destPath){
    return gulp.src(srcFiles)        
        .pipe(gulp.dest(destPath))
        .pipe($.size());
}

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

function connectServer(rootPath){
    $.connect.server({
        root: rootPath,
        port: 9000,
        server: '0.0.0.0',
        livereload: true
    });
}

gulp.task('desktopScss', function () {
    return compileScssFile('app/desktop/styles/edit.scss', '.tmp/desktop/styles/');
});

gulp.task('mobileDefaultScss', function () {
    return compileScssFile('app/mobile/styles/default/mobile-default.scss','.tmp/mobile/styles/default/');
});

gulp.task('styleDesktopImages', function(){
    return copyImages('app/desktop/styles/images/**/*','.tmp/desktop/styles/images/');
});

gulp.task('styleMobileDefaultThemeImages', function(){
    return copyImages('app/mobile/styles/default/images/**/*','.tmp/mobile/styles/default/images/');
});

gulp.task('styles', ['desktopScss', 'styleDesktopImages', 'mobileDefaultScss', 'styleMobileDefaultThemeImages']);

gulp.task('usemin', function() {

    gulp.src('./app/desktop/*.html')
        .pipe($.usemin({
          css: [$.minifyCss(), 'concat'],
          html: [$.htmlmin({collapseWhitespace: true})],
          js: [$.uglify(), $.rev()]
        }))
        .pipe(gulp.dest('dist/desktop'))
        .pipe($.size());

    gulp.src('./app/mobile/*.html')
        .pipe($.usemin({
          css: [$.minifyCss(), 'concat'],
          html: [$.htmlmin({collapseWhitespace: true})],
          js: [$.uglify(), $.rev()]
        }))
        .pipe(gulp.dest('dist/mobile'))
        .pipe($.size());

});


gulp.task('optimizeCommonImages', function () {
    optimizeImages('app/desktop/images/**/*', 'dist/desktop/images');
    optimizeImages('app/mobile/images/**/*', 'dist/mobile/images');
});

gulp.task('optimizeDesktopImages', function () {
    optimizeImages('app/desktop/styles/images/**/*', 'dist/desktop/styles/images');
});

gulp.task('optimizeMobileDefaultThemeImages', function () {
    optimizeImages('app/mobile/styles/default/images/**/*', 'dist/mobile/styles/default/images');
});

gulp.task('optimizeAllImages', function(){
    runSequence('optimizeCommonImages','optimizeDesktopImages','optimizeMobileDefaultThemeImages');
});

gulp.task('fonts', function () {
    $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/desktop/styles/fonts'))
        .pipe($.size());

    $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/mobile/styles/default/fonts'))
        .pipe($.size());

});

gulp.task('extras', function () {
    return gulp.src(['app/*.*'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.rimraf());
});

gulp.task('watch', function () {
    var server = $.livereload();

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/desktop/scripts/**/*.js',
        'app/mobile/scripts/**/*.js',
        'app/desktop/images/**/*',
        'app/mobile/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/desktop/styles/**/*.scss', ['styles']);
    gulp.watch('app/mobile/styles/**/*.scss', ['styles']);
    gulp.watch('app/desktop/scripts/*.js');
    gulp.watch('app/desktop/scripts/**/*.js');
    gulp.watch('app/mobile/scripts/*.js');
    gulp.watch('app/mobile/scripts/**/*.js');
    gulp.watch('app/desktop/images/**/*');
    gulp.watch('app/mobile/images/**/*');
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

gulp.task('connect', function () {
    connectServer(['app', '.tmp']);
});

gulp.task('connect:dist', function () {
    connectServer(['dist']);
});

gulp.task('test', function(){    
    runSequence('jshint', 'jsut');
});

gulp.task('build', function(){
    runSequence('clean', 'test', 'optimizeAllImages', 'styles', 'usemin', 'fonts', 'extras');
});

gulp.task('serve', function () {
    runSequence('clean', 'styles', 'connect', 'watch', function(){
        require('opn')('http://localhost:9000/desktop/edit.html');    
    });
});

gulp.task('serve:dist', function () {
    runSequence('build', 'connect:dist', 'watch', function(){
        require('opn')('http://localhost:9000/mobile/');
    });
});

gulp.task('default', ['clean'], function () {
    gulp.start('serve');
});

