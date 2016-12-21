var express = require('express');
var bodyParser = require('body-parser');
var curator = require('./curator');
var request = require('request');
var _ = require('underscore');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000,function() {
	console.log('curate listening on port 3000');
});

app.get('/authorize', function(req, res){
	var data = {
		form: {
			client_id: process.env.SLACK_CLIENT_ID,
			client_secret: process.env.SLACK_CLIENT_SECRET,
			code: req.query.code
		}
	};
	request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// If you want to get team info, you need to get the token here
			let token = JSON.parse(body).access_token; // Auth token
		}
	});
	request.post('https://slack.com/api/team.info', {form: {token: token}},function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let team = JSON.parse(body).team.domain;
			res.redirect('http://' +team+ '.slack.com');
		}
	});
}

app.post('/', function(req,res) {
	// ensure that this command came from slack, and if not don't do anything
	if(process.env.SLACK_TOKEN !== req.body.token) return;

	// check if exceeds max 20 twitter handles
	names = req.body.text.split(" ");
	var names = _.without(names, ''); // removing any string splits on extra whitespace

	if(names.length > 20) {
		res.send({
		  "response_type": "ephemeral",
		  "text": "Try to keep it bite sized! Also slack allows 20 attachments, so keep it at most 20!"
		});
		return;
	}


	// check if user is asking for help
	if(names[0].toLowerCase() === 'help') {
		helpMessage = {
			"text": "Get yesterday's highlights in bite-size. Example command: /curate @cnn @elonmusk @espn @spacex\n This will return the most popular tweet (using number favorites and retweets) from yesterday per handle.\nPlease limit to a maximum of 20 twitter handles "
		}
		res.send(helpMessage);
		return;
	}

	var response_url = req.body.response_url;
	// send confirmation bc a delayed post will be needed
	res.writeHead(200);
	res.end("Got it! I\'ll be right back :bowtie:");

	// colors
	var color = true;
	var blue = "#1da1f2";
	var purple = "#443642";

	// prepare delayed post request
	curator(names, function(result) {

		// preparing message to post
		var message = {
			"response_type": "in_channel",
			"text": "*Yesterday's Highlights*",
			"attachments": []
		}
		
		// add each handle as an attachment
		result.handles.forEach(function(handle) {			
			var attachment = {};

			// record twitter handle
			if(handle.key.charAt(0) === '@') 
				attachment.title = handle.key;
			else
				attachment.title = '@' + handle.key;

			// create linkable title
			attachment.title_link = 'https://twitter.com/statuses/' + handle.link;
			
			// record tweet
			attachment.text = handle.result;

			// twitter blue or slack purple
			attachment.color = color === true ? blue : purple;
			color = !color;

			// attachment.mrkdwn_in = ["title"];

			// add timestamp, but fix formatting 
			// attachment.ts = handle.timestamp;

			// add attachment to message array
			message.attachments.push(attachment);
		});

		// prepare post request fields
		var options = {
			url: response_url,
    		method: 'POST',
    		contentType: 'application/json',
    		json: message
		}

		request(options, function(error, response, body){
    		if(error) {
        		console.log(error);
		    } else {
        		console.log(response.statusCode, body);
			}
		});
	});
});

