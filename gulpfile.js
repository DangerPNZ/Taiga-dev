'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); // препроцессор
var plumber = require('gulp-plumber'); // позволяет создать цепочку обработки процесса
var postcss = require('gulp-postcss'); // для автопрефексера
var mqpacker = require('css-mqpacker'); // объединяет media выражения в css
var autoprefixer = require('autoprefixer'); // автопрефиксер css
var server = require('browser-sync').create(); // локальный сервер
var minify = require('gulp-csso'); // минификация css
var rename = require('gulp-rename'); // позволяет сохранить файл с переименовыванием
var imageMin = require('gulp-imagemin'); // минификация и оптимизация изображений
var uglify = require('gulp-uglify'); // минификация js
var run = require('run-sequence'); // позволяет выполнять задачи, дожидаясь выполнения предидущей
var del = require('del'); // позволяет удалить папку\файл

/* для создания svg спрайта */ 
// var svgMin = require('gulp-svgmin'); // в devDependences не прописано
// var svgStore = require('gulp-svgstore'); // в devDependences не прописано


gulp.task('style', function() {
    gulp.src('sass/style.scss')
        .pipe(plumber())
            .pipe(sass()) // преобразует sass в css
                .pipe(postcss([
                    autoprefixer({browsers: [
                        'last 2 versions' // автопрефиксер для 2х последних версий браузеров
                    ]}),
                    mqpacker({
                        sort: true // объединяем медиавыражения
                    })
                ]))
                    .pipe(gulp.dest('css'))
                        .pipe(minify()) // минификация css
                            .pipe(rename('style.min.css')) // переименование минифицированной копии
                                .pipe(gulp.dest('css')) // сохранение
                                    .pipe(server.stream()); // запуск локального сервера
});

gulp.task('imageMin', function(){
    return gulp.src('img/**/*.{png,jpg,jpeg,gif}') // из папки img, во всех вложенный папках, на всех подуровнях, все файлы с перечисленными расширениями
    .pipe(imageMin([
        imageMin.optipng({optimizationLevel: 3}), // уровень минификации
        imageMin.jpegtran({progressive: true}) // jpg преобразовать в progressive jpg
    ]))
        .pipe(gulp.dest('build/img')); // сохранить в...
});

gulp.task('server', function() { 
    server.init({ // параметры локального сервера
        server: '.',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('sass/**/*.{scss,sass}', ['style']); // при изменении sass файлов пересобирать css файл
    gulp.watch('js/**/*.js').on('change', server.reload); // при изменении js файлов перезагружать сервер
    gulp.watch('*.html').on('change', server.reload); // при изменении html файлов перезагружать сервер
});

gulp.task('jsMin', function() {
    return gulp.src('js/**/*.js') // взять из папки js из всех подпапок все js файлы
                    .pipe(uglify()) // минифицировать копии
                        .pipe(gulp.dest('build/js')); // записать в указанном месте
});

// Создаёт svg спрайт (внимание, проверить\править путь к папке с svg)
// вызвать коммандой gulp createSvgSprite
// содержимое полученного файла вставлять ПЕРВЫМ элементом внутри body
// gulp.task('createSvgSprite', function() {
//     return gulp.src('img/svg/*.svg')
//         .pipe(svgMin())
//             .pipe(svgStore({
//                 inlineSvg: true
//             }))
//                 .pipe(rename('sprite.svg'))
//                     .pipe(gulp.dest('build/img'));
// });

gulp.task('makeCopyes', function(){
    return gulp.src([ // взять файлы
        '*.html',
        'css/**',
        'fonts/**' 
    ],{
        base: '.' // откуда (корневая папка)
    },).pipe(gulp.dest('build')); // куда сохранить копии
});

gulp.task('cleanBuild', function(){
    return del('build'); // удаляет папку или файл
});

gulp.task('build', function(cb){
    run('cleanBuild', 'jsMin', 'style', 'imageMin', 'makeCopyes', cb); // цепочка вызова тасков при создании build версии, callback сообщает о завершении выполнения всех тасков    
});