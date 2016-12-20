
var Twitter = require('twitter');

const SLACK_TOKEN = process.env.TOKEN;
const SLACK_CLIENT_ID = process.env.CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.CLIENT_SECRET;
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const TWITTER_TOKEN = process.env.TWITTER_TOKEN;
const TWITTER_TOKEN_SECRET = process.env.TWITTER_TOKEN_SECRET;

// Given a list of names and a callback
// Callback array of most favorited tweets
var inputCurator = function(handleNames, callback) {
	var mostFavorited = {
		"handles": []
	};
	var bestTweet = "";
	var counter = 0;
	handleNames.forEach(function(handle) {
		bestTweet = getTweet(handle, function(result,timestamp,link_str,error) {
			user = {
				"key": handle
			};
			if(result) {
				user.result = result;
				user.timestamp = timestamp;
				user.link = link_str;
				mostFavorited.handles.push(user);
				if(++counter === handleNames.length) {
					callback(mostFavorited);
				}

			}
			else {
				user.result = "Something went wrong when requesting this handle\'s recent tweets (most likely due to spelling or account privacy).";
				mostFavorited.handles.push(user);
				if(++counter === handleNames.length) {
					callback(mostFavorited);
				}
			}
		});
	});
}

var getTweet = function(handle, callback) {
	// handles that start with @ symbol are stripped to just username
	if(handle.charAt(0) === '@') {
		handle = handle.substr(1);
	}
	// paramaters 200 past tweets at handle
	var params = {
		screen_name: handle,
		count:200,
		exclude_replies: true
	};

	// configuring authenticatio -- setup config variables in Heroku or in .env file
	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_TOKEN,
		access_token_secret: process.env.TWITTER_TOKEN_SECRET
	});

	// receive tweets from handle timeline
	client.get('statuses/user_timeline', params, function(error,tweets,response) {
		// if GET request is successful
		if(!error) {
			// filter only tweets created yesterday
			var yesterdayTweets = tweets.filter(yesterday);

			// if no tweets made
			if(yesterdayTweets.length === 0) {
				var result = '@' + handle + ' has not posted any tweets in the last day.';
				callback(result);
			}
			else {

				// otherwise get the most favorited tweet from yesterday
				var [result,timestamp,link_str] = best(yesterdayTweets);
				callback(result,timestamp,link_str);
			}

			
		}
		// if request is unsuccessful
		else {
			console.log('uh oh', error);
			callback(false);
		}
	});
}

// Given a single tweet 
// Return true if yesterday, false otherwise
var yesterday = function(tweet) {
	var today = new Date()
	var yesterday = new Date(today.setDate(today.getDate()-1));

	// creating Date object from twitter created_at param
	var created = new Date(Date.parse(tweet.created_at));

	// check if created_at Date and yesterday match
	return(created.toDateString() === yesterday.toDateString() ? true : false);
}

// Given a list of tweets
// Return the text of the single best tweet
var best = function(tweets){
	// keep the text of the best tweet
	var bestTweet = tweets[0].text;
	var timestamp = tweets[0].created_at;
	var link = tweets[0].id_str;

	// score based on weigth with retweet and favorites of the best tweet
	var score = tweets[0].favorite_count + (tweets[0].retweet_count * 2);
	
	// for every tweet compare and update maxFavs 
	for(var j=1; j < tweets.length; j++) {
		var newScore = tweets[j].favorite_count + (tweets[0].retweet_count * 2);
		if(score < newScore) {
			bestTweet = tweets[j].text;
			timestamp = tweets[j].created_at;
			link = tweets[j].id_str;
			score = newScore;
		}
	}

	timestamp = new Date(Date.parse(timestamp)).getTime();
	return [bestTweet,timestamp,link];
}

module.exports = inputCurator;