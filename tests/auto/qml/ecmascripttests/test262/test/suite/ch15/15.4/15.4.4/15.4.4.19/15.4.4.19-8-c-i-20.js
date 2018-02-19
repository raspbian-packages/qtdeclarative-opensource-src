/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-c-i-20.js
 * @description Array.prototype.map - element to be retrieved is own accessor property without a get function that overrides an inherited accessor property on an Array-like object
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            if (idx === 0) {
                return typeof val === "undefined";
            }
            return false;
        }

        var proto = {};

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        child.length = 2;

        Object.defineProperty(child, "0", {
            set: function () { },
            configurable: true
        });

        Object.defineProperty(proto, "0", {
            get: function () {
                return 100;
            },
            configurable: true
        });

        var testResult = Array.prototype.map.call(child, callbackfn);

        return testResult[0] === true;
    }
runTestCase(testcase);
