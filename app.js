
parking_lot = require('./test.js')
const yargs = require('yargs')
const fs = require('fs')
const { string } = require('yargs')

yargs.command({
    command: 'create_parking_lot',
    description: 'this will create a entire parking lot with n slots',
    builder: {
        totalSlots: {
            describe: 'parking capacity as numaric value',
            demandOption: true,
            type: BigInt
        },
    },
    handler: function (argv) {
        parking_lot.init(argv.totalSlots)
        saveLogs(`create_parking_lot ${argv.totalSlots}`)
        //saveLogs(`Created parking lot with ${argv.totalSlots} slots.`)
    }
})

yargs.command({
    command: 'park',
    description: 'this will create a entire parking lot with n slots',
    builder: {
        regno: {
            describe: 'park a car with registration number',
            demandOption: true,
            type: string
        },
    },
    handler: function (argv) {
        //parking_lot.totalSlots(argv.totalSlots)
        parking_lot.bookSlot(argv.regno)
        console.log('park %s',argv.regno)
        saveLogs(`park  ${argv.regno}`)
        //console.log('adding a new note..with  body', argv.body)
    }
})


yargs.command({
    command: 'leave',
    description: 'this will create a entire parking lot with n slots',
    builder: {
        regno: {
            describe: 'park a car with registration number',
            demandOption: true,
            type: string
        },
        hrs: {
            describe: 'no. of hrs for which the the vehical was parked',
            demandOption: true,
            type: BigInt
        },
    },
    handler: function (argv) {
        parking_lot.unBookSlot(argv.regno,argv.hrs)
        //console.log('leave %s',argv.regno)
        saveLogs(`leave  ${argv.regno}   ${argv.hrs}` )
    }
})


yargs.command({
    command: 'list',
    description: 'this will list all slots',
    handler: function () {
        parking_lot.listSlots()
    }
})


const saveLogs = function (parking_log) {
 
    fs.appendFileSync('file_input.txt', '\n' + parking_log)
}

yargs.parse()