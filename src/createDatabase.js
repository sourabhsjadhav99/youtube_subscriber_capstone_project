const mongoose = require('mongoose')
const subscriberModel = require('./models/subscribersModel')
const data = require('./data')
const path = require("path")
let dotenv=require('dotenv')

dotenv.config({ path: '.env' })


// Connect to DATABASE
// const DATABASE_URL = "mongodb://localhost/subscribers";
const DATABASE_URL = process.env.MONGODB_URL

mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true,  useNewUrlParser: true  });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Database created...'))

const refreshAll = async () => {
    await subscriberModel.deleteMany({})
    // console.log(connection)
    await subscriberModel.insertMany(data)
    await mongoose.disconnect();
}
refreshAll()