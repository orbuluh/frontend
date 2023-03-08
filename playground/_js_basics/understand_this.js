function getThis() {
  return this; // which "this" is determined by the context
}

const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

// same function assign to different obj*.getThis
obj1.callGetThis = getThis;
obj2.callGetThis = getThis;

// but the returned "this" pointing to different object
console.log(obj1.callGetThis()); // { name: 'obj1', callGetThis: [Function: getThis] }
console.log(obj2.callGetThis()); // { name: 'obj2', callGetThis: [Function: getThis] }

//---------------------------------------------------------

function getThisStrict() {
  "use strict"; // Enter strict mode
  return this;
}

// Only for demonstration — you should not mutate built-in prototypes
Number.prototype.getThisStrict = getThisStrict;
Number.prototype.getThisNoStrict = getThis;
console.log(typeof(1).getThisStrict()); // "number"
console.log(typeof(1).getThisNoStrict()); // "object"
console.log(getThis() === globalThis); // true
console.log(typeof getThisStrict()); // "undefined"
//console.log(typeof getThisNoStrict()); // ReferenceError: getThisNoStrict is not define