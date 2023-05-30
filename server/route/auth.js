const express = require('express')

const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema')

const authMiddlware = (req, res, next) =>{
    next()
}

// authMiddlware();
router.get('/', (req, res) => {
    res.send('Hello World! from server')
})

router.post('/register', (req, res) => {
    // console.log(req.body);
    // res.send({message: req.body})
    const { name, email,number, password, cpassword } = req.body;

    if(!name || !email || !number || !password || !cpassword){
        return res.json({error:"Please Fill All The Fields"});
    }

    User.findOne({email:email}).then((userExist)=>{
        if(userExist){
        return res.json({error:"Email Already Exist"});
        }
        const user = new User(req.body)
        user.save().then(()=>{
        return res.json({message:"User Register Successfuly"});
        }).catch(err=> {res.status(500).json({error:"Failed To Register"})})
    }).catch(err => { console.log(err)});
})


router.get('/about',authMiddlware, (req, res) => {
    res.send('Hello World!')
  })

module.exports = router;