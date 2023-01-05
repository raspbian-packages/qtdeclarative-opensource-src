// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Use of the value returned by the constructor's `resolve` method.
es6id: 25.4.4.1
info: |
    [...]
    6. Let promiseCapability be NewPromiseCapability(C).
    [...]
    11. Let result be PerformPromiseAll(iteratorRecord, promiseCapability, C).
    [...]

    25.4.4.1.1 Runtime Semantics: PerformPromiseAll
    [...]
    6. Repeat
       [...]
       i. Let nextPromise be Invoke(constructor, "resolve", «nextValue»).
       [...]
       r. Let result be Invoke(nextPromise, "then", resolveElement,
          promiseCapability.[[Reject]]»).
       [...]
---*/

var originalCallCount = 0;
var newCallCount = 0;
var P = function(executor) {
  executor(function() {}, function() {});
};
P.resolve = function() {
  return newThenable;
};

var originalThenable = {
  then: function() {
    originalCallCount += 1;
  }
};
var newThenable = {
  then: function() {
    newCallCount += 1;
  }
};

Promise.all.call(P, [originalThenable]);

assert.sameValue(originalCallCount, 0, 'original `then` method not invoked');
assert.sameValue(newCallCount, 1, 'new `then` method invoked exactly once');
