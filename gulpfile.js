/// <binding BeforeBuild='clean' AfterBuild='css' Clean='clean' />
var gulp = require("gulp"),
    fs = require("fs"),
    sass = require("gulp-sass"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};


paths.jsDest = paths.webroot + "js/";
paths.cssDest = paths.webroot + "css/";
paths.css = paths.cssDest + "**/*.css";
paths.minCss = paths.cssDest + "**/*.min.css";
paths.concatCssDest = paths.cssDest + "site.min.css";

gulp.task("clean:js", done => rimraf(paths.jsDest, done));
gulp.task("clean:css", done => rimraf(paths.cssDest, done));
gulp.task("clean", gulp.series(["clean:js", "clean:css"]));

gulp.task("sass", function () {
    return gulp.src('scss/site.scss')
        .pipe(sass())
        .pipe(gulp.dest('wwwroot/css'));
});

gulp.task("min:css", () => {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("vendor:js", function() {
    return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
                     "node_modules/jquery/dist/jquery.slim.min.js",
                     "node_modules/popper.js/dist/umd/popper.min.js"])
                .pipe(gulp.dest('wwwroot/js'));
});

gulp.task("css", gulp.series(["sass", "min:css"]));

gulp.task('watch', () => {
    gulp.watch("scss/**/*.scss", gulp.series(["css"]));
});

gulp.task("default", gulp.series(["clean", "css", "vendor:js"]));