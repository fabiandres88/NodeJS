const fs = require('fs');

const data = fs.readFileSync(__filename);

console.log('File data is', data);

console.log('TEST');

/*When this code is executed step by step because is synchronous
expectet output:
File data is <Buffer 63 6f 6e 73 74 20 66 73 20 3d 20 72 65 71 75
 69 72 65 28 27 66 73 27 29 3b 0d 0a 0d 0a 63 6f 6e 73 74 20 64 61
  74 61 20 3d 20 66 73 2e 72 65 61 64 46 ... 152 more bytes>
TEST*/
