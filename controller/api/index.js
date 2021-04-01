const pool = require("../../database");

exports.getDashboard = async function(req, res) {
    try {
        const {id} = req.session?.activeUser;
        const todos = await getActiveUserToDos(id) ?? [];
        const options = {
            title : "My To-Do | Dashboard",
            articles : todos,
            todoTitle : "",
            todoContent : '',
            error : todos.length !== 0 ? null : "no todos found by user",
            url : undefined
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
            error : err.message,
            todoTitle : "",
            todoContent : '',
            url : undefined
        }
        return res.render("pages/dashboard", options)
    }
}

exports.getEditPage = async function(req, res) {
    const {id} = req.params;
    try {
        const rows = await getActiveUserToDos(req.session.activeUser.id);
        const article = rows?.find(row => row.tid === id);
        const options = {
            title : "My To-Do | Dashboard",
            articles : rows,
            todoTitle : article.title,
            todoContent : article.content,
            error : rows.length !== 0 ? null : "no todos found by user",
            url : `/api/edit/${article.tid}`
        }
        return res.render("pages/dashboard", options)
    }
    catch(err) {
        console.log(err);
        return res.redirect("/api")
    }
}

exports.editPost = async function(req, res) {
    try {
        const {title, content} = req.body;
        await pool.query(`UPDATE todos SET title = $1, content = $2 WHERE tid = $3`, [title, content, req.params.id]);
        return res.redirect("/api");
    }
    catch(err){
        console.log(err);
        return res.redirect("/api");
    }
}

exports.deletePost = async function(req, res) {
    const {id} = req.params;
    const userID = req.session.activeUser.id;
    console.log(`delete todo #${id} by author #${userID}`);
    try {
        await pool.query(`DELETE FROM todos WHERE tid = (SELECT tid FROM todos INNER JOIN todo_user ON todos.tid = todo_user.t_id  WHERE tid = $1 AND todo_user.u_id = $2)` , [id, userID])
        return res.redirect(302, "/api")
    }
    catch(err) {
        console.log(err);
        return res.status(400).json(err);
    }
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
        return [];
    }
}

function timestampToDateString(date){
    return new Date(date)?.toDateString();
}