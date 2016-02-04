var express = require('express');

module.exports = {

  var app = express.Router();


  /**** start collaborators section ****/

  app.post('/contributorslistowner', function(req, res) {

    console.log(req.body.project_id);
    console.log(req.body.user_owner);
    var id = req.body.user_owner;
    var id2 = req.body.project_id;

    dbctr.contributorslist.find({ "user_owner": id , "id_project": id2} , function(err, docs) {
      console.log("request for contributors");
      console.log(docs);
      res.json(docs);
    });
  });

  app.post('/contributorslist', function(req, res) {
    console.log(req.body);
    db.projectlist.update({"_id" : req.body.id_project } ,
                                  { $push: { "user_owner": req.body.linkContributor  }} ,
                                function(err, doc) {
                                    res.json(doc);
                                  });
  /*  dbctr.contributorslist.insert(req.body, function(err, doc) {
      res.json(doc);
    });*/
  });


  app.delete('/contributorslist/:id', function(req, res) {
    /*var id = req.params.id;
    console.log(id);
    db.projectlist.remove({"_id" : req.body.id_project } ,
                                  { $pull: { "user_owner": linkContributor  }} ,
                                function(err, doc) {
                                    res.json(doc);
                                  });*/
  });


  /**** start resource section ****/

  app.post('/resourcelistowner', function(req, res) {
    console.log("request");
    var id = req.body.user_owner;
    var id2 = req.body.project_id;

    dbsrc.resourcelist.find( { "user_owner": id , "id_project": id2 } , function(err, docs) {
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

  app.post('/notelistowner', function(req, res) {
    console.log("request");
    var id = req.body.user_owner;
    var id2 = req.body.project_id;

    dbtab.notelist.find( { "user_owner": id, "id_project": id2} , function(err, docs) {
      console.log(docs);
      res.json(docs);
    });
  });

  app.post('/notelist', function(req, res) {
    console.log(req.body);
    dbtab.notelist.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });


  app.delete('/notelist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    dbtab.notelist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
  });

  app.get('/notelist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    console.log("into server");
    dbtab.notelist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
  });

  app.put('/notelist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.tab_name);
    dbtab.notelist.findAndModify({query: {_id: mongojs.ObjectId(id)},
      update: {$set: {user_owner: req.body.user_owner, id_tab: req.body.id_tab,
        tab_name: req.body.tab_name, tab_content: req.body.tab_content}},
      new: true}, function(err, doc) {
      res.json(doc);
    });
  });


  /**** start tab private section ****/

  app.post('/notelistownerprivate/:listParams', function(req, res) {
    var id = req.body.user_owner;
    var id2 = req.body.project_id;

    dbtabprivate.notelistprivate.find( { "user_owner": id , "id_project": id2} , function(err, docs) {
      console.log(docs);
      res.json(docs);
    });
  });

  app.post('/notelistprivate', function(req, res) {
    console.log(req.body);
    dbtabprivate.notelistprivate.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });


  app.delete('/notelistprivate/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    dbtabprivate.notelistprivate.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
  });

  app.get('/notelistprivate/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    console.log("into server");
    dbtabprivate.notelistprivate.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
      res.json(doc);
    });
  });

  app.put('/notelistprivate/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.tab_name);
    dbtabprivate.notelistprivate.findAndModify({query: {_id: mongojs.ObjectId(id)},
      update: {$set: {user_owner: req.body.user_owner, id_tab: req.body.id_tab,
        tab_name: req.body.tab_name, tab_content: req.body.tab_content}},
      new: true}, function(err, doc) {
      res.json(doc);
    });
  });



};
