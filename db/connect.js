const dbConfig = require('./db.config');
const mongoose = require('mongoose');

// const db = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

// const ConnectDB = () =>{
//     return mongoose
//      .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//     })
// }


mongoose.Promise = global.Promise;

const connectDB = {};

connectDB.mongoose = mongoose;

connectDB.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    
})
.then(() => {
    console.log("Successfully connected to MongoDB.");
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});


module.exports = connectDB

