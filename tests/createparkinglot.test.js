const app = require("../parkinglot.js");

//set up jest new test
test('should be able to create a parking lot with 6 slots', () => {
    //app.init(6)
    //var preResult = 'Created a parking lot with 6 slots';
    var result = app.init(6);
    console.log(result);
    //expect(result).to.be.equal(preResult);
});

test('should be able to park the cars with with given reg nos', () => {
    const regnoList = ["KA-01-HH-1234", "KA-01-HH-9999", "KA-01-BB-0001", "KA-01-HH-7777", "KA-01-HH-2701", "KA-01-HH-3141"];
    regnoList.forEach(regno => {
        console.log(app.bookSlot(regno));
    });
});

test('should be able to unpark and free up the 6th slot', () => {
    var regno = "KA-01-HH-3141";
    console.log(app.unBookSlot(regno, 4));
});

test('should be able to chech the status', () => {
    console.log(app.status());
});


test('should be able to park and fill up the 6th the sixth slot', () => {
    var regno = "KA-01-P-333";
    console.log(app.bookSlot(regno));
});



test('should try to park a car when parkking lot is full', () => {
    var regno = "KA-01-HH-3142";
    console.log(app.bookSlot(regno));
});



test('should be able to unpark, charged with 30 dollars  and free up the 1st slot', () => {
    var regno = "KA-01-HH-1234";
    console.log(app.unBookSlot(regno, 4));
});

test('should be able to unpark, charged with 50 dollars and free up the 3rd slot', () => {
    var regno = "KA-01-BB-0001";
    console.log(app.unBookSlot(regno, 6));
});

test('should be able reject reg no which is not found in the parkinglot ', () => {
    var regno = "DL-12-AA-9999";
    console.log(app.unBookSlot(regno, 3));
});

test('should try to park a car when parkking lot is full', () => {
    var regno = "KA-09-HH-0987";
    console.log(app.bookSlot(regno));
});


test('should try to park a car when parkking lot is full', () => {
    var regno = "CA-09-IO-1111";
    console.log(app.bookSlot(regno));
});

test('should be able to chech the status', () => {
    console.log(app.status());
});

