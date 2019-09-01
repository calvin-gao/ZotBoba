var express = require("express");
var router  = express.Router({mergeParams: true});
var Boba = require("../models/boba");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find boba by id
    console.log(req.params.id);
    Boba.findById(req.params.id, function(err, boba){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {boba: boba});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup boba using ID
   Boba.findById(req.params.id, function(err, boba){
       if(err){
           console.log(err);
           res.redirect("/bobas");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
            req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               boba.comments.push(comment);
               boba.save();
               console.log(comment);
               req.flash("success", "Successfully created comment");
               res.redirect('/bobas/' + boba._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {boba_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/bobas/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
            req.flash("success","Comment deleted");
           res.redirect("/bobas/" + req.params.id);
       }
    });
});

module.exports = router;