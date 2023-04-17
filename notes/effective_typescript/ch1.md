# Ch 1. Getting to Know TypeScript

TypeScript is a bit unusual as a language in that it

- neither runs in an interpreter (as Python and Ruby do)
- nor compiles down to a lower-level language (as Java and C do).

:bulb: Instead, **it compiles to another high-level language, JavaScript. It is this JavaScript that runs, not your TypeScript.**

## Item 1: Understand the Relationship Between TypeScript and JavaScript

**TypeScript is a superset of JavaScript in a syntactic sense: so long as your JavaScript program doesn’t have any syntax errors then it is also a TypeScript program.**

- It’s quite likely that TypeScript’s type checker will flag some issues with your code. But this is an independent problem.
- TypeScript will still parse your code and emit JavaScript.

TypeScript files use a `.ts` (or `.tsx`) extension, rather than the `.js` (or `.jsx`) extension of a JavaScript file.

- This doesn’t mean that TypeScript is a completely different language!
- Since TypeScript is a superset of JavaScript, the code in your `.js` files is already TypeScript. Renaming `main.js` to `main.ts` doesn’t change that.
- If you’re migrating an existing JavaScript codebase to TypeScript. It means that you don’t have to rewrite any of your code in another language to start using TypeScript and get the benefits it provides.


All JavaScript programs are TypeScript programs, but the converse is not true:

- This is because TypeScript adds additional syntax for specifying types.
- (There are some other bits of syntax it adds, largely for historical reasons. See Item 53.)

One of the goals of TypeScript’s type system is to detect code that will throw an exception at runtime, without having to run your code.

- When you hear TypeScript described as a “static” type system, this is what it refers to.
- The type checker cannot always spot code that will throw exceptions, but it will try.
- Type annotations tell TypeScript what your intent is, and this lets it spot places where your code’s behavior does not match your intent.
- Overall, **all JavaScript programs are TypeScript programs. But only some JavaScript (and TypeScript) programs pass the type checker.**

TypeScript’s type system **models** the runtime behavior of JavaScript.

- This may result in some surprises if you’re coming from a language with stricter runtime checks.
  - These statements both pass the type checker, even though they are questionable and do produce runtime errors in many other languages. But this does **model** the runtime behavior of JavaScript

```js
const x = 2 + '3'; // OK, type is string
const y = '2' + 3; // OK, type is string
```

The guiding principle of TypeScript’s type system is that it **should** model JavaScript’s runtime behavior. TypeScript does draw the line somewhere, though.

- But in all of these cases, TypeScript considers it more likely that the odd usage is the result of an error than the developer’s intent, so it goes beyond simply modeling the runtime behavior.

```js
const a = null + 7; // Evaluates to 7 in JS
// ~~~~ Operator '+' cannot be applied to types ...
const b = [] + 12; // Evaluates to '12' in JS
// ~~~~~~~ Operator '+' cannot be applied to types ...
alert('Hello', 'TypeScript'); // alerts "Hello"
// ~~~~~~~~~~~~ Expected 0-1 arguments, but got 2
```

How does TypeScript decide when to model JavaScript’s runtime behavior and when to go beyond it? **Ultimately this is a matter of taste.**
