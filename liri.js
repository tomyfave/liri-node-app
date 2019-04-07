//.env to hide keys
require("dotenv").config();

var fs = require('fs')
var keys = require("./keys.js");
//Initialize Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//s.searchTracks()...

//var bandsintown = require('bandsintown')(APP_ID);

var axios = require("axios");

var searchTerm = process.argv[3];
var request = process.argv[2];

//function searchInput(request, searchTerm) {


/*switch (request) {
  case "spotify-this-song":
    spotify();
    break;
   case "movie-this":
    movie();
    break;
  case "concert-this":
    band();
    break;*/

//}
  /*case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}*/

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



/*if (process.argv[2]=== "spotify-this-song" && (process.argv[3]=== "")
  {
    execute code block 1
  }
else if(condition2)
  {
    execute code block 2
  } */
//spotify.search({ type: 'process.argv[3]', query: 'process.argv[2]' }, function(err, data) {
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
       // Then we print out the imdbRating
       //console.log(response);
       //console.log(response.data[0].venue);
       console.log("The concert venue is: " + response.data[0].venue.name);
       console.log("The concert location: " + response.data[0].venue.city);
       console.log("The concert date is: " + response.data[0].datetime);
      //  console.log("The venue location is " + response.data.imdbRating);
      //  console.log("The date of the event is: " + response.date);
      //  console.log("The movie's language is: " + response.data.Language);
      //  console.log("The movie's plot is: " + response.data.Plot);
      //  console.log("The movie's actors are: " + response.data.Actors);
     
     }
   );
    }

