function generator(input) {
  var index = 0;
  return {
    next: function () {
      if (index < input.length) {
        index += 1;
        return input[index - 1];
      }
      return "";
    }
  }
}

var gen1 = generator("abc");
console.log(gen1.next());
console.log(gen1.next());
console.log(gen1.next());
console.log(gen1.next());

gen1 = generator("defg");
console.log(gen1.next());
console.log(gen1.next());
console.log(gen1.next());
console.log(gen1.next());