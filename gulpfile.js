// ИМПОРТИРУЕМ
import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import browser from "browser-sync";
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgo";
import svgstore from "gulp-svgstore";
import { deleteAsync as del } from "del";

// СОБИРАЕМ СТИЛИ
export const styles = () => {
  return gulp.src("source/sass/style.scss", { sourcemaps: true })
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(), csso()
  ]))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css", { sourcemaps: "."}))
  .pipe(browser.stream());
}

// ГОТОВИМ РАЗМЕТКУ
export const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build/"))
}

// ГОТОВИМ СКРИПТЫ
export const scripts = () => {
  return gulp.src("source/js/*.js")
  .pipe(terser())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js/"))
  .pipe(browser.stream());
}

// ГОТОВИМ РАСТРЫ
// оптимизируем растры
export const compressImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(squoosh())
  .pipe(gulp.dest("build/img/"))
}

// копируем растры для дева
export const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(gulp.dest("build/img/"))
}

//создаем webP
export const webpImages = () => {
  return gulp.src(["source/img/**/*.{jpg,png}", "!source/img/favicons/*", "!source/img/bg_*"])
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest("build/img/"))
}

// ГОТОВИМ ВЕКТОРЫ
// оптимизируем векторы
export const svg = () => {
  return gulp.src(["source/img/icons/*.svg", "!source/img/icons/{footer_,form_}*.svg"])
  .pipe(svgo())
  .pipe(gulp.dest("build/img/icons/"))
}

// собираем спрайты
export const sprite = (done) => {
  return [
    gulp.src("source/img/icons/footer_*.svg")
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite_footer.svg"))
    .pipe(gulp.dest("build/img/icons/")),
    done(),

    gulp.src("source/img/icons/form_*.svg")
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite_form.svg"))
    .pipe(gulp.dest("build/img/icons/")),
    done()
  ];
}

// КОПИРУЕМ ОСТАЛЬНЫЕ ФАЙЛЫ В БИЛД
export const copy = (done) => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
  "source/*.ico",
  "source/*.webmanifest",
  "source/img/favicons/*"
], {
  base: "source"
})
.pipe(gulp.dest("build")),
done();
}

// ОЧИСТКА БИЛДА
export const clean = () => {
  return del("build");
};

// ЗАПУСКАЕМ СЕРВЕР
export const server = (done) => {
  browser.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

export const reload = (done) => {
  browser.reload();
  done();
}
// ПОДКЛЮЧАЕМ ВОТЧЕРЫ
export const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// ЭКСПОРТ
// билд
export const build = gulp.series(
  clean,
  copy,
  compressImages,
  gulp.parallel(
    html,
    scripts,
    sprite,
    styles,
    svg,
    webpImages
  )
);

// дев
export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    html,
    scripts,
    sprite,
    styles,
    svg,
    webpImages
  ),
  gulp.series(
    server,
    watcher
  )
);
