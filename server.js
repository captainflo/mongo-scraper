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
    mongoose.connect("mongodb://localhost:27017/mongo-scraper", { useNewUrlParser: true });
}
// mongoose.connect("mongodb://heroku_zff3bnw1:7no24iunfu15m01sgsgpdhqj8i@ds139956.mlab.com:39956/heroku_zff3bnw1");
// var db = mongoose.connection;
// db.on('error',function(err){
//     console.log('Mongoose Error',err);
// });
// db.once('open', function(){
//     console.log("Mongoose connection is successful");
// });

// Routes

// A GET route for scraping the echoJS website
app.get("/scraper", function(req, res) {
  // Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
axios.get("https://www.nytimes.com/").then(function(response) {

  // Load the Response into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("article").each(function(i, element) {
    // Save the text of the element in a "title" variable
    var title = $(element).children(':first-child').find('h2').text();
    
    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children(':first-child').find('a').attr("href");
    var text = $(element).children(':first-child').find('p').text() || $(element).children(':first-child').find('li').text() || "No Description";
  
    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link,
      text: text
    });
  });
  // Log the results once you've looped through each of the elements found with cheerio
  res.json(results);
  });
});

// Route for getting all Articles from the db
app.get("/saved", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/saved/:id", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article
app.post("/saved/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Article.create(req.body)
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for Delete an Article
app.delete("/delete/:id", function(req, res) {
  // Remove Article the req.body to the entry
  db.Article.findByIdAndRemove(req.params.id)
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Note
app.post("/saved/note/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { note: dbNote._id }}, { new: true })
    })
    .then(function(dbNote) {
      res.json(dbNote);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});



// show all the note
app.get("/noteshow/", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.find({})
    .then(function(dbNote) {
      res.json(dbNote);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    }); 
});

// Delete note
app.delete("/deletenote/:id", function(req, res) {
  // Remove Note the req.body to the entry
  db.Note.findByIdAndRemove(req.params.id)
    .then(function(dbNote) {
      res.json(dbNote);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});



// Start the server
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
