const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.port || 9987;

app.use(cors());
app.use(express.json());

const uri = process.env.ALAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true  
});

const connection = mongoose.connection;
connection.once("open", () => 
    console.log("MongoDB connection established seccessfully!")
);