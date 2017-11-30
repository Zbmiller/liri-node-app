var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var consumerKey = twitterKeys.consumer_key;
var consumerSecret = twitterKeys.consumer_secret;
var accessKey = twitterKeys.access_token_key;
var accessSecret = twitterKeys.access_token_secret;

var arg = process.argv[2];
var type = process.argv[3];



// ======================================== TWITTER =====================================
if (arg === 'my-tweets') {
    searchTwitter();
}

function searchTwitter(arg, type) {
    // Call to Twitter
    var client = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token_key: accessKey,
        access_token_secret: accessSecret
    });

    var params = { screen_name: 'zbeemillz' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        for (i = 0; i < tweets.length; i++) {
            console.log('Tweet: ' + tweets[i].text + '\nTime: ' + tweets[i].created_at);
        }
    });
    return;
}

// ============================================= SPOTIFY ======================================
if (arg === 'spotify-this-song' && type === undefined) {
    searchSpotify(arg, 'The Sign');
}
else if (arg === 'spotify-this-song') {
    searchSpotify(arg, type);
}

function searchSpotify(arg, type) {
  
  var spotify = new Spotify({
  id: 'ea2bfc511f1a46c6957bfc92fc5f1798',
  secret: '114fedf7170b401f8abeb599715f7f80'
});
   spotify.search({ type: 'track', query: type, limit: 3 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        for (i = 0; i < data.tracks.items.length; i++) {
            console.log('Artist: ' + data.tracks.items[i].artists[0].name);
            console.log('Name: ' + data.tracks.items[i].name);
            console.log('URL: ' + data.tracks.items[i].preview_url);
            console.log('Album: ' + data.tracks.items[i].album.name);
            console.log('<-------------------------------------->\n<-------------------------------------->');

        }
    });
    return;
}

// ========================================= OMDB ==============================================
if (arg === 'movie-this') {
    searchOmdb(arg, type);
}

function searchOmdb(arg, type) {
    // var request = require('request');
    request('http://www.omdbapi.com/?apikey=e5a2fa81&t=' + type + '&tomatoes=true', function(error, response, body) {
        var movie = JSON.parse(body);
        console.log('Title: ' + movie.Title);
        console.log('Year: ' + movie.Year);
        console.log('IMDB Rating: ' + movie.imdbRating);
        console.log('Country: ' + movie.Country);
        console.log('Language: ' + movie.Language);
        console.log('Plot: ' + movie.Plot);
        console.log('Actors: ' + movie.Actors);
        console.log('Rotten Tomatoes: ' + movie.tomatoURL);
    });
}


// FS
if (arg === 'do-what-it-says') {
    readTxt();
}

function readTxt(arg, type) {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        console.log(dataArr);

        arg = dataArr[0];
        type = dataArr[1];
        searchSpotify(arg, type);
    });
    return;
}
