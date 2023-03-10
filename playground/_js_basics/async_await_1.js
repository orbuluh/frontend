function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  // compare result of adding await or not
  // await make the call blocked and expected output: "resolved"
  const result = await resolveAfter2Seconds();

  // without await, it's not blocked, so it prints out: Promise { <pending> }
  //const result = resolveAfter2Seconds();

  console.log(result);
}

asyncCall();

