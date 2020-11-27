const fs = require('fs');

fs.readFile(__filename, function cb1(error, data) {
    fs.writeFile(__filename + '.copy', data, function cb2(error) {
        //Nest more callbacks here...
    });    
});

console.log('TEST');

//This is an example of pyramid of doom