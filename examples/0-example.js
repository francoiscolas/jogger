var Jogger = require('../jogger');
var Log    = new Jogger();

Log.e('Tag', '%s message', 'error');
Log.w('Tag', '%s message', 'warning');
Log.i('Tag', '%s message', 'info');
Log.d('Tag', '%s message', 'debug');
