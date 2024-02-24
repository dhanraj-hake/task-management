const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const AuthRouter = require('./routes/auth');
const taskRouter = require('./routes/task');


const app = express();

app.use(express.json());
app.use(cors());
const PORT = 8000;

mongoose.set('strictQuery', true);
mongoose.connect("")
const db = mongoose.connection;

db.on("error", ()=>{
    console.log("Error on Connecting Mongoose");
});

db.once("open", ()=>{
    console.log("Connected to MongoDb");
});

app.use("/auth", AuthRouter);
app.use("/task", taskRouter);


app.listen(PORT, ()=>{
    console.log("Servser Running on http://127.0.0.1:"+PORT)
});
