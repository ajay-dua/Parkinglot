
const parking_lot = require('./parkinglot.js')
const yargs = require('yargs')


yargs.command({
    command: 'create_parking_lot',
    description: 'this will create a entire parking lot with n slots',
    builder: {
        capacity: {
            describe: 'parking capacity as numaric value',
            demandOption: true,
            type: BigInt
        },
    },
    handler: function (argv) {
        parking_lot.init(argv.capacity)
    }
})

yargs.command({
    command: 'park',
    description: 'park would allow checking avaiability for the slot and allocat the nearest slot.',
    builder: {
        regno: {
            describe: 'park a car with registration number',
            demandOption: true,
            type: String
        },
    },
    handler: function (argv) {
        parking_lot.bookSlot(argv.regno)

    }
})


yargs.command({
    command: 'leave',
    description: 'leave would help on exit process with apply charges & free up the slot in the end',
    builder: {
        regno: {
            describe: 'registration number for the parked vehical',
            demandOption: true,
            type: String
        },
        hrs: {
            describe: 'no. of hrs for which the the vehical was parked',
            demandOption: true,
            type: BigInt
        },
    },
    handler: function (argv) {
        parking_lot.unBookSlot(argv.regno, argv.hrs)

    }
})

yargs.command({
    command: 'status',
    description: 'Status will list the status of all the parking slots',
    handler: function () {
        parking_lot.status()
    }

})



yargs.parse()