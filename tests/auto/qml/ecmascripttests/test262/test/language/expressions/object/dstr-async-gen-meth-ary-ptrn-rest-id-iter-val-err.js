// This file was procedurally generated from the following sources:
// - src/dstr-binding/ary-ptrn-rest-id-iter-val-err.case
// - src/dstr-binding/error/async-gen-meth.template
/*---
description: Error forwarding when IteratorValue returns an abrupt completion (async generator method)
esid: sec-asyncgenerator-definitions-propertydefinitionevaluation
features: [Symbol.iterator, async-iteration]
flags: [generated]
info: |
    AsyncGeneratorMethod :
        async [no LineTerminator here] * PropertyName ( UniqueFormalParameters )
            { AsyncGeneratorBody }

    1. Let propKey be the result of evaluating PropertyName.
    2. ReturnIfAbrupt(propKey).
    3. If the function code for this AsyncGeneratorMethod is strict mode code, let strict be true.
       Otherwise let strict be false.
    4. Let scope be the running execution context's LexicalEnvironment.
    5. Let closure be ! AsyncGeneratorFunctionCreate(Method, UniqueFormalParameters,
       AsyncGeneratorBody, scope, strict).
    [...]

    13.3.3.6 Runtime Semantics: IteratorBindingInitialization
    BindingRestElement : ... BindingIdentifier
    1. Let lhs be ResolveBinding(StringValue of BindingIdentifier,
       environment).
    2. ReturnIfAbrupt(lhs). 3. Let A be ArrayCreate(0). 4. Let n=0. 5. Repeat,
       [...]
       c. Let nextValue be IteratorValue(next).
       d. If nextValue is an abrupt completion, set iteratorRecord.[[done]] to
          true.
       e. ReturnIfAbrupt(nextValue).

---*/
var poisonedValue = Object.defineProperty({}, 'value', {
  get: function() {
    throw new Test262Error();
  }
});
var iter = {};
iter[Symbol.iterator] = function() {
  return {
    next: function() {
      return poisonedValue;
    }
  };
};


var obj = {
  async *method([...x]) {
    
  }
};

assert.throws(Test262Error, function() {
  obj.method(iter);
});
