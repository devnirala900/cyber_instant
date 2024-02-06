const express = require('express');
const dbConnection = require('./config/dbconnection');
const app = express()
const cloudinary = require("cloudinary");
require("dotenv").config({ path: "config/.env" });
const Error = require("./middleware/error");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const categoriesRoute = require("./routes/categoriesRoutes")
const categories2Route = require("./routes/categories2Routes")
const categories3Route = require("./routes/categories3Routes")
const categories4Route = require("./routes/categories4Routes")
const imageUploadCloudinaryRoute = require("./routes/imageUploadCloudinaryRoute")


// database connection
dbConnection()
// cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cros middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//add routes
app.use('/api', categoriesRoute)
app.use('/api/cat2', categories2Route)
app.use('/api/cat3', categories3Route)
app.use('/api/cat4', categories4Route)
app.use('/api/user', imageUploadCloudinaryRoute)


//test api
app.get('/', (req, res) => {
    res.send('wellcome to search and find application')
})

//Error handling
app.use(Error);

app.listen(process.env.PORT, () => {
    console.log(`server is started :`, process.env.PORT);
})