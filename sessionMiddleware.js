exports.privateRoute = function (req, res, next) {
    const activeUser = req.session?.activeUser
    if (!activeUser) {
        const options = {
            title : "My To-Do | Login",
            err: "You need to log in to access this route"
        }
        return res.render("pages/landing", options)
    }
    next();
}


exports.onlyPublicRoute = function(req, res, next) {
    const activeUser = req.session?.activeUser
    if (activeUser) {
        return res.redirect("/api")
    }
    next();
}