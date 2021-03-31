// environmental variables config
require("dotenv").config();

// dependencies
const express = require("express");
const session = require("express-session");
const favicon = require("express-favicon");
const path = require("path")

// creating the app 
const app = express();

// connecting to the database
require("./database");


const loginRouter = require("./routes/loginRoutes")
const apiRouter = require("./routes/apiRoutes")

app.set("views", "views")
app.set("view engine", "ejs")
app.use(favicon(__dirname + "/static/icon.png"))
app.use(express.static(path.join(__dirname, "static")))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(session({
    secret: process.env.SESS_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true,
        sameSite : true
    },
    // store: {}
}))

app.use("/", loginRouter)
app.use("/api", apiRouter)


app.listen(3000)