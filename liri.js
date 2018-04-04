// read and set environment variables
require("dotenv").config();

// import packages and store in variable
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];

switch (command) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      spotifySong();
      break;
    
    case "movie-this":
      thisMovie();
      break;
    
    case "do-what-it-says":
      dowhatitSays();
      break;

}
    
  



// command functions
function myTweets() {
  var params = {
    screen_name: "rvapix1",
    count: 20
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var key in tweets) {
        console.log(
          "Tweet: " +
            tweets[key].text +
            "  Time Created: " +
            tweets[key].created_at
        );
      }
    }
  });
}
  
 

function spotifySong() {

}

function thisMovie() {

}

function dowhatitSays() {

}
 
