const apiRoutes = require("express").Router();
const {
    getDashboard, 
    newPost,
    editPost,
    deletePost,
    getEditPage
} = require("../controller/api")

apiRoutes.get("/", getDashboard)

apiRoutes.post("/", newPost)

apiRoutes.get("/edit/:id", getEditPage)

apiRoutes.post("/edit/:id", editPost)

apiRoutes.post("/delete/:id", deletePost)



module.exports = apiRoutes;