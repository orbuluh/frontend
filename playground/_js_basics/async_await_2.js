/*
The first line of the body of function foo is executed synchronously, with the
await expression configured with the pending promise. Progress through foo is
then suspended and control is yielded back to the function that called foo.

Some time later, when the first promise has either been fulfilled or rejected,
control moves back into foo. The result of the first promise fulfillment (if it
was not rejected) is returned from the await expression. Here 1 is assigned
to result1. Progress continues, and the second await expression is evaluated.
Again, progress through foo is suspended and control is yielded.

Some time later, when the second promise has either been fulfilled or rejected,
control re-enters foo. The result of the second promise resolution is returned
from the second await expression. Here 2 is assigned to result2. Control moves
to the return expression (if any). The default return value of undefined is
returned as the resolution value of the current promise.
*/

async function foo() {
  console.log("before first promise")
  const result1 = await new Promise((resolve) =>
    setTimeout(() => resolve("1")),
  );
  console.log("before second promise")
  const result2 = await new Promise((resolve) =>
    setTimeout(() => resolve("2")),
  );
  console.log("finish foo")
}

console.log("before foo")
foo();
console.log("after foo")