// environmental variables config
require("dotenv").config();

// dependencies
const express = require("express");
const session = require("express-session");
const favicon = require("express-favicon");
const path = require("path");
const compression = require("compression");
const redisClient = require("redis").createClient();
const RedisStore = require("connect-redis")(session);

// creating the app 
const app = express();

// connecting to the database
require("./database");


const loginRouter = require("./routes/loginRoutes")
const apiRouter = require("./routes/apiRoutes")
const { privateRoute } = require("./sessionMiddleware");

app.set("views", "views")
app.set("view engine", "ejs")
app.use(compression())
app.use(favicon(__dirname + "/static/icon.png"))
app.use(express.static(path.join(__dirname, "static")))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(session({
    secret: process.env.SESS_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 60 * 1000,
        httpOnly : true,
        sameSite : true
    },
    store: new RedisStore({
        client : redisClient,
        url : process.env.REDIS_URL
    })
}))

app.use("/", loginRouter)
app.use("/api", privateRoute ,apiRouter)


app.listen(3000)