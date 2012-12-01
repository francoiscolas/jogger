Jogger
======

A Javascript logger.


Description
-----------

*Jogger* is a Javascript logger which can be used in both browsers
and Node.js applications.

* Formatted messages (printf like).
* Colored messages (Node.js only).
* Output messages depending on the log level.
* Output messages depending on a filter.
* Update level and filter on running app.


Installation
------------

```bash
$ npm install jogger
```


Usage
-----

```javascript
var Jogger = require('../jogger.js');
var Log    = new Jogger({
    colorize: false,            // color messages under Node.js if true
    filter  : null,             // a RegExp object used to filter messages
    level   : Jogger.Level.w,   // will output errors and warnings only
    outputs : [                 // will output to stdout and "LOG" file
        process.stdout,
        require('fs').createWriteStream('LOG')
    ],
    port    : 3737              // optional, will listen to the specified port, see below
});

Log.e('Tag', '%s message', 'error');
Log.w('Tag', '%s message', 'warning');
Log.i('Tag', '%s message', 'info');
Log.d('Tag', '%s message', 'debug');


// change log level:
Log.level = Jogger.Level.d;

// update the filter:
Log.filter = new RegExp(/Tag/);
```


Change level and filter attributes from outside
------------------------------------

Be sure to pass the "port" option when instancing the Jogger object.

````bash
# change log level:
echo 'level d' | nc localhost 3737

# change the filter:
echo 'filter Tag' | nc localhost 3737
````


Log levels
----------

* 0 __Jogger.Level.none__: Will not output any messages.
* 1 __Jogger.Level.e__   : Will output errors.
* 2 __Jogger.Level.w__   : Will output errors and warnings.
* 3 __Jogger.Level.i__   : Will output errors, warnings and infos.
* 4 __Jogger.Level.d__   : Will output errors, warnings, infos and debugs.


Git repository
--------------

https://github.com/francoiscolas/jogger


License
-------

MIT license  

Copyright (C) 2011 by François Colas <francoiscolas@gmail.com>  

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.  

