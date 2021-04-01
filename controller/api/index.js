const pool = require("../../database");

exports.getDashboard = async function(req, res) {
    try {
        const {id} = req.session?.activeUser;
        const todos = await getActiveUserToDos(id) ?? [];
        const options = {
            title : "My To-Do | Dashboard",
            articles : todos,
            err : todos.length !== 0 ? null : "no todos found by user"
        }
        return res.render("pages/dashboard", options)
    }
    catch(err){
        console.log("get todos ",err);
    }
}

exports.newPost = async function(req, res) {
    try {
        const {id} = req.session?.activeUser;
        if (!("title" in req.body) || !("content" in req.body)) {
            throw Error("title and content required")
        }
        let {title, content} = req.body;
        title = title.trim(), content = content.trim();

        if (title?.length === 0){
            throw Error("title cannot be empty")
        }

        if (content?.length === 0){
            throw Error("content cannot be empty")
        }

        // sanitized data
        const {rows} = await pool.query(`INSERT INTO todos (title, content) VALUES ($1, $2) RETURNING *`, [title,content])

        await pool.query("INSERT INTO todo_user (u_id, t_id) VALUES ($1, $2)", [id, rows[0].tid]);
        return res.redirect(301, "/api")
    }
    catch(err) {
        const {id} = req.session?.activeUser;
        const todos = await getActiveUserToDos(id) ?? [];
        const options = {
            title : "My To-Do | Dashboard",
            articles : todos,
            err : err.message
        }
        return res.render("pages/dashboard", options)
    }
}

exports.editPost = function(req, res) {

}

exports.deletePost = function(req, res) {

}


async function getActiveUserToDos(id){
    try {
        const {rows} = await pool.query("SELECT * FROM todos INNER JOIN todo_user ON todos.tid = todo_user.t_id WHERE todo_user.u_id = $1", [id]);
        rows?.forEach(row => {
            row.timestamp = timestampToDateString(row.timestamp);
        })
        return rows;
    }
    catch(err){
        console.log(err.message);
    }
}


function timestampToDateString(date){
    return new Date(date)?.toDateString();
}