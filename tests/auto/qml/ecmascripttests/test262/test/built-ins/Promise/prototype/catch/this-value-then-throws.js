// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-promise.prototype.catch
es6id: 25.4.5.1
description: >
  Promise.prototype.catch called with a `this` value that defines a `then`
  method which returns an abrupt completion.
info: |
  1. Let promise be the this value.
  2. Return ? Invoke(promise, "then", «undefined, onRejected»).

  7.3.18 Invoke

  1. Assert: IsPropertyKey(P) is true.
  2. If argumentsList was not passed, let argumentsList be a new empty List.
  3. Let func be ? GetV(V, P).
  4. Return ? Call(func, V, argumentsList).

  7.3.2 GetV

  1. Assert: IsPropertyKey(P) is true.
  2. Let O be ? ToObject(V).
  3. Return ? O.[[Get]](P, V).

  7.3.12 Call (F, V [ , argumentsList ])

  1. If argumentsList was not passed, let argumentsList be a new empty List.
  2. If IsCallable(F) is false, throw a TypeError exception.
  3. Return ? F.[[Call]](V, argumentsList).
---*/

var thrower = {
  then: function() {
    throw new Test262Error();
  }
};

assert.throws(Test262Error, function() {
  Promise.prototype.catch.call(thrower);
});
