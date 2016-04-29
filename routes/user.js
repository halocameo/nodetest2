var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/list');
});


/* GET Userlist page. */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            'userlist' : docs
        });
    });
});

/* GET New User page. */
router.get('/new', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* GET Specific User page. */
router.get('/:id', function(req, res) {
  console.log('Getting user profile: ' + req.params.id);
  var id = req.params.id;
  var db = req.db;
  var collection = db.get('usercollection');
  var search = { "_id": id};
  collection.find(search, {}, function(e, docs) {
    console.log(docs);
    res.render('userprofile',
      {'userlist': docs });
  });
});

/* POST to Add User Service */
router.post('/add', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var fname = req.body.fname;
    var lname = req.body.lname;
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var addstreet = req.body.addstreet;
    var addcity = req.body.addcity;
    var addstate = req.body.addstate;
    var addzip = req.body.addzip;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        'fname': fname,
        'lname': lname,
        'username': userName,
        'email': userEmail,
        'addstreet': addstreet,
        'addcity': addcity,
        'addstate': addstate,
        'addzip': addzip
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            console.log('we are about to redirect to ' + doc._id);
            res.redirect(doc._id);
        }
    });
});

module.exports = router;