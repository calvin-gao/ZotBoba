var express = require("express");
var router  = express.Router();
var Boba = require("../models/boba");
var middleware = require("../middleware");


//INDEX - show all bobas
router.get("/", function(req, res){
    // Get all bobas from DB
    Boba.find({}, function(err, allBobas){
       if(err){
           console.log(err);
       } else {
          res.render("bobas/index",{bobas:allBobas});
       }
    });
});

//CREATE - add new Boba to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBoba = {name: name, image: image, description: desc, author:author}
    // Create a new Boba and save to DB
    Boba.create(newBoba, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to bobas page
            console.log(newlyCreated);
            res.redirect("/bobas");
        }
    });
});

//NEW - show form to create new boba
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("bobas/new"); 
});

// SHOW - shows more info about one boba
router.get("/:id", function(req, res){
    //find the Boba with provided ID
    Boba.findById(req.params.id).populate("comments").exec(function(err, foundboba){
        if(err){
            console.log(err);
        } else {
            console.log(foundboba);
            //render show template with that boba
            res.render("bobas/show", {boba: foundboba});
        }
    });
});

// EDIT Boba ROUTE
router.get("/:id/edit", middleware.checkbobaOwnership, function(req, res){
    Boba.findById(req.params.id, function(err, foundboba){
        res.render("bobas/edit", {boba: foundboba});
    });
});

// UPDATE Boba ROUTE
router.put("/:id",middleware.checkbobaOwnership, function(req, res){
    // find and update the correct boba
    Boba.findByIdAndUpdate(req.params.id, req.body.boba, function(err, updatedboba){
       if(err){
           res.redirect("/bobas");
       } else {
           //redirect somewhere(show page)
           res.redirect("/bobas/" + req.params.id);
       }
    });
});

// DESTROY Boba ROUTE
router.delete("/:id",middleware.checkbobaOwnership, function(req, res){
   Boba.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/bobas");
      } else {
          res.redirect("/bobas");
      }
   });
});


module.exports = router;