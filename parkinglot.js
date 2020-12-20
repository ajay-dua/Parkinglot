//fs comes with nodejs.
const fs = require('fs')
//parkinglot is colletion for slots 
const parking_lot = [];
//charges initialised with 10 dollars
//var charges = 10

//Slot is a first class member function
const Slot = function (id) {
    this.slotId = id;
    this.isBooked = 0;
    this.parkedAt = "";
    this.regNo = ""
}

//total_slots should be read only property set once by the user in the begining of the prog.
const init = function (totalSlots) {

    if (typeof totalSlots === 'number') {
        msg = ''
         
        totalSlots = parseInt(totalSlots);
        //it's a number
        //initialising for the slots in the parking lot! 
        for (var slotid = 1; slotid <= totalSlots; slotid++) {
            parking_lot.push(new Slot(slotid));
            saveParkingLot(parking_lot);
            //console.log('Allocated slot number:', slotid)
            msg = msg.concat(`Allocated slot number: ${slotid}` + '\n')

        }
        //will delete file_input if exists and start fresh with new parking slots. 
        fs.writeFileSync('file_input.txt', `create_parking_lot ${totalSlots}`)
        return msg.concat(`Created parking lot with ${totalSlots} slots `)
        //console.log('Created parking lot with %i slots', totalSlots)

    } else {
        return "parking capacity as numaric value only!";
    }


    //return ('Created parking lot with %i slots', totalSlots)


}

//future release
const saveParkingLot = function (parking_lot) {

    fs.writeFileSync('parkinglot.json', JSON.stringify(parking_lot))
}

const saveLogs = function (parking_log) {

    fs.appendFileSync('file_input.txt', '\n' + parking_log)
}


const loadAllSlots = function () {

    try {
        //future release
         bufferSlots = fs.readFileSync('parkinglot.json')
         strSlots = bufferSlots.toString()
         return JSON.parse(strSlots)
        //return parking_lot;
    } catch (e) {
        return []
    }

}

//this will find nearest slot
// book and save state 
const bookSlot = function (regno) {

    const allSlots = loadAllSlots()

    if (allSlots.length !== 0) {

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
                saveLogs(`park  ${foundSlot.regNo}`)
                //console.log('Allocated slot number:' + foundSlot.slotId)
                return `Allocated slot number: ${foundSlot.slotId}`



            } else {
                //console.log('Sorry, parking lot is full!!!')
                return `Sorry, parking lot is full!!!`

            }
        } else {
            //console.log('Vehical already parked..!')
            return `Vehical already parked..!`
        }
    } else {
        //console.log('please create a parking lot, seems its not initialized yet.!')
        return `please create a parking lot, seems its not initialized yet.!`
    }

}
//unBookSlot will empty the slot and calc the charges 
// and save state 
const unBookSlot = function (regno, hrs) {
            //reset charges
            charges = 10;
    const allSlots = loadAllSlots()
    if (allSlots.length !== 0) {
        const foundSlot = allSlots.find(function (slot) {
            return slot.regNo === regno
        })

        if (foundSlot !== undefined && foundSlot.length !== 0) {
            foundSlot.isBooked = 0;
            var regNo = foundSlot.regNo;
            foundSlot.regNo = ''
            //for future release
            //var calcHrs = Math.abs(Date.now() - foundSlot.parkedAt) / 36e5;
            if (hrs > 2) {
                charges = hrs * 10 - 10
            }

            foundSlot.parkedAt = ""
            saveParkingLot(allSlots)
            saveLogs(`leave  ${regNo}   ${hrs}`)
            //console.log('Registration number %s with Slot Number %i is free with Charge %i', regNo, foundSlot.slotId, charges)
            return `Registration number ${regNo} with Slot Number ${foundSlot.slotId} is free with Charge ${charges}`

        } else {
            //console.log('Registration number %s not found', regno)
            return `Registration number ${regno} not found`

        }
    } else {
        //console.log('please create a parking lot, seems its not initialized yet.!')
        return `please create a parking lot, seems its not initialized yet.!`
    }
}


const status = function () {
    var Slots = loadAllSlots()
    msg = ''
    if (Slots.length !== 0) {
        //console.log('Slot No.  Registration No.')
        msg = msg.concat(`Slot No.  Registration No.` + '\n')
        Slots.forEach(slot => {
            //console.log(slot.slotId +           + slot.regNo)
            msg = msg.concat(`${slot.slotId}             ${slot.regNo}` + '\n')
        });

        saveLogs('Status')
        return msg
    } else {
        return `please create a parking lot, seems its not initialized yet.!`
    }

}

module.exports = {

    init: init,
    bookSlot: bookSlot,
    unBookSlot: unBookSlot,
    status: status

}
