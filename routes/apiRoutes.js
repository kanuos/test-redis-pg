const apiRoutes = require("express").Router();
const {
    getDashboard, 
    newPost,
    editPost,
    deletePost
} = require("../controller/api")

apiRoutes.get("/", getDashboard)

apiRoutes.post("/", newPost)

apiRoutes.post("/edit/:id", editPost)

apiRoutes.post("/delete/:id", deletePost)



module.exports = apiRoutes;