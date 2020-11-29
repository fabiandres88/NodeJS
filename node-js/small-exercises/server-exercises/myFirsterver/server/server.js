const express = require ("express");

const server=express();

server.listen(3000, () =>{
    console.log("Server started on port 3000");
    console.log("This is my first server");
})