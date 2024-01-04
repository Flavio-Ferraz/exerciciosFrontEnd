const gulp = require('gulp');
const sass =require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require ('gulp-uglify');
const imagemin = require('gulp-imagemin');

function comprimeImagens(){
    console.log('Executando a tarefa comprimeImagens');
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript(){
    console.log('Executando a tarefa comprimeJavascript');
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    console.log('Executando a tarefa compilaSass');
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}


exports.default = gulp.series(compilaSass, comprimeJavaScript, comprimeImagens);
{
    gulp.watch('./source/styles/*.scss', {ignoreInicial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInicial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInicial: false}, gulp.series(comprimeImagens));
    
}
