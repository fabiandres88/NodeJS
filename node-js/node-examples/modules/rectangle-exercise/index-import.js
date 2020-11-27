//Importing rectangle module
var rectangle = require ("./rectangle-module");

function solveRectangle (large,base) {
    console.log("Solving rectangle with large= " + large + ", and base= " + base);
    if (large <=0 || base <=0) {
        console.log("Rectangle dimensions shoulg be greater than zero large= " + large + ", and base= " + base);
    }else {
        console.log("The area of the rectangle is: " + rectangle.area(large,base));
        console.log("The perimeter of the rectangle is: " + rectangle.perimeter(large,base));
    };
};

solveRectangle(2,4);
solveRectangle(3,4);
solveRectangle(0,5);
solveRectangle(-3,5);
