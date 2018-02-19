/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-7-c-ii-2.js
 * @description Array.prototype.every - callbackfn takes 3 arguments
 */


function testcase() { 
 
  function callbackfn(val, Idx, obj)
  {
    if(arguments.length === 3)   //verify if callbackfn was called with 3 parameters
       return true;
  }

  var arr = [0,1,true,null,new Object(),"five"];
  arr[999999] = -6.6;
  
  if(arr.every(callbackfn) === true)
    return true;
 }
runTestCase(testcase);
