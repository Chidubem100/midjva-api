require('dotenv').config

const express = require("express");
const app = express();
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const connectDB = require('./db/connect');
const authRoute = require('./routes/authRouter');
const mainRouter = require('./routes/mainRouter');
const asyncWrapper = require('./middlewares/async');

//  APP CONFIG
app.use(express.json());
// app.use(notFound);
app.use(errorHandlerMiddleware);
app.use(asyncWrapper)


app.use('/api/v1', authRoute);
app.use('/api/v1', mainRouter)

app.get('/', (req,res) =>{
    try {
        return res.status(200).json({msg: "Midjva api"})
    } catch (error) {
        return res.status(500).json({error})
    }
});




const Port = process.env.PORT || 2020

const start = async() =>{
    try{
        await connectDB
        app.listen(Port, () =>{
            console.log('server started!')
        })
    }catch(error){
        console.log(error)
    }
}

start();
// app.listen(Port, () =>{
//     console.log(`server started on ${Port}`)
// });