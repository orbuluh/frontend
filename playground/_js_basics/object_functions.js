function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

var newCar = new Car('BMW', 'I4', 2023)

console.log(Object.keys(newCar));
console.log(Object.values(newCar));
console.assert(newCar.hasOwnProperty('make'));
console.assert(!newCar.hasOwnProperty('not_exist'));

// Sealing an object prevents extensions and makes existing properties
// non-configurable. A sealed object has a fixed set of properties:
// - new properties cannot be added,
// - existing properties cannot be removed,
// - their enumerability and configurability cannot be changed, and
// - its prototype cannot be re-assigned.
Object.seal(newCar);
newCar.model = 'I8'; // okay to change
console.assert(newCar.model == 'I8')
delete newCar.model; // no effect as it's sealed
console.assert(newCar.hasOwnProperty('model'))
newCar.miles = "0"  // can't add new fields as it's sealed
console.assert(newCar.miles == undefined) // undefined
console.assert(Object.isSealed(newCar))

// Freezing an object prevents extensions and makes existing properties
// non-writable and non-configurable.
Object.freeze(newCar);
newCar["make"] = "!!"; // no effect as it's froze. throws error in strict mode
console.assert(newCar.make == "BMW")
console.assert(Object.isFrozen(newCar))

console.assert(newCar instanceof Car);