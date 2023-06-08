const express = require("express");
const bcrypt = require('bcryptjs')

const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");

const authMiddlware = (req, res, next) => {
  next();
};

// authMiddlware();
router.get("/", (req, res) => {
  res.send("Hello World! from server");
});

router.post("/register", async (req, res) => {
  const { name, email, number, password, cpassword } = req.body;

  if (!name || !email || !number || !password || !cpassword) {
    return res.json({ error: "Please Fill All The Fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.json({ error: "Email Already Exist" });
    }else if(password != cpassword){
      return res.status(400).json({ error: "Password And Confirm Password Not Matched" });

    }
    const user = new User( {name, email, number, password, cpassword} );

    await user.save();
    
    return res.json({ message: "User Register Successfuly" });
    
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed To Register" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password} = req.body;
    if(!email || !password ){
      return res.status(400).json({error:"Please filled the data"})
    }
    const userLogin = await User.findOne({email:email});

    if(userLogin){
      const isMatch = await bcrypt.compare(password, userLogin.password)

      if(!isMatch){
        return res.status(400).json({error:"No User Found"})
  
      }else{
        return res.json({message:"User Signin Successfully"})
  
      }
    }
    else{
      return res.status(400).json({error:"No User Found"})

    }
    

  } catch (err) {
    
  }
});

router.get("/about", authMiddlware, (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
