var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.Promise = Promise;
if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
}
// mongoose.connect("mongodb://heroku_zff3bnw1:7no24iunfu15m01sgsgpdhqj8i@ds139956.mlab.com:39956/heroku_zff3bnw1");
var db = mongoose.connection;
db.on('error',function(err){
    console.log('Mongoose Error',err);
});
db.once('open', function(){
    console.log("Mongoose connection is successful");
});

// Routes



// Start the server
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
