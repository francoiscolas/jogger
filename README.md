Jogger
======

A Javascript logger.


Description
-----------

*Jogger* is a Javascript logger which can be used in both browsers
and Node.js applications.

* Write formatted messages (printf like).
* Write messages in color (Node.js only).
* Write messages depending on the log level.


Installation
------------

````bash
$ npm install jogger
````


Usage
-----

Basic usage:  
````javascript
var Jogger = require('../jogger.js');
var Log    = new Jogger();

Log.e('Tag', 'Log.level=%d (displayed)', Log.level);
Log.w('Tag', 'Log.level=%d (displayed)', Log.level);
Log.i('Tag', 'Log.level=%d (displayed)', Log.level);
Log.d('Tag', 'Log.level=%d (displayed)', Log.level);
````  

Output given from a Node.js application:  
![0-example-nodejs.png](https://raw.github.com/francoiscolas/jogger/master/examples/0-example-nodejs.png)

Output given from a browser:  
![0-example-browser.png](https://raw.github.com/francoiscolas/jogger/master/examples/0-example-browser.png)


You can also pass an object to the constructor to override default values:  
````javascript
var Jogger = require('../jogger.js');
var Log    = new Jogger({
    colorize: false,        // Default is true under Node.js and false otherwise.
    level: Jogger.Level.w   // Will only output errors and warnings.
});

Log.e('Tag', 'Log.level=%d (displayed)', Log.level);
Log.w('Tag', 'Log.level=%d (displayed)', Log.level);
Log.i('Tag', 'Log.level=%d (not displayed)', Log.level);
Log.d('Tag', 'Log.level=%d (not displayed)', Log.level);
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

