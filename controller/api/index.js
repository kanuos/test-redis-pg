const pool = require("../../database");

exports.getDashboard = async function(req, res) {
    const options = {
        title : "My To-Do | Dashboard",
        articles : [1,2,3]
    }
    return res.render("pages/dashboard", options)
}

exports.newPost = async function(req, res) {
    try {
        
    }
    catch(err) {

    }
}

exports.editPost = function(req, res) {

}

exports.deletePost = function(req, res) {

}