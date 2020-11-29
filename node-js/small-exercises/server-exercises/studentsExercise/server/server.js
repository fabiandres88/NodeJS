const students = require("./students");

const express = require("express");
const server = express();

server.listen(3000, () => {
    console.log("Server initilized on port 3000");
});

//ROUTE ALL STUDENTS
server.get("/acamica/comision/alumnos", (req, res) => {
    res.json(students);
});

//ROUTE STUDENTS BY ID
server.get("/acamica/comision/alumnos/:id", (req, res) => {
    const idStudent = req.params.id;
    if (isNaN(idStudent)) {
        res.statusCode = 404;
        res.json({ Error: 'Bad request, invalid ID, the Id must be a number' });
    }
    const byId = students.students.filter(element => {
        if (element.id === Number(idStudent)) {
            return element;
        }
        res.json(byId);
    });
});

//MIDDLEWARE COMISION
function checkComision(req, res, next) {
    if (req.params.comision !== "dwfs" && req.params.comision !== "dwa" && req.params.comision !== "bigdata") {
        res.status = 404;
        res.json({ Error: "Bad request, invalid comision, the comision must be dwfs, dwa or bigdata" })
    } else {
        next();
    }
}
//ROUTE STUDENST by COMISION
server.get("/acamica/comision/:comision/alumnos", checkComision, (req, res) => {
    const stComision = req.params.comision;
    const byComision = students.students.filter(element => {
        if (element.comision === stComision) {
            return element
        }
    });
    res.json(byComision);
});