const users = require ("./users")
const express = require ("express");
const bodyParser = require ("body-parser");
const jwt = require ("jsonwebtoken");
const app = express ();
const key = "My_sIng_To_Jwt";

app.use(bodyParser.json());

app.get("/getUser",(req,res)=>{    
    res.json(users.allUsers);
});

app.post("/createUser",(req,res)=>{   
    users.allUsers.push(req.body);
    res.json(req.body);
});

const validateUser = (req, res, next) => {
    const {name, lastname, email, password} = req.body;
    const [checking] = users.allUsers.filter(element => {
        if(element.email === (email)){ 
            if (name){
                element.name= (name);
            }
            if (lastname){
                element.lastname= (lastname);
            }
            if (password){
                element.password= (password);
            }           
            return element            
        }        
    });
    if (!checking){
        return res.status(404).json({Error:"User not exist"});            
    }
    next();
}
app.put("/modifyUser", validateUser, (req, res)=>{    
    res.status(201).json("User modified");
})

const valideManager = (req, res , next) =>{
    const {email, is_manager} = req.body;
    const {checking} = users.allUsers.filter(element =>{
        if(element.email === (email)){
                element.is_manager = (is_manager);            
            return element
        }
    });    
    next();
};

app.put("/manager", valideManager, (req, res) =>{
    res.status(201).json("User modified");
})

//MIDDLEWARE TO VALIDE USERS AN LOGIN
const validateUsersToLogin = (req, res, next) =>{
    const {email, password} = req.body;
    const validation = users.allUsers.filter(element => element.email == email && element.password == password);
    if(validation.length > 0){
        res.status(200);         
    }   
    else{
        res.status(404).json({Error:"Invalid User"});
        return        
    }  
    next();
};

const authenticateUser = (req, res, next) => {
    try{
        const token = req.headers.authorization.split("")[1];
        const verifyToken = jwt.verify(token, key);
        if (verifyToken){
            req.name= verifyToken;
            return next ();

        }

    } catch (error){
        res.json({error: "Error to validate user"});
    }
};

app.post("/login", validateUsersToLogin, (req, res)=>{
    const {name} = req.body;
    const token = jwt.sign(name,key);
    res.json("Login sucessful your token is: " + token);    
});

app.listen(3000, ()=>{
    console.log("Server listening now ...");
})