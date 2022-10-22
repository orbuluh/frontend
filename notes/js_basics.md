
# Reference
- [Data Visualization with Python and JavaScript](https://www.oreilly.com/library/view/data-visualization-with/9781098111861/)
  - JavaScript’s monopoly of browser dataviz needs the complement of a conventional data-processing stack. And Python has the best there is.


# JS v.s. Python, difference
- [JavaScript is single-threaded and non-blocking using asynchronous I/O](https://stackoverflow.com/questions/14795145/how-the-single-threaded-non-blocking-io-model-works-in-node-js)
  - This means that simple things like file access involve the use of a callback function.
- JS is the only first-class language in web browsers, Python being excluded.
- JS has a limited set of utility objects (e.g., JSON, Math).
- Python has a comprehensive standard library, whereas JS has a limited set of utility objects (e.g., JSON, Math).
- Python has fairly classical object-oriented classes, whereas JS uses prototypes.
- JS lacks heavyweight general-purpose data-processing libs
- JavaScript interpreter comes embedded in all modern web browsers. ... If you want to try out code one-liners or quiz the state of live code, browser-based consoles are your best bet.

# Style Convention
- JS conventionally uses CamelCase (e.g., `processStudentData`) for its variables,
- whereas Python, in accordance with PEP-8, uses underscores (e.g., `process_student_data`) in its variable names. By convention (and convention is more important in the Python ecosystem than JS), Python uses capitalized `CamelCase` for `class` declarations.


# Use `let` and `var`
- One of the main criticisms of JavaScript, and a fair one, is that it plays fast and loose with namespace conventions. 
- The most egregious example of this is that **variables declared outside of functions or missing the `var` keyword are global rather than confined to the script in which they are declared.**
- make each of your scripts a self-calling function. This makes all variables declared via `var` local to the script/function, preventing them from polluting the global namespace.
- A new JavaScript `let` keyword, which is **block-scoped,** is pretty much always preferable to `var`.
- Any objects, functions, and variables you want to make available **to other scripts can be attached to an object that is part of the global namespace.**

```javascript
// A module pattern for JavaScript
(function(nbviz) { // Receives the global nbviz object.
    'use strict';
    // Attaches the updateTimeChart method to the
    // global nbviz object, effectively exporting it.
    nbviz.updateTimeChart = function(data) {
    // If an nbviz object exists in the global (window)
    // namespace, pass it into the module function;
    // otherwise, add it to the global namespace.
    } (window.nbviz = window.nbviz || {}));
```

# Example of JavaScript data processing
```javascript
// A (note deliberate and valid inconsistency in keys:
// some quoted and some unquoted)

var studentData = [
    { name: 'Bob', id: 0, 'scores': [68, 75, 76, 81] },
    { name: 'Alice', id: 1, 'scores': [75, 90, 64, 88] },
    { 'name': 'Carol', id: 2, 'scores': [59, 74, 71, 68] },
    { 'name': 'Dan', id: 3, 'scores': [64, 58, 53, 62] },
];

// B
function processStudentData(data, passThreshold, meritThreshold) {
    passThreshold = typeof passThreshold !== 'undefined' ?\
    passThreshold: 60;
    meritThreshold = typeof meritThreshold !== 'undefined' ?\
    meritThreshold: 75;

    // C
    data.forEach(function (sdata) {
        var av = sdata.scores.reduce(
            function (prev, current) {
                return prev + current;
            }, 0) / sdata.scores.length;
        sdata.average = av;
        if (av > meritThreshold) {
            data.assessment = 'passed with merit';
        } else if (av > passThreshold) {
            sdata.assessment = 'passed';
        } else {
            sdata.assessment = 'failed';
        }
        // D
        console.log(sdata.name + "'s (id: " + sdata.id +
            ") final assessment is: " + sdata.assessment.toUpperCase());

    });
}
processStudentData(studentData);
```