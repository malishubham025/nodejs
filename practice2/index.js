// const express =require("express");
// const app=express();
// const mysql=require("mysql");
// const {v4:uuidv4, v4}=require("uuid");
// const {handlelogin}=require("./handlelogin");
// const coockieParser=require("cookie-parser");
// app.use(coockieParser());
// app.set("view engine","ejs");

// const conn=require("./connection");
// const bodyParser=require('body-parser');

// const {getUser,setUser}=require("./map");
// app.use(bodyParser.urlencoded({extended:true}));

// app.get("/",(req,res)=>{
//     res.render("index");
//     // res.sendFile(__dirname+"/index.html");
// });
// app.get("/login",function(req,res){

//     res.render("login")
// });
// app.get("/signup",function(req,res){
    
//     res.render("signup");
// });
// app.get("/main",handlelogin,function(req,res){
//     res.render(
//         "main"
//     );
// })
// app.post("/login", function(req, res) {
//     const username = req.body.username;
//     const password = req.body.password;
//     console.log(username, password);

//     // Use parameterized queries to prevent SQL injection
//     conn.conn.query("SELECT * FROM user_login WHERE username = ? AND password = ?", [username, password], function(err, rows) {
//         if (err) {
//             // Handle error
//             console.error("Error executing query:", err);
//             res.redirect("/login");
//             return;
//         }

//         if (rows.length > 0) {
//             // User found, login successful
//             // setUser({},)
//             // const id=uuid
//             console.log("Logged in");
//             const id=uuidv4();
//             setUser({"username":username,"password":password},id);
//             res.cookie("userid",id);
//             res.redirect("/main");
//         } else {
//             // No user found with provided credentials
//             console.log("Login failed");
//             res.redirect("/login");
//         }
//     });
// });

// app.post("/signup",function(req,res){
//     username=req.body.username;
//     password=req.body.password;
//     conn.conn.query("insert into user_login  (username,password) values (?,?)",[username,password],function(err){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("signed up");
//             res.render("signup");
//         }
//     })
//     // res.render("signup");
// })
const express = require("express");
const cookieParser = require("cookie-parser");
const { v4 } = require("uuid");
const { sayhi, middle2, initDbConnection, conn } = require("./middle");
const map = require("./map");

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(sayhi);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/main", middle2, (req, res) => {
    res.render("main");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);

    conn.query("SELECT * FROM user_login WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (err) {
            console.error("Error querying the database:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (results.length > 0) {
            const id = v4();
            console.log(id, username, password);
            map.setUser({ username: username, password: password }, id);
            res.cookie('id', id, { maxAge: 900000, httpOnly: true });
            return res.render("main");
        } else {
            return res.render("login", { error: "Invalid username or password" });
        }
    });
});

app.listen(3000, () => {
    console.log("running...");
});
