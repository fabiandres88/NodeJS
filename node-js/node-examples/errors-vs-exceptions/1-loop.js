const fs = require('fs');

const files = ['./1-loop.js','./not-exit.js','./2-try.js'];

files.forEach(file => {
    const data = fs.readFileSync(file);
    console.log('File data is: ', data);
});

/*This code when is executed will make Node crashed, because the second file in the array does not exist
and this error is not handled*/