/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Bootstrap to start shell in spider monkey or node.

var inSpiderMonkey = typeof pc2line !== "undefined";
var startScript = "shell/shell.js";

if (inSpiderMonkey) {
  try {
    load(startScript);
  } catch (e) {
    print(e);
    // Spider monkey doesn't print stack traces by default.
    if (e.stack) {
      print(e.stack);
    }
    quit(1);
  }
} else {
  var vm = require("vm"),
    fs = require("fs");

  var sandbox = vm.createContext({
    scriptArgs: Array.prototype.slice.call(process.argv, 2),
    evalScript: function () {
      for (var i = 0; i < arguments.length; i++) {
        var path = arguments[i];
        var code = fs.readFileSync(path).toString();
        vm.runInContext(code, sandbox, path);
      }
    },
    dateNow: Date.now,
    pc2line: function () {

    },
    snarf: function (path, type) {
      var buffer = fs.readFileSync(path);
      return type !== 'binary' ? buffer.toString() : new Uint8Array(buffer);
    },
    printErr: function (msg) {
      console.log(msg);
    },
    putstr: function (s) {
      process.stdout.write(s);
    },
    print: function (msg) {
      console.log(msg);
    },
    help: function () {
      // simulating SpiderMonkey interface
    },
    quit: function (code) {
      process.exit(code);
    },
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    Uint8ClampedArray: Uint8ClampedArray,
    ArrayBuffer: ArrayBuffer,
    DataView: DataView
  });

  vm.runInContext('evalScript("' + startScript + '");', sandbox);
}