const mongoose = require("mongoose")
require("dotenv").config({ path: 'config/.env' })

const dbConnection = () => {
    mongoose.connect(process.env.DBURL)
    console.log("dbconnection successful")
}

module.exports = dbConnection;