const { Router } = require("express");
const admin = require("../config/admin");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
var validator = require("email-validator");

const router = Router();

async function findEmail(email) {
  const adminEmail = admin.filter((admin) => admin.email === email);
  return adminEmail[0];
}

router.get('/', (req,res)=>{
  res.send('Hello') 
})

// Login Route
router.post("/login", async (req, res) => {
  const myAdmin = await findEmail(req.body.email);
  const password = myAdmin?.password == req.body.password;
  const token = jwt.sign({ _id: myAdmin?._id }, "9bThisIsMySecterToken!.", {
    expiresIn: "30d",
  });

  if (!myAdmin) {
    return res.status(400).json({ mgs: "Something went wrong!" });
  }

  if (!password) {
    return res.status(400).json({ mgs: "Something went wrong!" });
  }

  return res
    .header("x-auth-token", token)
    .status(200)
    .json({ msg: "You are logged in", token });
});

module.exports = router;
