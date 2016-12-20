var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req,res) {
	res.send('Hello World! eeee');
});

app.listen(process.env.PORT || 3000,function() {
	console.log('Example app listening on port 3000');
});

app.post('/', function(req,res) {
	res.send('req is', req.body.text);
});