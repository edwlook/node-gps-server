
/**
 * Module dependencies.
 */

var express = require('express'),
	voicejs = require('voice.js'),
	http = require('http');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/', function(req, res) {
	var client = new voicejs.Client({
	email: process.argv[2] || 'elook88@gmail.com',
	password: process.argv[3] || '888carfuel',
	//tokens: require('./tokens.json')
	});


	var text = process.argv[4] || 'https://maps.google.com/maps?q=' + req.body.latitude + '+' + req.body.longitude;
	var to = process.argv.slice(5).length ?  process.argv.slice(5) : [req.body.number];


	// There are two ways to send texts. 

	// The first method returns the new conversation id, but doesn't allow sending to multiple recipients
	client.sms({ to: to[0], text: text}, function(err, res, data){
		if(err){
			return console.log(err);
		}
		console.log('SMS "' +text+ '" sent to', to[0] + '. Conversation id: ', data.send_sms_response.conversation_id);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});