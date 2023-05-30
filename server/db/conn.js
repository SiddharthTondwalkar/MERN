const mongoose = require('mongoose')

const db = process.env.DB

mongoose.connect(db).then(()=>{
    console.log('connection Done')
  }).catch((err)=> console.log('connection failed'));
  