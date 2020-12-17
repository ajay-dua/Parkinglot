const fs = require('fs')

//parkinglot is colletion for slots 
var parking_lot = [];
//total_slots should be read only property set once by the user i the begining of the prog.
const totalSlots = 5; // user defined length
var charges = 10
//Slot class 
const Slot = function (id) {
    this.slotId = id;
    this.isBooked = 0;
    this.parkedAt = "";
    this.regNo = ""
}

//initialising for the slots in the parking lot! 
for (var slotid = 1; slotid <= totalSlots; slotid++) {
    parking_lot.push(new Slot(slotid));
}

//
const saveParkingLot = function (parking_lot) {
    fs.writeFileSync('parkinglot.json', JSON.stringify(parking_lot))
}

//save(parking_lot)

const loadAllSlots = function () {

    try {
        bufferSlots = fs.readFileSync('parkinglot.json')
        strSlots = bufferSlots.toString()
        return JSON.parse(strSlots)
    } catch (e) {
        return []
    }

}

//this will find nearest slot
// book and save state 
const bookSlot = function (regno) {

    const allSlots = loadAllSlots()
    const foundSlot = allSlots.find(function (slot) {
        return slot.isBooked === 0
    })

    if (foundSlot !== undefined) {
        foundSlot.isBooked = 1;
        foundSlot.parkedAt = Date.now();
        foundSlot.regNo = regno
        saveParkingLot(allSlots)
        console.log('please park your car at parking:' + foundSlot.slotId)
    } else {
        console.log('parking full')
    }
}

//unBookSlot will empty the slot and calc the charges 
const unBookSlot = function (regno) {

    const allSlots = loadAllSlots()
    const foundSlot = allSlots.find(function (slot) {
        return slot.regNo === regno
    })

    if (foundSlot.length !== 0) {
        foundSlot.isBooked = 0;
        foundSlot.regNo = ''
        var hrs = Math.abs(Date.now() - foundSlot.parkedAt) / 36e5;
        if (hrs > 2) {
            charges = hrs * 10 - 10
        }

        foundSlot.parkedAt = ""
        saveParkingLot(allSlots)
        console.log('your bill is :' + '$' + charges)
    } else {
        console.log('reg no. not available')
    }
}


