const dataBase = require("./database");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");

server.use(bodyParser.json());

//MIDDLEWARE TO VALIDATE ROUTE GET AUTHORS (OK)
function validateAuthors (req, res, next){
    if ((dataBase.authors).length <= 0){
        res.json([]);
    }
    next();
}

//GET ROUTE ALL AUTHORS (OK)
server.get("/authors", validateAuthors, (req, res) => {
    res.json(dataBase.authors);
});

//MIDDLEWARE TO VALIDATE ROUTE POST AUTHORS (OK)
function existAuthors (req, res, next){
    const {id, name, lastname, bornDate, books} = req.body;    
    const searchExist = dataBase.authors.filter(element => element.name == name);
    const checkLast = dataBase.authors.filter(last => last.lastname == lastname);
    if (searchExist.length >0 && checkLast.length > 0){
        res.status(409).json("Author already exist");
        return
    }else{
        next();
    }
}

//POST ROUTE AUTHORS (OK)
server.post("/authors",existAuthors, (req, res) => {
    const { id, name, lastname, bornDate, books } = req.body;
    dataBase.authors.push(req.body);
    res.status(201).json(req.body);
});

//MIDDLEWARE TO VALIDATE GET PETITION AUTHORS WITH ID (OK)
function valAuthorsId (req, res, next){
    const id = req.params.id;
    const author = dataBase.authors.filter(element =>element.id === Number(id));            
        if (author.length > 0) { 
            res.status(200).json(author);         
            return 
        }else{
            next();
        }
} 

//GET ROUTE AUTHORS BY ID (OK)todo..........
server.get("/authors/:id", valAuthorsId, (req, res) => {    
    res.status(404).json("Author not exist");
});

//MIDDLEWARE TO VALIDATE DELETE PETITION BY ID
function validateDelete (req, res, next){
    const id = req.params.id;
    const author = dataBase.authors.filter(element => {
        if (element.id === Number(id)) {
            const index = dataBase.authors.indexOf(element);
            dataBase.authors.splice(index, 1);
            res.status(204)
            return element
        }else{
            next();
        }
    })    
    res.json("Element was deleted");
}

//DELETE ROUTE AUTHORS BY ID (OK)
server.delete("/authors/:id",validateDelete, (req, res) => {
    res.status(404).json("Author not exist");
});

//MIDDLEWARE TO VALIDATE PUT PETITION BY ID (OK)
function validatePut (req, res , next){
    const { id, name, lastname, bornDate, books } = req.body;
    const idAuthor = req.params.id;
    const author = dataBase.authors.filter(element => {
        if (element.id === Number(idAuthor)) {
            const index = dataBase.authors.indexOf(element);
            dataBase.authors.splice(index, 1, req.body);
            return element
        }else{
            next();
        }
    })
    res.json(author);
}
//PUT ROUTE AUTHORS BY ID (OK)
server.put("/authors/:id",validatePut, (req, res) => {
    res.status(404).json("Author not exist");
});

//MIDDLEWARE TO VALIDATE GET PETITION BY ID AUTHORS/BOOKS
function validateIdAuthor (req,res, next){
    const idAuthor = req.params.id;
    const author = dataBase.authors.filter(element => {
        if (element.id === Number(idAuthor)) {                       
            if (element.books.length >= 0){
                res.json(element.books);
                return
            }            
        }else{
            next();        
        }
    })    
}

//GET ROUTE BOOKS BY ID AUTHORS (OK)
server.get("/authors/:id/books",validateIdAuthor,(req, res) => {
    res.status(404).json("Author not exist");
});

//POST ROUTE BOOKS BY ID AUTHORS (OK)
server.post("/authors/:id/books", (req, res) => {
    const idAuthor = req.params.id;
    const { id, title, description, publicationDate } = req.body;
    const author = dataBase.authors.filter(element => {
        if (element.id === Number(idAuthor)) {
            const index = dataBase.authors.indexOf(element);
            element.books.splice(index, 0, req.body);
            return element
        }
    })
    res.json(req.body);
});

//GET ROUTE BOOKS BY ID AUTHORS AND ID BOOKS (OK)
server.get("/authors/:id/books/:idBook", (req, res) => {
    const idAuthor = req.params.id;
    const idBooks = req.params.idBook;
    const { id, title, description, publicationDate } = req.body;
    const author = dataBase.authors.filter(element => {
        if (element.id === Number(idAuthor)) {
            res.json(element.books[idBooks - 1]);
            return element
        }
    })
});

//PUT ROUTE BOOKS BY ID AUTHORS AND ID BOOKS (OK)
server.put("/authors/:id/books/:idBook", (req, res) => {
    const idAuthor = req.params.id;
    const idBooks = req.params.idBook;
    const { id, title, description, publicationDate } = req.body;
    const author = dataBase.authors.filter(element => {
        if (element.id === Number(idAuthor)) {
            const book = element.books[idBooks - 1];
            const index = element.books.indexOf(book);
            element.books.splice(index, 1, req.body);
            return element
        }
    })
    res.json(req.body);
});

//DELETE ROUTE BOOKS BY ID AUTHORS AND ID BOOKS (OK)
server.delete("/authors/:id/books/:idBook", (req, res) => {
    const idAuthor = req.params.id;
    const idBooks = req.params.idBook;    
    const author = dataBase.authors.filter(element => {
        if (element.id === Number(idAuthor)) {
            const book = element.books;
            const specificBook = book.filter(element =>{
                if (element.id === Number(idBooks)) {                     
                    const index = book.indexOf(element);                    
                    book.splice(index, 1);                                    
                    return element
                }                
            });
            return element
        }
    })
    res.json("Element deleted correctly");
});

server.listen(3000, () => {
    console.log("This Server is working on port 3000...");
});