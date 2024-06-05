const mysql = require("mysql");
const map = require("./map");

let conn;

function initDbConnection() {
    if (!conn) {
        conn = mysql.createConnection({
            user: "root",
            host: "localhost",
            database: "project",
            password: " "
        });

        conn.connect((err) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return;
            }
            console.log("Connected to the database!");
        });
    }
    return conn;
}

function sayhi(req, res, next) {
    if (!conn) {
        initDbConnection();
    }
    next();
}

function middle2(req, res, next) {
    const id = req.cookies.id;
    if (!id || (id && !map.getUser(id))) {
        return res.render("login");
    }
    next();
}

module.exports = { sayhi, middle2, initDbConnection, conn: initDbConnection() };
