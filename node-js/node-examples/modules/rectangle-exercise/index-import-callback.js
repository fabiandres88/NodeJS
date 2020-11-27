//Importing rectangle module
var rectangle = require("./rectangle-module-calback");

function solveRectangle(large, base) {
    console.log("Solving rectangle with large= " + large + ", and base= " + base);

    rectangle(large, base, (error, rect) => {
        if (error) {
            console.log("Error: ", error.message)
        }
        else {
            console.log("The area of the rectangle with dimensions large: "
                + large + " base: " + base + " is: " + rect.area());
            console.log("The perimeter of the rectangle with dimensions large: "
                + large + " base: " + base + " is: " + rect.perimeter());
        }
    });
};

solveRectangle(2, 4);
solveRectangle(3, 4);
solveRectangle(0, 5);
solveRectangle(-3, 5);

// The parameters in the rectangule module it does not 
// need to be passed it can be access through closures