var cylinder = {
    pi: 3.14,
    volume: function (r, h) {
        return this.pi * r * r * h;
    }
};

console.log(cylinder.volume(3, 4));
console.log(cylinder.volume.call({ pi: 3.14159 }, 3, 4));
console.log(cylinder.volume.apply({ pi: 3.14159 }, [3, 4]));

var newVol = cylinder.volume.bind({pi: 3.14159}); // not instantly called
console.log(newVol(3, 4)); // pi is bind to 3.14159