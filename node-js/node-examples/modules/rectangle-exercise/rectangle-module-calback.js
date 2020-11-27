module.exports = (x,y,callback) => {
    if (x <=0 || y <=0) {
        setTimeout(() =>
        callback (new Error("Rectangle dimensions shoulg be greater than zero large= "
             + x + ", and base= " + y),
            null),
            2000);        
    }
    else {
        setTimeout(() =>
            callback (null,
            {
                perimeter: () => (2*(x+y)),
                area: () => (x*y)
            }),
            2000); 
    }
}
//In this code we simulate an asynchronous process for the same rectangle function with setTimeout function