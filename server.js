var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//var projectlist = require('projectlist');

app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());

/********  models *********/


var projectlist = require('./market-codes/projectlist').setProjectList(app);

/**************************/

app.listen(3000);
console.log("Server running port 3000");
