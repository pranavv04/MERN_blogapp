const mongoose = require('mongoose')


require('dotenv').config();

const mongoUrl = process.env.MONGODB_URL_LOCAL;


mongoose.connect(mongoUrl,{
    useNewUrlParser : true,
    useUnifiedTopology:true

})
 

const db = mongoose.connection;

db.on('connected' , ()=>{
    console.log('Database connected homie')
})
db.on('disconnected' , ()=>{
    console.log('Database disconnected homie')
}) 
db.on('error' , (error)=>{
    console.log('Database error' , error)
}) 


module.exports = db;