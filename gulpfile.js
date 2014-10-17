var DEV_SERVER_PORT = 8080,

    gulp = require("gulp"),
    express = require("express"),
    livereload = require("gulp-livereload"),
    path = require('path'),
    jade = require("gulp-jade"),
    clean = require("gulp-clean"),
    stylus = require("gulp-stylus"),
    open = require("open"),
    runSequence = require("run-sequence"),
    livereloadInject = require("connect-livereload"),
    nib = require("nib"),
    devServer = express();

gulp.task("clean", function(){
    return gulp.src("./build", {read: false})
        .pipe(clean());
});

gulp.task("compileViews", function(){
    return gulp.src("./dev/views/*.jade")
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest("./build/views/"));
});

gulp.task("watchViews", function(next){
    var changed = livereload.listen();
    gulp.watch("./dev/views/*.jade", function(event){
        gulp.src(event.path)
            .pipe(jade({pretty: true}))
            .pipe(gulp.dest("./build/views"))
            .pipe(livereload())
    });
    next();
});

function compileStyles(){
    return gulp.src("./dev/styles/style.styl")
        .pipe(stylus({ use: nib()}))
        .pipe(gulp.dest("./build/styles"));
}

gulp.task("compileStyles", function(){
    return compileStyles();
});

gulp.task("watchStyles", function(next){
    gulp.watch("./dev/styles/**/*.styl", function(event){
        compileStyles();
        livereload.changed("./build/styles/style.css");
    });
    next();
});

function startupDevServer(){
    devServer.use(livereloadInject({ port: 35729 }));
    devServer.use(express.static(__dirname + "/build"));
    devServer.listen(DEV_SERVER_PORT, function(){
        console.log("debugging server is up");
    });
}

gulp.task("buildDev", function(next){
    runSequence(
        "clean",
        "compileViews",
        "compileStyles",
        "watchViews",
        "watchStyles",
        function(){
            startupDevServer();
            open("http://localhost:8080/views", "chrome");
            next();
        }
    );
});

gulp.task("buildProd", function(){

});
