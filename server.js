var express = require("express");
var mongoose = require("mongoose");

// // Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
mongoose.connect("mongodb://heroku_zff3bnw1:7no24iunfu15m01sgsgpdhqj8i@ds139956.mlab.com:39956/heroku_zff3bnw1");

var PORT = 3000;

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});


