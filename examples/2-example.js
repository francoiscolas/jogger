var Jogger = require('../jogger');
var Log    = new Jogger({
    port: 3737
});

console.log("-> To change the log level:");
console.log("    echo 'level LEVEL' | nc localhost 3737");
console.log("");
console.log("    Examples:");
console.log("        echo 'level d' | nc localhost 3737 # will log errors, warnings, infos, debugs");
console.log("        echo 'level i' | nc localhost 3737 # will log errors, warnings, infos");
console.log("        echo 'level w' | nc localhost 3737 # will log errors, warnings");
console.log("        echo 'level e' | nc localhost 3737 # will log errors");
console.log("");
console.log("");
console.log("-> To change the filter:");
console.log("    echo 'filter FILTER' | nc localhost 3737");
console.log("");
console.log("    Examples:");
console.log("        echo 'filter Core|Network' | nc localhost 3737 # will log messages tagged with \"Core\" or \"Network\"");

setTimeout(function () {
    var r = function (max) {
        return Math.floor(Math.random() * max);
    };

    setInterval(function () {
        var levels = [Log.e, Log.w, Log.i, Log.d];
        var tags   = ['Core', 'Network', 'Database'];

        levels[r(4)].call(Log, tags[r(3)], 'message...');
    }, 500);
}, 2000);
