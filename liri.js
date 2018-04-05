// read and set environment variables
require("dotenv").config();

// import packages and store in variable
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
// var spotify = new Spotify({
//   id: 58ce6f9803e54a3e98d9c59b14e5e90c,
//   secret: 2e553892b0404cd98b0439b05c3cdef0
// });


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
  console.log(songName);
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

}

function thisMovie() {
  var movieName = process.argv[3];
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
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
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);

    }
  });
  


}

function dowhatitSays() {

}
 
