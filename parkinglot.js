//fs comes with nodejs.
const fs = require('fs')
//parkinglot is colletion for slots 
const parking_lot = [];
//charges initialised with 10 dollars
var charges = 10
//Slot class 
const Slot = function (id) {
    this.slotId = id;
    this.isBooked = 0;
    this.parkedAt = "";
    this.regNo = ""
}

//total_slots should be read only property set once by the user i the begining of the prog.
const init = function (totalSlots) {
    console.log('Created parking lot with %i slots', totalSlots)
    //initialising for the slots in the parking lot! 
    for (var slotid = 1; slotid <= totalSlots; slotid++) {
        parking_lot.push(new Slot(slotid));
        saveParkingLot(parking_lot);
        console.log('Allocated slot number:', slotid)

    }
    //will delete file_input if exists and start fresh with new parking slots. 
    fs.writeFileSync('file_input.txt', `create_parking_lot ${totalSlots}`)

}

const saveParkingLot = function (parking_lot) {

    fs.writeFileSync('parkinglot.json', JSON.stringify(parking_lot))
}

const saveLogs = function (parking_log) {

    fs.appendFileSync('file_input.txt', '\n' + parking_log)
}


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


    const findIfVehecalExists = allSlots.find(function (slot) {
        return slot.regNo === regno
    })
    if (findIfVehecalExists === undefined || findIfVehecalExists.length === 0) {

        const foundSlot = allSlots.find(function (slot) {
            return slot.isBooked === 0
        })

        if (foundSlot !== undefined) {
            foundSlot.isBooked = 1;
            foundSlot.parkedAt = Date.now();
            foundSlot.regNo = regno
            saveParkingLot(allSlots)
            //console.log('park %s',argv.regno)
            saveLogs(`park  ${foundSlot.regNo}`)
            console.log('Allocated slot number:' + foundSlot.slotId)

        } else {
            console.log('Sorry, parking lot is full!!!')
        }
    } else {
        console.log('Vehical already parked..!')
    }
}
//unBookSlot will empty the slot and calc the charges 
// and save state 
const unBookSlot = function (regno, hrs) {

    const allSlots = loadAllSlots()
    const foundSlot = allSlots.find(function (slot) {
        return slot.regNo === regno
    })

    if (foundSlot !== undefined && foundSlot.length !== 0) {
        foundSlot.isBooked = 0;
        var regNo = foundSlot.regNo;
        foundSlot.regNo = ''
        //for future release
        //var hrs = Math.abs(Date.now() - foundSlot.parkedAt) / 36e5;
        if (hrs > 2) {
            charges = hrs * 10 - 10
        }

        foundSlot.parkedAt = ""
        saveParkingLot(allSlots)
        saveLogs(`leave  ${regNo}   ${hrs}`)
        console.log('Registration number %s with Slot Number %i is free with Charge %i', regNo, foundSlot.slotId, charges)
        //reset charges
        charges = 10;
    } else {
        console.log('Registration number %s not found', regno)
    }
}

const listSlots = function () {
    const slotes = loadAllSlots()
    return slotes
}


const status = function () {
    var Slots = listSlots()
    console.log('Slot No.  Registration No.')
    Slots.forEach(element => {
        console.log(element.slotId + '         ' + element.regNo)
    });
    saveLogs('Status')
}

module.exports = {

    init: init,
    bookSlot: bookSlot,
    unBookSlot: unBookSlot,
    status: status

}
