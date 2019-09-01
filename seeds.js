var mongoose = require("mongoose");
var Boba = require("./models/boba");
var Comment   = require("./models/comment");

var seeds = [
    {
        name: "Share-tea drink", 
        image: "https://cdn1.gbot.me/photos/Fx/pV/1520233399/-Postcard_of_Sharetea-20000000016235728-375x500.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Another-drink", 
        image: "https://bestrecipebox.com/images/Boba-Thai-Tea-4.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Random Drink", 
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/NPkY17-JXcGizhHYjks4YQ/o.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB(){
    Boba.deleteMany({},function(err){

    });
};
// async function seedDB(){
//     try {
//         await Boba.deleteMany({});
//         console.log('Bobas removed');
//         await Comment.deleteMany({});
//         console.log('Comments removed');

//         for(const seed of seeds) {
//             let boba = await Boba.create(seed);
//             console.log('Boba created');
//             let comment = await Comment.create(
//                 {
//                     text: 'This place is great, but I wish there was internet',
//                     author: 'Homer'
//                 }
//             )
//             console.log('Comment created');
//             boba.comments.push(comment);
//             boba.save();
//             console.log('Comment added to boba');
//         }
//     } catch(err) {
//         console.log(err);
//     }
// }

module.exports = seedDB;
