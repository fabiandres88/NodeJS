const coolImages = require("cool-images");
const moment = require("moment");

//this excersise is the first exercise 
// console.log(coolImages.one());
// let my= (coolImages.many(600, 800, 10));

// // console.log(my);
// my.forEach(element => console.log(element));
let three = (coolImages.many(600, 800, 3));
let time= moment().format("YYYY/MMMM/DD/HH:mm:ss");
console.log(time);
console.log(three);
//buffer string to read the documnt fs read