const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/alums");

app.listen(3000,() =>{
    console.log("server initilized");
});