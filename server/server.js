var express = require('express');
var path 	= require('path');
var app 	= express();

//Change this!
//START setup parameters 	----------
var mainFolder = "elinda";
var portNumber = 8081;
//End setup parameters 		----------

//start server
app.use(express.static('../'+mainFolder));
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '', 'index.html') );
})

var server = app.listen(portNumber, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})