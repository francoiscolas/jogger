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

    var _format = (require && require('util') && require('util').format);

    var _pad = function (string, width) {
        var padded = '' + string;

        while (padded.length < width)
            padded = '0' + padded;
        return padded;
    };

    var Jogger = function (options) {
        var self = this;

        self.colorize = false;
        self.outputs  = [];
        self.filter   = null;
        self.level    = Jogger.Level.d;
        self.port     = 0;

        if (typeof process !== 'undefined') {
            self.colorize = process.stdout.isTTY;
            self.outputs  = [process.stdout];
            self.level    = Jogger.Level.d;

            process.on('uncaughtException', function (error) {
                self.e('process', 'Error: %s', error.stack);
            });
        }

        _extend(self, options);

        if (self.port > 0) {
            self._server = require && require('net') && require('net').createServer(function () {
                self._onConnection.apply(self, arguments);
            });
            self._server.listen(self.port, '127.0.0.1');
        }
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

    Jogger.Color = {
        e: 31,
        w: 33,
        i: 36
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

        _now: function () {
            var now = new Date();
            return now.getFullYear() + '-' + _pad(now.getMonth(), 2) + '-' + _pad(now.getDate(), 2)
                + ' ' + _pad(now.getHours(), 2) + ':' + _pad(now.getMinutes(), 2) + ':' + _pad(now.getSeconds(), 2) + '.' + _pad(now.getMilliseconds(), 3);
        },

        _write: function (type, tag, format/*, arguments...*/) {
            if (this.level < Jogger.Level[type])
                return ;

            if (this.filter && !this.filter.test(tag))
                return ;

            var matches = (new Error()).stack.split('\n')[3].match(/\(.*\/(.*):([0-9]+):[0-9]+\)/);
            var file    = (matches && matches[1]) || '<unknown>';
            var line    = (matches && matches[2]) || '?';

            var args    = [this._now() + ' ' + type.toUpperCase() + '/' + tag + ' ' + file + ':' + line + ' ' + format].concat(
                Array.prototype.slice.call(arguments, 3));

            if (this.outputs.length > 0) {
                var line = _format.apply(null, args);

                this.outputs.forEach(function (wstream) {
                    if (wstream.isTTY
                            && this.colorize && typeof Jogger.Color[type] !== 'undefined')
                        wstream.write('\033[' + Jogger.Color[type] + 'm' + line + '\033[0m\n');
                    else
                        wstream.write(line + '\n');
                }, this);
            } else if (typeof console !== 'undefined') {
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
        },

        _onConnection: function (socket) {
            var self = this;

            socket.setEncoding('UTF-8');
            socket.on('data', function (data) {
                var cmd = data.trim().substring(0, data.indexOf(' '));
                var arg = data.trim().substring(cmd.length + 1);

                switch (cmd)
                {
                    case 'filter':
                        self.filter = (arg) ? new RegExp(arg) : null;
                    case 'level':
                        if (typeof Jogger.Level[arg] !== 'undefined')
                            self.level = Jogger.Level[arg];
                        break;
                }
            });
        }

    };

})();
