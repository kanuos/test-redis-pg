const bcrypt = require("bcryptjs");
const pool = require("../../database");

exports.getLoginForm = function(req, res) {
    const options = {
        title : "My To-Do | Login", err : null
    }
    return res.render("pages/landing", options)
}

exports.getRegisterForm = function(req, res) {
    const options = {
        title : "My To-Do | Register", err : null
    }
    return res.render("pages/register", options)
}

exports.submitLoginData = async function(req, res) {
    try {
        // sanitize req.body
        if (!("username" in req.body) || !("password" in req.body)){
            throw TypeError("username and password require")
        }
        const {password, username} = req.body;
        if (username?.trim().length == 0){
            throw TypeError("username cannot be empty")
        }
        if (password?.trim().length == 0){
            throw TypeError("password cannot be empty")
        }
        // check if username exists in db
        const {rows} = await pool.query(`SELECT * FROM users WHERE username = $1`, [username.trim()]);
        if (rows.length === 0){
            throw Error("user not found")
        } 
        const user = rows[0];
        // check if username password combination is correct
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword){
            throw Error("invalid login credentials")
        }
        // valid user
        req.session.activeUser = {
            id : user.uid,
            username : user.username
        }
        return res.redirect("/api");
    }
    catch(err) {
        const options = {
            title : "My To-Do | Login", err : err.message
        }
        return res.render("pages/landing", options)
    }
}

exports.submitRegisterData = async function(req, res) {
    try {
        // sanitize req.body
        if (!("username" in req.body) || !("password" in req.body) || !("name" in req.body)){
            throw TypeError("name, username and password are required")
        }
        const {password, username, name} = req.body;
        if (name?.trim().length == 0){
            throw TypeError("name cannot be empty")
        }
        if (username?.trim().length == 0){
            throw TypeError("username cannot be empty")
        }
        if (password?.trim().length == 0){
            throw TypeError("password cannot be empty")
        }
        // check if username exists in db
        const {rows} = await pool.query(`SELECT * FROM users WHERE username = $1`, [username.trim()]);
        if (rows.length !== 0){
            throw Error("username already taken")
        } 
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const valuesArray = [name, username, hashedPassword];
        await pool.query("INSERT INTO users (name, username, password) VALUES ($1,$2,$3)", valuesArray);
        return res.redirect("/");
    }
    catch(err) {
        const options = {
            title : "My To-Do | Login", err : err.message
        }
        return res.render("pages/register", options)
    }
}

exports.logout = async function(req, res) {
    try {
        req.session.destroy()
        return res.redirect("/")
    }   
    catch(err){
        console.log(err);
        return res.redirect("/api")
    } 
}
