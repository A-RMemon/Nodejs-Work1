const express = require('express');
const app = express();
const port = 5000;

var bodyParser = require('body-parser')
var cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.connectString)
const db = mongoose.connection;
db.once("open",()=>{
    console.log("connected to mongoDb database")
})
db.on("error",()=>{
    console.log("error in database")
})

const mainRouter = require("./router/mainRouter");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({origin:['http://localhost:5000',"http://127.0.0.1:5500"]}))
// app.use(cors());
app.use(mainRouter)
// app.use(mainRouter)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});



// let arr = []

// app.post('/',(req,res)=>{
//     arr.push(req.body)
//     console.log(arr)
//     res.status(200).json(req.body)
// })
// app.get('/',(req,res)=>{
//     res.status(200).json(arr)
// })
