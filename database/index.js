const {Pool} = require("pg");

const pool = new Pool({
    database : process.env.DATABASE,
    port : process.env.PORT,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
})

async function initDB(){
    try {
        // connect to database
        await pool.connect();
        // create user table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                uid BIGSERIAL PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL);`);
        console.log("usertable created");
        // create todo table
        await pool.query(`
                CREATE TABLE IF NOT EXISTS todos (
                    tid BIGSERIAL PRIMARY KEY NOT NULL,
                    title VARCHAR(150) NOT NULL,
                    content TEXT NOT NULL,
                    timestamp DATE DEFAULT CURRENT_DATE);`)
        console.log("todoTable creted");
    }
    catch(err){
        console.log(err);
    }

}

initDB();

module.exports = pool