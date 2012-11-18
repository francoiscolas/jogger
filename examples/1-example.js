var Jogger = require('../jogger');
var Log    = new Jogger({
    colorize: false,            // default is true under Node.js and false otherwise
    level   : Jogger.Level.w,   // will output errors and warnings only
    outputs : [                 // will output to stdout and "LOG" file
        process.stdout,
        require('fs').createWriteStream('LOG')
    ]
});

Log.e('Tag', '%s message', 'error');
Log.w('Tag', '%s message', 'warning');
Log.i('Tag', '%s message', 'info');
Log.d('Tag', '%s message', 'debug');
