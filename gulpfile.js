var DEV_SERVER_PORT = 8080

    gulp = require("gulp"),
    express = require("express"),
    livereload = require("gulp-livereload"),
    path = require('path'),
    jade = require("gulp-jade"),
    clean = require("gulp-clean"),
    runSequence = require("run-sequence"),
    devServer = express();

gulp.task("cleanViews", function(){
    return gulp.src("./build/views", {read: false})
        .pipe(clean());
});

gulp.task("compileViews", ["cleanViews"], function(){
    return gulp.src("./dev/views/*.jade")
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest("./build/views/"));
});

gulp.task("watchViews", function(next){
    var changed = livereload();
    gulp.watch("./dev/views/*.jade", function(event){
        gulp.src(event.path)
            .pipe(jade({pretty: true}))
            .pipe(gulp.dest("./build/views"))
            .pipe(livereload())
    });
    next();
});

function startupDevServer(){
    devServer.use(express.static(__dirname + "/build"));
    devServer.listen(DEV_SERVER_PORT, function(){
        console.log("debugging server is up ");
    });
}

gulp.task("buildDev", function(next){
    runSequence(
        "compileViews",
        "watchViews",
        function(){
            startupDevServer();
            next();
        }
    );
});

gulp.task("buildProd", function(){

});
