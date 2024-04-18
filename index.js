require('dotenv').config()

const express = require('express')
const bodyparser=require('body-parser');
const cors = require('cors');


const {connectToMongoDB} = require('./connect.js')
const authRoute = require('./routes/auth.js')



const app = express()
const PORT = 8000;


connectToMongoDB()

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use(cors());




app.get('/', (req, res) => {
    res.send('User registration and authentication mechanism - submission by Mohit Kanojia - Monter')
})

app.use('/auth',authRoute)


app.listen(PORT, () => {
    console.log(`User credentials app listening on port ${PORT}!`)
})