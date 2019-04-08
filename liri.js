//.env to hide keys
require("dotenv").config();

var fs = require('fs')
var keys = require("./keys.js");
//Initialize Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//Initialize axios
var axios = require("axios");

var moment= require('moment');

var searchTerm = process.argv[3];
var request = process.argv[2];





if (process.argv[2]=="movie-this"){
  console.log(process.argv[2] , process.argv[3]);
  movie()
}
else if (process.argv[2]=="spotify-this"){
  spotifySong()
}
function movie(){
// We then run the request with axios module on a URL with a JSON
 axios.get("http://www.omdbapi.com/?t=" + process.argv[3] +"&y=&plot=short&apikey=trilogy").then(
   function(response) {
     // Then we print out the imdbRating
     console.log("The movie's title is: " + response.data.Title);
     console.log("The movie's release year is: " + response.data.Year);
     console.log("The movie's rating is: " + response.data.imdbRating);
     console.log("The movie's film location is: " + response.data.Country);
     console.log("The movie's language is: " + response.data.Language);
     console.log("The movie's plot is: " + response.data.Plot);
     console.log("The movie's actors are: " + response.data.Actors);
   
   }
 );
  }

  function spotifySong(){
 spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
   if (err) {
     return console.log('Error occurred: ' + err);
   }
   else{
    //console.log(data); 
    console.log("The artist is: " +data.tracks.items[0].artists[0].name);
    //this is for the artist
    console.log("The song is: " +process.argv[3]);
    //Spotify url
    console.log("The song url is: " +data.tracks.items[0].artists[0].external_urls.spotify);
    //spotify album
    console.log("The album name is: " +data.tracks.items[0].album.name);
   }
 
 });
  }
  if (process.argv[2]=="concert-this"){
    console.log(process.argv[2] , process.argv[3]);
    concert()
  }
  else if (process.argv[2]=="spotify-this"){
    spotifySong()
  }
  function concert(){
  // We then run the request with axios module on a URL with a JSON
  console.log(searchTerm);
   axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=" + keys.bandsintown.id).then(
     function(response) {
      for (i=0; i < response.data.length; i++ ) {

       var date = moment(response.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a");
       console.log("The concert venue is: " + response.data[0].venue.name);
       console.log("The concert location: " + response.data[0].venue.city);
       console.log("The concert date is: " + date);
     }
    }
   );
    }

    if (request == "movie-this" && searchTerm == undefined) {
      searchTerm = "Mr. Nobody"
    }
    
    if (request == "spotify-this-song" && searchTerm == undefined) {
      searchTerm = "The Sign Ace of Base"
    }
    
if (request === "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(error,data){

    //if (error) {
    //    return console.log(error);
    //}
    console.log(data);
    
    var dataArr = data.split(",");
    
    console.log(dataArr);
    });
}
