const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'});

require('./db/conn')
const port = process.env.PORT

// const User = require('./model/userSchema');
app.use(express.json())
app.use(require('./route/auth'));

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })