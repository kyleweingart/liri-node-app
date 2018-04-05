// read and set environment variables
require("dotenv").config();

// import packages and store in variable
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var colorize = require('json-colorz');

// pass in API keys
var sp = new Spotify(keys.spotify);
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
  var songName = process.argv[3];
  // console.log(songName);
  sp.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    // console.log(JSON.stringify(data,null,2));
    // colorize(data.tracks.items[0]);
    console.log(
      "Artist(s): " + JSON.stringify(data.tracks.items[0].artists[0].name)
    );
    console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name));
    console.log(
      "Preview Link: " +
        JSON.stringify(data.tracks.items[0].external_urls.spotify)
    );
    console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
  });
}

function thisMovie() {
  var movieName = process.argv[3];
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  console.log(movieName);
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(body);
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      console.log(
        "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
      );
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

function dowhatitSays() {

}
 
