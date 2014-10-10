var DEV_SERVER_PORT = 8080,
    LIVERELOAD_SERVER_PORT = 20202,


    gulp = require("gulp"),
    express = require("express"),
    lr = require("tiny-lr"),
    devServer = express();

function startupDevServer(){
    devServer.use(express.static(__dirname + "/dev"));
    var some = devServer.listen(DEV_SERVER_PORT, function(){
        console.log("debugging server is up ");
    }).on("close", function(){
        console.log("dev server is down");
    });
}

gulp.task("buildDev", function(){
    startupDevServer();
});

gulp.task("buildProd", function(){

});
