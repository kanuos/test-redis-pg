const accountRoutes = require("express").Router();
const {
    getLoginForm, 
    getRegisterForm,
    submitLoginData,
    submitRegisterData,
    logout
} = require("../controller/login")

accountRoutes.get("/", getLoginForm)

accountRoutes.get("/register", getRegisterForm)

accountRoutes.post("/login", submitLoginData)

accountRoutes.post("/register", submitRegisterData)

accountRoutes.get("/logout", logout)



module.exports = accountRoutes;