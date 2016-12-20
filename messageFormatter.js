
var createMessage = function(slackTweets,callback) {
	var message = "";
	var counter = 0;
	var length = Object.keys(slackTweets).length;
	console.log("length of result is",length);
	for(var i = 0; i < length; i++) {
		var key = Object.keys(slackTweets)[i];
		var username = key + ": ";
		var message = "\n" + message + username + "\n" + slackTweets[key] + "\n";
		if(++counter === length) {
			console.log("counter reached the length amount and callback is due now");
			callback(message);
		}
	}
}

module.exports = createMessage;