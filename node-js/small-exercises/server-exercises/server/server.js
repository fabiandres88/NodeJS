const express = require("express");

const app = express();

const users = [
    {
        id: 1,
        name: "Fabian",
        lastname: "Ramirez",
        age: 31
    },
    {
        id: 2,
        name: "Carolina",
        lastname: "Jaimes",
        age: 29
    },
    {
        id: 3,
        name: "Zaray",
        lastname: "Martinez",
        age: 8
    },
    {
        id: 4,
        name: "Fabio",
        lastname: "Ramirez",
        age: 63
    },
    {
        id: 5,
        name: "Rosa",
        lastname: "Vela",
        age: 53
    },
    {
        id: 6,
        name: "German",
        lastname: "Ramirez",
        age: 29
    }
]

// //GETTING ALL USERS
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const byId = users.filter(element =>{
        if (element.id === Number(id)){
            return element
    };          
});
    res.json(byId);
});

app.get("/error", (req, res) => {

    res.statusCode = "500";

    res.send("Error")
});

app.listen(3000, () => {
    console.log("server initialized");
});