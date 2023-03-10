async function foo() {
  const p1 = new Promise((resolve) => setTimeout(() => resolve("1"), 1000));
  const p2 = new Promise((_, reject) => setTimeout(() => reject("2"), 500));
  const results = [await p1, await p2]; // Do not do this! Use Promise.all or Promise.allSettled instead.
}
foo().catch(() => {}); // Attempt to swallow all errors...

// There will be a ERR_UNHANDLED_REJECTION thrown even if the .catch handler
// has been configured further along the promise chain. This is because p2 will
// not be "wired into" the promise chain until control returns from p1.
