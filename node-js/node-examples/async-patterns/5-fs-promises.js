const {readFile} = require('fs').promises;

async function main() {
    const data = await readFile(__filename);
    console.log('File data is: ', data);
}

main();

console.log('TEST');

//This is code destructured and attach to the top level api the fs module