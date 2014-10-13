var DEV_SERVER_PORT = 8080,
    LIVERELOAD_SERVER_PORT = 35729,


    gulp = require("gulp"),
    express = require("express"),
    lr = require("tiny-lr")(),
    path = require('path'),
    devServer = express();

function startupDevServer(){
    devServer.use(express.static(__dirname + "/dev"));
    devServer.listen(DEV_SERVER_PORT, function(){
        console.log("debugging server is up ");
    });
    lr.listen(LIVERELOAD_SERVER_PORT);
    gulp.watch("./dev/*.html", function(event){
        var fileName = path.relative(__dirname, event.path);

        lr.changed({
            body: {
                files: [fileName]
            }
        });
    });
}

gulp.task("buildDev", function(){
    startupDevServer();
});

gulp.task("buildProd", function(){

});
