//module.exports = {

  /**** start projects section ****/
  var mongojs = require('mongojs');
  var db = mongojs('projectlist', ['projectlist']);

  exports.setProjectList = function(app) {
//  app.get('/refreshProjectWithUser', function(req, res) {
 app.get('/refreshProjectList', function(req, res) {
  //  var id = req.params.id;

    console.log("id test");

  /*  db.projectlist.find({ "user_owner": id} , function(err, docs) {
      console.log(docs);
      res.json(docs);
    });*/

  });
};

/*
  appProjectList.post('/projectlist', function(req, res) {
    console.log(req.body);
    db.projectlist.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });


  appProjectList.delete('/projectlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.projectlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
  });


  appProjectList.get('/projectlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    console.log("into server");
    db.projectlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
  });

  appProjectList.put('/projectlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.project_title);
    db.projectlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
      update: {$set: {project_title: req.body.project_title, project_overview: req.body.project_overview,
        project_content: req.body.project_content, project_private: req.body.project_private,
        project_price: req.body.project_price, project_last_update: req.body.project_last_update}},
      new: true}, function(err, doc) {
      res.json(doc);
    });
  }); */

//};
