const express = require('express')
const path = require("path")
const app = require('./app.js')
const mongoose = require('mongoose')
const port = 3000

let dotenv=require('dotenv')
dotenv.config({ })

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
// const DATABASE_URL = "mongodb://localhost/subscribers";
const DATABASE_URL = process.env.MONGODB_URL;

mongoose.connect(DATABASE_URL
    ,{ useNewUrlParser: true, useUnifiedTopology: true,  useNewUrlParser: true  });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on http://localhost:${port}!`))
