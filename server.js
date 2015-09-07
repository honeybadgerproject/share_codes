var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('projectlist', ['projectlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

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
