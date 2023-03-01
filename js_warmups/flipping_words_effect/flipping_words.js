// From Hyperplexed video: https://youtu.be/W5oawMJaXbU
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
document.querySelector("h1").onmouseover = event => {
  let iteration = 0
  const interval = setInterval(() => {
    event.target.innerText =
      event.target.innerText.split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }
          return letters[Math.floor(26 * Math.random())];
        }).join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }
    iteration += 1 / 3;
  }, 30)
}