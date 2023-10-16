const express = require("express");
var cors = require("cors");
require('dotenv').config();
var app = express();
const path = require('path');
const PORT = 5000;
app.use(cors());

const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');  
app.use(express.json());
app.use(cookieParser());  

var dburi = `mongodb://mongo:27017/tally400`;
console.log(dburi)
mongoose.connect(dburi, (err)=>{
    if(err) console.log(err);
    else console.log("Database connected");
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.send("<H1>Hello I am server</H1>");
});
app.use("/api/user", require("./routes/User"));
app.use("/api/forms", require("./routes/Forms"));

app.listen(PORT, () => {
    console.log("Listning to port 5000");
});