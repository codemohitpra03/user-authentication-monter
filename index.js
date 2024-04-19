require('dotenv').config()

const express = require('express')
const bodyparser=require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');


const {connectToMongoDB} = require('./connect.js')
const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/user.js')



const app = express()
const PORT = 8000;


connectToMongoDB()

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser())
app.use(cors());




app.get('/', (req, res) => {
    res.send(`<h1>User registration and authentication mechanism - submission by Mohit Kanojia - Monter</h1>
    <br>
    <h3><a href="https://github.com/codemohitpra03/user-authentication-monter" target="_blank">Github Repo of Assignment</a></h3>
    <h3><a href="https://user-authentication-monter-mohit-kanojia.onrender.com" target="_blank">Live Deployed Link</a></h3>
    <h3><a href="https://github.com/codemohitpra03" target="_blank">Github Account</a></h3>
    `)
})

app.use('/auth',authRoute)
app.use('/user',userRoute)


app.listen(PORT, () => {
    console.log(`User credentials app listening on port ${PORT}!`)
})