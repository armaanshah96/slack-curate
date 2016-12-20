function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}


var Twitter = require('twitter');
var request = require('request');
var getTweet = function(handle) {
	var params = {
		screen_name: handle.substr(1),
		count:200,
		exclude_replies: true
	};
	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_TOKEN,
		access_token_secret: process.env.TWITTER_TOKEN_SECRET
	});
	client.get('statuses/user_timeline', params, function(error,tweets,response) {
		if(!error) {
			var yesterdayTweets = tweets.filter(yesterday);
			if(yesterdayTweets.length === 0) {
				return '@' + handle + ' has not posted any tweets in the last day.';
			}
			console.log("are we getting to past yesterday?,", yesterday.length);
			var result = best(yesterdayTweets);
			console.log("just finished gathering results", result);
			return result;
		}
		else {
			console.log('udh oh', error);
			return false;
		}
	});
}

var yesterday = function(tweet) {
	var today = new Date()
	var yesterday = new Date(today.setDate(today.getDate()-1));
	var created = new Date(Date.parse(tweet.created_at));
	if(created.toDateString() === yesterday.toDateString()) {
		return true;
	}
	return false;
}

var best = function(tweets){
	var bestTweet = tweets[0].text;
	var maxFavs = tweets[0].favorite_count;
	for(var j=1; j < tweets.length; j++) {
		if(maxFavs < tweets[j].favorite_count) {
			bestTweet = tweets[j].text;
			maxFavs = tweets[j].favorite_count;
		}
	}
	console.log("THE best, ",bestTweet);
	console.log("THE best has ", maxFavs);
	console.log(typeof(bestTweet));
	return bestTweet;
}
var response_url = "https://hooks.slack.com/commands/T1LCXKPBR/119414962322/zCDTOkwdyi5JJ83urkazQibj"
var options = {
			url: response_url,
    		method: 'POST',
    		contentType: 'application/json',
    		json: {"text":"hi"}
		}
request(options, function(error, response, body){
    		if(error) {
        		console.log(error);
		    } else {
        		console.log(response.statusCode, body);
			}
		});

// handleNames = ['cnn'];

// handleNames.forEach(function(handle) {
// 	console.log('wait', handle);
// 	console.log(getTweet(handle));
// });

