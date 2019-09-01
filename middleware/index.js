var Boba = require("../models/boba");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkbobaOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
           Boba.findById(req.params.id, function(err, foundboba){
              if(err){
                  req.flash("error", "boba not found");
                  res.redirect("back");
              }  else {
    
               // Added this block, to check if foundboba exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
               if (!foundboba) {
                       req.flash("error", "Item not found.");
                       return res.redirect("back");
                   }
               // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
               if(foundboba.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
              }
           });
       } else {
           req.flash("error", "You need to be logged in to do that");
           res.redirect("back");
       }
   }

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;