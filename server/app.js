const express = require("express");
var cors = require("cors");
var app = express();
const path = require('path');
const PORT = process.env.PORT||5000;
app.use(cors());

const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');  
app.use(express.json());
app.use(cookieParser());  


//hj4h5432j5h$$Fh5i348u98**HU(*YGY$G#JH#)

var dburi = "mongodb+srv://tally400:tally400@cluster0.xmo2p.mongodb.net/tally400?retryWrites=true&w=majority";
mongoose.connect(dburi, (err)=>{
    if(err) console.log(err);
    else console.log("Database connected");
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    console.log(req.cookies.name)
    res.send("<H1>Hello I am server</H1>");
});
app.use("/api/user", require("./routes/User"));
app.use("/api/forms", require("./routes/Forms"));

app.listen(PORT, () => {
    console.log("Listning to port 5000");
});