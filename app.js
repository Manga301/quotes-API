// jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));

// connect to DB
mongoose.connect("mongodb://localhost:27017/stoicQuotesDB", { useNewUrlParser: true });

// schema
const schemaQuotes = {
    author: String,
    quote: String,
};

// model
const Quote = mongoose.model("Quote", schemaQuotes);


app.route("/quotes")
.get(function(req, res){

    Quote.find(function(err, foundQuote){
        if(!err){
            res.send(foundQuote);
        } else {
            res.send(err);
        }
    });
});

app.listen(3000, function(){
    console.log("Server started at port 3000.");
});