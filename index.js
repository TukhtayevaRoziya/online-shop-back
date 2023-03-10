const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require("cors"); 
app.use(cors()); 

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://roziya:onlineShop@cluster0.xkwrwwv.mongodb.net/online-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to Mongodb database...");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/', require('./routes/auth'))
app.use('/api', require('./routes/home'))
app.use("/images", express.static("images"));

app.listen(3001, ()=>console.log('Server has been started'))