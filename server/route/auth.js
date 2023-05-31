const express = require("express");

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
    }
    const user = new User(req.body);
    await user.save();
    
    return res.json({ message: "User Register Successfuly" });
    
  } catch (err) {
    console.log(err);
    res.json({ error: "Failed To Register" });
  }
});

router.get("/about", authMiddlware, (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
