const { Router } = require("express");
const admin = require("../config/admin");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
var validator = require("email-validator");
const { Router } = require("express");
const Item = require("../models/item");
const multer = require("multer");
const path = require("path");

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

// const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  // res.send(students);
  Item.find().then((result) => {
    res.send(result);
  });
});

router.put("api/update", async (req, res) => {
  const newAdminData = new Item({
    title: req.body.title,
    price: req.body.price,
    size: req.body.size,
    phone: req.body.phone,
    image: req.body.image,
  });

  await Item.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      price: req.body.price,
      size: req.body.size,
      phone: req.body.phone,
      image: req.body.image,
    },
    { new: true },
    []
  );
  Item.find().then((result) => {
    res.send(result);
  });

  // const savedAdminData = newAdminData.save();
  // savedAdminData.then(function (result) {
  //   res.json(result);
  // });
});
router.delete("api/delete/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);

  Item.find().then((result) => {
    res.send(result);
  });
});

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "api/uploadImage",
  imageUpload.single("image"),
  (req, res) => {
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.post("api/add", (req, res) => {
  const newItemData = new Item(req.body);
  const savedItemData = newItemData.save();
  savedItemData.then(function (result) {
    res.json(result);
  });

  // jwt.verify(req.body.token, "shhhhh", function (err, decoded) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(decoded)
  //   res.send('decoded')
  // });
});


module.exports = router;
