// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-array.prototype.filter
es5id: 15.4.4.20-5-18
description: Array.prototype.filter - Error Object can be used as thisArg
---*/

var accessed = false;
var objError = new RangeError();

function callbackfn(val, idx, obj) {
  accessed = true;
  return this === objError;
}

var newArr = [11].filter(callbackfn, objError);

assert.sameValue(newArr[0], 11, 'newArr[0]');
assert(accessed, 'accessed !== true');
