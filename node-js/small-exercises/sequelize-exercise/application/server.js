const express = require ("express");
const app = express();
const Sequelize = require ("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/clase49");
app.use(express.json());
//Getting bands
app.get("/bands", (req, res) =>{
    sequelize.query("SELECT * FROM bands",
    {type: sequelize.QueryTypes.SELECT}
    ).then((response)=>{        
        res.json(response);
    }).catch((error)=>{
        console.log(error);
    })
});
//Adding songs
app.post("/songs", (req, res) => {
    const query = "INSERT INTO canciones (nombre, duracion, album, banda, fecha_publicacion) VALUES (?,?,?,?,?)";
    const {nombre, duracion, album, banda, fecha_publicacion} = req.body;    
    sequelize.query(query,{replacements: [nombre, duracion, album, banda, fecha_publicacion]})
    .then((response)=>{        
        res.json("Song saved"+response);
    }).catch((error)=>{
        console.error(error);
    });
});
//Adding albums
app.post("/albums", (req , res) =>{
    const query = "INSERT INTO albumes (nombre_album, banda, fecha_publicacion) VALUES (?,?,?)";
    const {nombre_album, banda, fecha_publicacion} = req.body;
    sequelize.query(query,{replacements: [nombre_album, banda, fecha_publicacion]})
    .then((response =>{
        res.json("Album saved" + response);        
    })).catch((error)=>{
        console.error(error);
    })
});
//Modifying song by Id
app.put("/songs/:id", (req, res) => {
    const {id} = req.query;
    const query = "UPDATE canciones SET (nombre, duracion, album, banda, fecha_publicacion) VALUES (?,?,?,?,?) WHERE id=?";    
    const  {nombre, duracion, album, banda, fecha_publicacion} = req.body;
    sequelize.query(query, {replacements: [id, nombre, duracion, album, banda, fecha_publicacion]})
    .then((response =>{
        res.json("Song updated"+req.body);
    })).catch((error =>{
        console.log(error);
    }))

});
app.listen(3000, ()=>{
    console.log("Server started on port 3000 ...")
});