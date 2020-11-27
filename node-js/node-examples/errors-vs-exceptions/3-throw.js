const fs = require('fs');

const files = ['./1-loop.js','./not-exit.js','./2-try.js'];

files.forEach(file => {
    try{
        const data = fs.readFileSync(file, 'eoauhao');
        console.log('File data is: ', data);
    }catch (error) {
        if (error === 'ENDENT'){
            console.log('File not found');
        } else {
            throw error;
        }        
    }    
});

/*This code only ignores the error, if the file not found,
otherwise, throw the error object again and
perform the default behavior over error is to have the process exit
because continues whit this unknown state could be not safe because
the second parameter in readFileSync method is not valid*/