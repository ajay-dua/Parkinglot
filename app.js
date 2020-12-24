#!/usr/bin/env node
const parking_lot = require('./parkinglot.js')
const yargs = require('yargs')


yargs.command({
    command: 'create_parking_lot',
    description: 'this will create a entire parking lot with n slots',
    showInHelp: true,
    builder: {
        capacity: {
            describe: 'parking capacity as numaric value',
            demandOption: true,
            type: 'number'
        },
    },
    handler: function (argv) {
        if (typeof argv.capacity === 'number') {
            totalSlots = parseInt(argv.capacity);
            console.log(parking_lot.init(argv.capacity))
        } else {
            return "parking capacity as numaric value only!";
        }
    }
})

yargs.command({
    command: 'park',
    description: 'park would allow checking avaiability for the slot and allocate the nearest slot.',
    builder: {
        regno: {
            describe: 'required as parking a car only allowed with registration number',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
        if (typeof argv.regno === 'string' && argv.regno !== '') {
            console.log(parking_lot.bookSlot(argv.regno))
        }

    }
})

yargs.command({
    command: 'leave',
    description: 'leave would help on exit process with apply charges & free up the slot in the end',
    builder: {
        regno: {
            describe: 'required registration number for the parked vehicle',
            demandOption: true,
            type: 'string'
        },
        hrs: {
            describe: 'required no. of hrs for which the the vehicle was parked',
            demandOption: true,
            type: 'number'
        },
    },
    handler: function (argv) {
        if (typeof argv.regno === 'string' && argv.regno !== '') {
            console.log(parking_lot.unBookSlot(argv.regno, argv.hrs))
        }
    }
})

yargs.command({
    command: 'status',
    description: 'Status will list the status of all the parking slots',
    handler: function () {
        console.log(parking_lot.status())
    }

})
yargs.parse()