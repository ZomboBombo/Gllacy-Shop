"use strict";

var gulp = require("gulp");

// --- Вспомогательные утилиты ---
var pipeline = require("readable-stream").pipeline;
var rename = require("gulp-rename");
var del = require("del");

// --- HTML-утилиты ---
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");

// --- Препроцессорные утилиты ---
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");

// --- CSS-утилиты ---
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");

// --- Серверные утилиты ---
var server = require("browser-sync").create();


/*
###############################################################################
------------------------------------ ТАСКИ ------------------------------------
###############################################################################
*/

// *** Обработка SCSS и CSS ***
gulp.task("css", () => {
  return pipeline(
    gulp.src("source/sass/styles.scss"),
    plumber(),
    sourcemap.init(),
    sass(),
    postcss([
      autoprefixer()
    ]),
    gulp.dest("source/css"),
    csso(),
    rename("styles.min.css"),
    sourcemap.write("."),
    gulp.dest("source/css"),
    server.stream()
  );
});


// *** Обработка HTML ***
gulp.task("html", () => {
  return pipeline(
    posthtml([
      include()
    ]),
    htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }),
    gulp.dest("build")
  );
});


// *** Работа с сервером ***
gulp.task("server", () => {
  server.init({
    server: "source",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{sass,scss}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("refresh"));
});

gulp.task("refresh", (done) => {
  server.reload();
  done();
});


// === Главные задачи для сборки проекта в "продакшн" и поднятия сервера ===
gulp.task("start", gulp.series("server"));
