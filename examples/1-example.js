var Jogger = require('../jogger');
var Log    = new Jogger({
    colorize: false,         // Default is true under Node.js and false otherwise.
    level   : Jogger.Level.w // Will output errors and warnings only.
});

Log.e('Tag', 'Log.level=%d (displayed)', Log.level);
Log.w('Tag', 'Log.level=%d (displayed)', Log.level);
Log.i('Tag', 'Log.level=%d (not displayed)', Log.level);
Log.d('Tag', 'Log.level=%d (not displayed)', Log.level);
