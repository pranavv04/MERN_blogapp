const express = require('express')
const app = express();
const cors = require('cors')
const db = require('./mongodb/db')
require('dotenv').config();
const passport = require('./auth')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 3000;

const logRequest = (req,res,next) =>{
    console.log(`${new Date().toLocaleString()}
    Request made to : ${req.orginialUrl}`);
    next();
}
app.use(logRequest);
app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local' ,{session:false});
app.get('/' ,(req,res)=>{
    res.send('Server running good right now')
})

const userRoutes = require('./routes/userRoutes')
app.use('/user',userRoutes)

const blogRoutes = require('./routes/blogRoutes')
app.use('/blogs' , blogRoutes)

app.listen(PORT , ()=>console.log('Server started homie'))