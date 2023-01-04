
require('dotenv').config();


const express = require("express");
const notFound = require('./middlewares/notFound');
const auth = require('./middlewares/authMiddleware');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const connectDB = require('./db/connect');
const authRoute = require('./routes/authRouter');
const mainRouter = require('./routes/mainRouter');
const helmet = require("helmet");
const cors = require('cors');
const xss = require('xss-clean');
const app = express();



//  APP CONFIG
app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use('/api/v1', authRoute);
app.use('/api/v1', auth,mainRouter);

app.get('/api', (req,res) =>{
    try {
        return res.status(200).json({msg: "Midjva api"})
    } catch (error) {
        return res.status(500).json({error})
    }
});

app.use(notFound);
app.use(errorHandlerMiddleware);


const Port = process.env.PORT || 5000;

const start = async() =>{
    try{
        await connectDB
        app.listen(Port, () =>{
            console.log(`server have started on ${Port}`);
        })
    }catch(error){
        console.log(error)
    }
}

start();

// implement rateLimiter and other security features.
// implement cors