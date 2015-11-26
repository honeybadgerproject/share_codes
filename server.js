var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('projectlist', ['projectlist']);
var dbctr = mongojs('contributorslist', ['contributorslist']);
var dbsrc = mongojs('resourcelist', ['resourcelist']);
var dbtab = mongojs('tablist', ['tablist']);
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



/**** start collaborators section ****/

app.get('/contributorslistowner/:id', function(req, res) {
  console.log("request");
  var id = req.params.id;

  dbctr.contributorslist.find({ "user_owner": id} , function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contributorslist', function(req, res) {
  console.log(req.body);
  dbctr.contributorslist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});


app.delete('/contributorslist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  dbctr.contributorslist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});


/**** start resource section ****/

app.get('/resourcelistowner/:id', function(req, res) {
  console.log("request");
  var id = req.params.id;

  dbsrc.resourcelist.find( { "user_owner": id} , function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/resourcelist', function(req, res) {
  console.log(req.body);
  dbsrc.resourcelist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});


app.delete('/resourcelist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  dbsrc.resourcelist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

/**** start tab section ****/

app.get('/tablistowner/:id', function(req, res) {
  console.log("request");
  var id = req.params.id;

  dbtab.tablist.find( { "user_owner": id} , function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/tablist', function(req, res) {
  console.log(req.body);
  dbtab.tablist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});


app.delete('/tablist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  dbtab.tablist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('/tablist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  console.log("into server");
  dbtab.tablist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.put('/tablist/:id', function(req, res) {
  var id = req.params.id;
  console.log(req.body.tab_name);
  dbtab.tablist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {user_owner: req.body.user_owner, id_tab: req.body.id_tab,
      tab_name: req.body.tab_name, tab_content: req.body.tab_content}},
    new: true}, function(err, doc) {
    res.json(doc);
  });
});

/**** start projects section ****/

app.get('/refreshProjectWithUser/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);

  db.projectlist.find({ "user_owner": id} , function(err, docs) {
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
      project_content: req.body.project_content, project_private: req.body.project_private,
      project_price: req.body.project_price, project_last_update: req.body.project_last_update}},
    new: true}, function(err, doc) {
    res.json(doc);
  });
});

/*  search  */

var getArrayProjectList = function(overview, cb) {
  db.projectlist.find({} , {project_overview:1, project_title:1, project_content:1, project_price:1, _id:1}).toArray(cb);
      /*db.projectlist.find({} , {project_overview:1,_id:0}).toArray(cb);*/
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
