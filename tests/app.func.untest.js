
//check if parkinglot exists or not
//check for vehical already parked
//check if vehical charged method is aligned to business rule.
//check if parkinglot full
const app = require("../parkinglot.js");

beforeAll(() => {
    //create parkinglot 
    app.init(5);
    const regnoList = ["KA-01-HH-1234", "KA-01-HH-9999", "KA-01-BB-0001", "KA-01-HH-7777", "KA-01-HH-2701", "KA-01-HH-3141"];
    regnoList.forEach(reg => {
        app.bookSlot(reg)
    })
});

test('should be able to check if parkinglot exists or not', () => {
    preResult = 'please create a parking lot, seems its not initialized yet.!'
    result = app.status();
    expect(result).not.toMatch(preResult)
    console.log(result);
});

test('parkinglot should be full', () => {
    var regno = "KA-01-HH-3142";
    console.log(app.bookSlot(regno));
});


//TODO:this is being failed for some reasone i need to look into
test('should be able to unpark, charged with 50 dollars', () => {
    var regno = "KA-01-BB-0001";
    var expCharges = 50 
    result = app.unBookSlot(regno, 6)
    var ind = result.indexOf(expCharges)
    actual = result.slice(ind,result.length)
    expect(parseInt(expCharges)).toEqual(actual)
});


test('check for vehical already parked', () => {
    var regno = "KA-01-HH-1234";
    console.log(app.bookSlot(regno));
});
