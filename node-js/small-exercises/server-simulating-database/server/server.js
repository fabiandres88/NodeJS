const express = require ("express");
const server = express();
const bodyParser = require ("body-parser");
const dataBase = require ("./database");

server.use(bodyParser.json());

server.listen(3000, () => {
    console.log("Server Started On Port 3000 ...");
});

//GET ALL MEMBERS
server.get("/family/members/all", (req, res) => {
    res.json(dataBase);
});

//MIDDLEWARE GLOBAL
const logPetitions = (req, res, next) =>{
    console.log(
        `verb:${req.method}-route:${req.path}-query${req.query.name}-body-id:${req.body.id}-name:${req.body.name}-lastname:${req.body.lastname}-age:${req.body.age}-email:${req.body.email}-phone:${req.body.phone}`
    );
    next ();
}

server.use(logPetitions);

//GET MEMBERS BY NAME
server.get("/family/members", (req, res) => {
    const {name} = req.query;
    console.log(name);    
    const byMembers = dataBase.members.filter(element => {
        if(element.name === name){            
            return element            
        }
    });
    res.json(byMembers);
});
//MIDDLEWAREs TO CHECK THE USER POSTING
function checkMemberPost (req, res, next) {
    const {id, name, lastname, age, email, phone} = req.body;
    if(!id || !name || !lastname || !age || !email || !phone){
        res.status(400).json({Error: "All values are necesaries"});
    }else{
        next();
    }
}
const checkExit= (req, res, next) =>{
    const {id, name, lastname, age, email, phone}=req.body;
    if (id && name && lastname && age && email && phone){
        res.status(409).json({Error: "Contac Exist Already"})
    }else{
        next();
    }
}
//POST A MEMBER
server.post("/family/members", checkMemberPost,checkExit,(req, res) => {
    const {id, name, lastname, age, email, phone} = req.body;
    dataBase.members.push(req.body);
    res.json("Member added correctly ;)")
 });