const fs = require('fs');

const files = ['./1-loop.js','./not-exit.js','./2-try.js'];

files.forEach(file => {
    try{
        const data = fs.readFileSync(file);
        console.log('File data is: ', data);
    }catch (error) {
        console.log('Something went wrong and we are going to ignore it');
    }    
});

/*This code different to previous code will wrapped the error and 
continues to execute until finish the code execution (Node process not crash)*/