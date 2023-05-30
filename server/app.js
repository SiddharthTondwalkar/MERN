const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'});

const port = process.env.PORT

const db = process.env.DB

mongoose.connect(db).then(()=>{
  console.log('connection Done')
}).catch((err)=> console.log('connection failed'));
const authMiddlware = (req, res, next) =>{
next()
}

// authMiddlware();
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/about',authMiddlware, (req, res) => {
    res.send('Hello World!')
  })
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })