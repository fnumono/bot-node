var twilio = require('twilio');

var accountSid = 'ACfb0bd423ddd1c07dc55653cbf2f08761';
var authToken = 'e81f4a2b373746bd148f304eeb1646d5';

var express = require('express');

var app = express();


var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+12345678901',  // Text this number
    from: '+12345678901' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

app.get('/receive', function(req, res){
	res.send('Hi, AssistantBot is listening now');
});

app.post('/receive', function(req,res){
	// var twiml = new twilio.TwimlResponse();
	// twiml.message('Hi, this is the AssistantBot');

	var twiml = new twilio.TwimlResponse();
	var feedback = BotBrains(req.body);
	twiml.message(feedback);

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});

app.listen(process.env.port, function(){
	console.log('AssistantBot listening on port 8080');
});

