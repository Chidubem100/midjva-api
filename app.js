const express = require("express");
const app = express();
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');




app.get('/', (req,res) =>{
    try {
        return res.status(200).json({msg: "Midjva api"})
    } catch (error) {
        return res.status(500).json({error})
    }
});




const Port = process.env.PORT || 2020

app.listen(Port, () =>{
    console.log(`server started on ${Port}`)
});