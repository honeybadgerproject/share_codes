var express = require('express');

module.exports = {

  var app = express.Router();

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

};
