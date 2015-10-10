var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('projectlist', ['projectlist']);
var bodyParser = require('body-parser');

var braintree = require('braintree');

var dummyClientToken = require('./client-token');

var fs = require('fs');

var angularStr = fs.readFileSync(__dirname + "/node_modules/angular/angular.js", "utf8");
var braintreeAngularStr = fs.readFileSync(__dirname + "/node_modules/braintree-angular/dist/braintree-angular.js", "utf8");


var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "8z89z5gg7zt6x8x8",
  publicKey: "w9kvxgpmbsrf594z",
  privateKey: "cbefff229a42fa94c3138a70584229bf"
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

/****   braintree   *****/

app.get('/client-token', function(req, res) {
  console.log("client-token droping like a bitch");
  gateway.clientToken.generate({}, function (err, response) {
    if (err || !response || !response.clientToken) {
      if (err.name === 'authenticationError') {
        console.error('Please fill in examples/server.js with your credentials from Account->API Keys in your Sandbox dashboard: https://sandbox.braintreegateway.com/');
        console.error('Using a dummy client token... this may or may not work');
        res.send(dummyClientToken);
      } else {
        console.error(err);
        res.send(err);
      }
    } else {
      var clientToken = response.clientToken
      console.log(clientToken);
      res.send(clientToken);
    }
  });
});



app.post('/buy-something', function(req, res) {
  var nonce = req.body.payment_method_nonce;
  console.log("buy-something droping like a bitch");
  console.log(nonce);
  gateway.transaction.sale({
    amount: "1.00",
    paymentMethodNonce: "fake-valid-nonce"
  }, function (err, result) {
    if (err) {
      res.send('error:', err);
    } else {
      res.send('successfully charged $10, check your sandbox dashboard!');
    }
  });
});

/**** end braintree *****/

app.get('/projectlist', function(req, res) {
  console.log("request");

  db.projectlist.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/projectlist', function(req, res) {
  console.log(req.body);
  db.projectlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});


app.delete('/projectlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.projectlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});


app.get('/projectlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  console.log("into server");
  db.projectlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.put('/projectlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(req.body.project_title);
  db.projectlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {project_title: req.body.project_title, project_overview: req.body.project_overview,
      project_content: req.body.project_content, project_private: req.body.project_private}},
    new: true}, function(err, doc) {
    res.json(doc);
  });
});

/*  search  */

var getArrayProjectList = function(overview, cb) {
      db.projectlist.find({} , {project_overview:1,_id:0}).toArray(cb);
  }

app.get('/search/:text', function(req, res) {

  var text = req.params.text;
  console.log(text);
  getArrayProjectList("project_overview", function(err, doc){
                if (err) {
                    console.log(err);
                    return res(err);
                } else {
                    console.log(doc);
                    return res.json(doc);
                }
            });
});

app.listen(3000);
console.log("Server running port 3000");
