const fs = require('fs');

fs.readFile(__filename, function cb (error, data) {
    console.log('File data is', data);
});

console.log('TEST');

/*This code first only define the callback into the readFile method,
then it excecutes the outer console.log and
after this invoke the callback to executes the inner console.log 
Expected output:
TEST
File data is <Buffer 63 6f 6e 73 74 20 66 73 20 3d 20 72 65 71 75 69 72 65 28 27
 66 73 27 29 3b 0d 0a 0d 0a 66 73 2e 72 65 61 64 46 69 6c 65 28 5f 5f 66 69 6c 65
  6e 61 6d ... 101 more bytes>*/