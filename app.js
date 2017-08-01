var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var labRouter = require('./routes/labRouter');

app.use(bodyParser.json());
app.listen(3000,function(){
	console.log("Listening");
});

app.use('/',labRouter);