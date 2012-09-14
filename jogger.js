/**
 * Copyright (C) 2011 by François Colas <francoiscolas@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function () {

    var _extend = function (root) {
        var objects = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < objects.length; i++)
        {
            for (var property in objects[i])
                root[property] = objects[i][property];
        }
        return root;
    };

    var Jogger = function (options) {
        var self = this;

        self.colorize = false;
        self.level    = Jogger.Level.d;
        self._class   = Jogger;

        if (typeof process !== 'undefined') // Running with Node.js
        {
            self.colorize = (process.stdout && process.stdout.isTTY);
            self.level    = Jogger.Level.d;

            process.on('uncaughtException', function (error) {
                self.e('process', 'Error: %s', error.stack);
            });
        }

        _extend(self, options);
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = Jogger;
    else
        this.Jogger = Jogger;

    Jogger.VERSION = '1.0.0';

    Jogger.Level = {
        none: 0,
        e   : 1,
        w   : 2,
        i   : 3,
        d   : 4
    };

    Jogger.prototype = {

        e: function (tag, format/*, arguments*/) {
            this._write.apply(this, ['e'].concat(Array.prototype.slice.call(arguments, 0)))
        },

        w: function (tag, format/*, arguments*/) {
            this._write.apply(this, ['w'].concat(Array.prototype.slice.call(arguments, 0)))
        },

        i: function (tag, format/*, arguments*/) {
            this._write.apply(this, ['i'].concat(Array.prototype.slice.call(arguments, 0)))
        },

        d: function (tag, format/*, arguments*/) {
            this._write.apply(this, ['d'].concat(Array.prototype.slice.call(arguments, 0)))
        },

        _write: function (type, tag, format/*, arguments...*/) {
            if (typeof console !== 'undefined'
                    && this.level >= Jogger.Level[type])
            {
                var args = [Date.now() / 1000 + ' ' + type.toUpperCase() + '/' + tag + ':\t' + format].concat(
                    Array.prototype.slice.call(arguments, 3));

                if (this.colorize)
                {
                    switch (type)
                    {
                        case 'e':
                            args[0] = '\033[31m' + args[0] + '\033[0m'; // red
                            break;
                        case 'w':
                            args[0] = '\033[33m' + args[0] + '\033[0m'; // yellow
                            break;
                        case 'i':
                            args[0] = '\033[36m' + args[0] + '\033[0m'; // cyan
                            break;
                    }
                }

                (function () {
                    switch (type)
                    {
                        case 'e':
                            return console.error;
                        case 'w':
                            return console.warn;
                        case 'i':
                            return console.info;
                        default:
                            return console.log;
                    }
                })().apply(console, args);
            }
        }

    };

})();
