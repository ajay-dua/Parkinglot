
const fs = require('fs')

//parkinglot is colletion for slots 
var parking_lot = [];
//should be read only property set once by the user i the begining of the prog.
const length = 5; // user defined length


//Slot class 
const Slot = function(id) {
    this.slotId = id ;
    this.isBooked = 0;
    this.parkedAt=Date.now();
    this.regNo = ""
}

//initialising for the slots in the poarking lot! 
for(var slotid = 1; slotid <= length; slotid++) {
    parking_lot.push(new Slot(slotid));
}

const save = function (parking_lot) {
    fs.writeFileSync('parkinglot.json', JSON.stringify(parking_lot))
}

save(parking_lot)
//console.log(save)