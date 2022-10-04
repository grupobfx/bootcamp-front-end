const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const bro = require('gulp-bro');
const uglify = require('gulp-uglify');
const log = require('gulplog');
const browsersync = require('browser-sync');

const projectFiles = {
  css: ['./src/css/*.css'],
  img: ['./src/img/*.png', './src/img/*.jpeg', './src/img/*.svg'],
  html: ['./src/html/*.html'],
  json: ['./src/js/*.json'],
  assets: ['./src/assets/*.*'],
  fontawesome: [
    './node_modules/@fortawesome/fontawesome-free/js/brands.min.js',
    './node_modules/@fortawesome/fontawesome-free/js/solid.min.js',
    './node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js',
  ],
};

const cleanFiles = async (done) => {
  await del('dist/**', { force: true });
  done();
};

const cssCompile = () => gulp
  .src('./src/css/*.scss')
  .pipe(sourcemaps.init())
  .pipe(
    sass
      .sync({
        outputStyle: 'compressed',
      })
      .on('error', sass.logError),
  )
  .pipe(sourcemaps.write('./dist/css'))
  .pipe(gulp.dest('./dist/css'));

const cssCompileProd = () => gulp
  .src('src/css/*.scss')
  .pipe(
    sass
      .sync({
        outputStyle: 'compressed',
      })
      .on('error', sass.logError),
  )
  .pipe(gulp.dest('dist/css'));

const copyFiles = (done) => {
  gulp.src(projectFiles.img).pipe(gulp.dest('dist/img'));
  gulp.src(projectFiles.html).pipe(gulp.dest('dist'));
  gulp.src(projectFiles.json).pipe(gulp.dest('dist/json'));
  gulp.src(projectFiles.assets).pipe(gulp.dest('dist/assets'));
  gulp.src(projectFiles.fontawesome).pipe(gulp.dest('dist/assets/fontawesome'));
  done();
};

const jsClientDev = (callback) => {
  gulp
    .src(['./src/js/app.js'])
    .pipe(sourcemaps.init())
    .pipe(
      bro({
        transform: [
          babelify.configure({
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }),
        ],
      }),
    )
    .pipe(sourcemaps.write())
    // .pipe(rename("app.js"))
    .pipe(sourcemaps.write('./dist/js'))
    .pipe(gulp.dest('./dist/js'));

  callback();
};

const jsClient = (callback) => {
  gulp
    .src(['./src/js/app.js'])
    .pipe(
      bro({
        transform: [
          babelify.configure({
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }),
        ],
      }),
    )
    .pipe(uglify())
    .on('error', log.error)
    // .pipe(rename("app.js"))
    .pipe(gulp.dest('./dist/js'));

  callback();
};

const watchProject = () => {
  gulp.watch('./src/img/*', copyFiles);
  gulp.watch('./src/html/*.html', copyFiles);
  gulp.watch('./src/assets/*.*', copyFiles);
  gulp.watch('./src/css/*.scss', cssCompile);
  gulp.watch([
    './src/js/app.js', './src/js/utils.js',
    './src/js/settings.js', './src/js/ui.js',
    './src/js/menu.js', './src/js/inicio.js',
    './src/js/http.js', './src/js/api.js',
    './src/js/pages/*.js',
  ], jsClientDev);
};

const browser = (done) => {
  browsersync.init({
    server: {
      baseDir: './dist',
      index: ['index.html'],
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    port: 3300,
    watch: true,
  });
  done();
};

const defaultTasks = gulp.series(
  cleanFiles,
  copyFiles,
  cssCompile,
  jsClientDev,
  // watchProject,
  gulp.parallel(watchProject, browser),
);

const productionTasks = gulp.series(
  cleanFiles,
  copyFiles,
  cssCompileProd,
  jsClient,
);

exports.default = defaultTasks;
exports.production = productionTasks;
