var fs = require("fs");

var request = require("request");

// Get twitter package
var Twitter = require('twitter');

// Grabs the keys variables
var keys = require("./keys.js");

// Store Twitter Keys in a variable
// var client = new Twitter(keys);

var songName = "";
var movieName = "";
var searchInSpotify;
var userInputArray = [];
var userInputString = "";

var client = new Twitter({
  consumer_key: 'AotYyNib3YmpEguZ6hPDngBNn',
  consumer_secret: 'j45QKpMMX2HNP2mcj0FU4rRQ7i1V2KmHjNmlKPKo1xG9fDwvJD',
  access_token_key: '215798585-25Z6XJJQOXeVC1TpPJ2Qv0pSKVXMsnY9ksbTGC6M',
  access_token_secret: '5S6OhUBvFRht0tYIyZde68dGSXPo6P7ObqwNPcKBf45HB',
});

var params = {screen_name: 'talentByPractis'};

if (process.argv[2] === "my-tweets") {

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
	    	// console.log(JSON.stringify(tweets, null, 2));
	    	for (var i = 0; i < 20; i ++){
	    		console.log(tweets[i].text);
	    	}
		} else {
	  	console.log("error");
	  	console.log(error);
	  }
	});
} else if (process.argv[2] === "spotify-this-song") {

	if (process.argv.length < 4) {
		songName = "The Sign";
	} else {
		var j = 0;
		for (var i = 3; i < process.argv.length; i ++) {
			userInputArray[j] = process.argv[i];
			j ++;
		}
		for (var i = 0; i < userInputArray.length; i ++) {
			userInputString = userInputString + " " + userInputArray[i];
		}
		songName = userInputString;
	}
 	console.log("songName = " + songName);

	// var queryURL = "https://api.spotify.com/v1/search?q=" + songName + "&type=track"
	var queryURL = "https://api.spotify.com/v1/search?query=" + songName + "&type=track&offset=2&limit=2";

	request(queryURL, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log(body);
	  	fs.writeFile("outputSpot.js", body, function(err){
	  		if (err) {
	  			console.log("error in writing file");
	  			return;
	  		}
	  	})
	    // console.log(JSON.stringify(body, null, 2)); // Show the HTML for the Google homepage. 
	  }
	})

} else if (process.argv[2] === "movie-this") {
	if (process.argv.length < 4) {
		movieName = "Mr. Nobody";
	} else {
		var j = 0;
		for (var i = 3; i < process.argv.length; i ++) {
			userInputArray[j] = process.argv[i];
			j ++;
		}
		userInputString = userInputArray[0];
		for (var i = 1; i < userInputArray.length; i ++) {
			userInputString = userInputString + " " + userInputArray[i];
		}
		movieName = userInputString;
	}
 	console.log("movieName = " + movieName);

	// var queryURL = "https://api.spotify.com/v1/search?q=" + songName + "&type=track"
	var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=47aaffc2100101b29b819d304b4a2a0d&query=" + movieName;
	// var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
	console.log(queryURL);

	request(queryURL, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log(body);
	  	fs.writeFile("outputmovie.js", body, function(err){
	  		if (err) {
	  			console.log("error in writing file");
	  			return;
	  		}
	  	})
	  } else {
	  	console.log("error with omdb request");
	  	console.log(error);
	  	console.log(response.statusCode);
	  }
	})

} else if (process.argv[2] === "do-what-it-says") {
	fs.readFile("./random.txt", "utf8", function(err, data){
		console.log("file read");
		console.log(data);
		console.log(data.split(","));
		userInputArray = data.split(",");

		console.log(userInputArray[0]);

		if (userInputArray[0] === "my-tweets") {
			console.log("file says to grab my tweets");
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  if (!error) {
			    // console.log(JSON.stringify(tweets, null, 2));
			    for (var i = 0; i < 20; i ++){
			    	console.log(tweets[i].text);
			    }
			  } else {
			  	console.log("error");
			  	console.log(error);
			  }
			});
		} else if (userInputArray[0] === "spotify-this-song") {
			console.log("file says to grab a song");

			if (userInputArray.length < 2) {
				songName = "The Sign";
			} else {
				userInputString = userInputArray[1];
				for (var i = 2; i < userInputArray.length; i ++) {
					userInputString = userInputString + " " + userInputArray[i];
				}
				songName = userInputString;
			}
		 	console.log("songName = " + songName);
			var queryURL = "https://api.spotify.com/v1/search?query=" + songName + "&type=track&offset=2&limit=2";

			request(queryURL, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			  	console.log(body);
			  	fs.writeFile("outputSpot.js", body, function(err){
			  		if (err) {
			  			console.log("error in writing file");
			  			return;
			  		}
			  	})
			  }
			})

		} else if (userInputArray[0] === "movie-this") {
			if (userInputArray.length < 2) {
				movieName = "Mr. Nobody";
			} else {
				userInputString = userInputArray[1];
				for (var i = 2; i < userInputArray.length; i ++) {
					userInputString = userInputString + " " + userInputArray[i];
				}
				movieName = userInputString;
			}
		 	console.log("movieName = " + movieName);

			// var queryURL = "https://api.spotify.com/v1/search?q=" + songName + "&type=track"
			var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=47aaffc2100101b29b819d304b4a2a0d&query=" + movieName;
			// var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
			console.log(queryURL);

			request(queryURL, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			  	console.log(body);
			  	fs.writeFile("outputmovie.js", body, function(err){
			  		if (err) {
			  			console.log("error in writing file");
			  			return;
			  		}
			  	})
			  } else {
			  	console.log("error with omdb request");
			  	console.log(error);
			  	console.log(response.statusCode);
			  }
			})

		}
	});
}

