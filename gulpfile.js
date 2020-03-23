const  
  gulp = require('gulp'),
  pump = require('pump'),
  babel = require('gulp-babel'),
  minify = require('gulp-minify'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  browserSync = require('browser-sync').create();

function styles() {  
  gulp.src('src/css/style.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
};

function styles2() {  
  gulp.src('src/css/style2.css')
    .pipe(concat('style2.css'))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
};

function styles3() {  
  gulp.src('src/css/style3.css')
    .pipe(concat('style3.css'))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
};


function scripts() {
  gulp.src('src/js/script.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    .pipe(minify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream());
};


function watch() {
  browserSync.init({
    server: {
        baseDir: "./app"
    }
  });

//   browserSync.init({
//     proxy: "localhost" //Here is your local site
//   });g
  
  gulp.watch('./src/css/*.css', async ()=> {
    styles(); 
    styles2(); 
    styles3();
  });
  gulp.watch('./src/js/*.js', async ()=> { 
    scripts(); 
  }); 
};

gulp.task('styles', async ()=> { 
  styles(); 
  styles2(); 
  styles3();
});
gulp.task('scripts', async ()=> {
  scripts(); 
});
gulp.task('watch', async ()=> { 
  watch(); 
});


