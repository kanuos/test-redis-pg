const accountRoutes = require("express").Router();
const {
    getLoginForm, 
    getRegisterForm,
    submitLoginData,
    submitRegisterData,
    logout
} = require("../controller/login")
const  { onlyPublicRoute, privateRoute } = require("../sessionMiddleware")

accountRoutes.get("/",onlyPublicRoute, getLoginForm)

accountRoutes.get("/register",onlyPublicRoute, getRegisterForm)

accountRoutes.post("/login",onlyPublicRoute, submitLoginData)

accountRoutes.post("/register", onlyPublicRoute, submitRegisterData)

accountRoutes.get("/logout", privateRoute, logout)



module.exports = accountRoutes;