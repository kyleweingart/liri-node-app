// read and set environment variables
require("dotenv").config();

// import packages and store in variable
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var colorize = require("json-colorz");
var fs = require("fs");

// pass in API keys
var sp = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// create parameters 
var command = process.argv[2];
// var songName = process.argv[3];
var param2 = process.argv[3];

// run different commands based on parameter command input
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
// =================================================================================================
function myTweets() {
  var params = {
    screen_name: "rvapix1",
    count: 20
  };
  client.get("statuses/user_timeline", params, function (
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
  if (param2 === undefined) {
    param2 = "The Sign";
    searchSpotifyAPI(5);
  } else {
    searchSpotifyAPI(0);
  }
}

function searchSpotifyAPI(index) {
  sp.search({
      type: "track",
      query: param2
    },
    function (err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      console.log(
        "Artist(s): " + JSON.stringify(data.tracks.items[index].artists[0].name)
      );
      console.log(
        "Song Name: " + JSON.stringify(data.tracks.items[index].name)
      );
      console.log(
        "Preview Link: " +
        JSON.stringify(data.tracks.items[index].external_urls.spotify)
      );
      console.log(
        "Album: " + JSON.stringify(data.tracks.items[index].album.name)
      );
    }
  );
}

function thisMovie() {
  if (param2 === undefined) {
    param2 = "Mr.Nobody";
  }
  searchOMDB();

}


function searchOMDB() {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + param2 + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
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
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

    command = dataArr[0];
    param2 = dataArr[1];


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


    }
  })

}