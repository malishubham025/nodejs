require('dotenv').config()
const express=require("express");
const app=express();
const passport=require("passport");
const session = require('express-session');
const {Strategy:GoogleStrategy}=require("passport-google-oauth20");
const bodyParser=require("body-parser");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: 'keyboard cat', resave: true, saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID:process.env.client_id,
    clientSecret:process.env.client_secret,
    callbackURL:process.env.redirect_uris,
    scope:['email','profile'],
},async (accessToken,refreshToken,profile,done)=>{
    // console.log(accessToken);
    // console.log(profile);
    done(null, profile);
}));
// require()
passport.serializeUser((user, done) => {
    done(null, user.id); // Saves the user's ID in the session
    console.log("=============="+user.id);
});
passport.deserializeUser((id, done) => {
    // Fetch user from the database using the ID
    console.log("called");
    done(null, id);
    console.log(id);
    
});
app.get("/",(req,res)=>{
    
    res.render("index");
})
app.get("/login-google",passport.authenticate('google'),(req,res)=>{
    res.send("200");
});
app.get("/login",(req,res)=>{

    res.render("login");
})
app.get("/resources",(req,res)=>{
    if(req.isAuthenticated())
        res.send("login");
    else res.render("login");
})
app.post("/login",(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    req.login({id:12393,username:username,password:password},(err)=>{
        if (err) {
            console.error(err);
            return res.status(500).send("Login failed.");
        }
        res.redirect("/resources");
    });
    
    // res.send("login");
})
app.get("/logout",(req,res)=>{
    req.logOut(null,(err)=>{

    });
    res.send("hi");
})
app.get("/redirect",passport.authenticate('google'),(req,res)=>{
    
    res.render("index2");
})
app.listen(3000,()=>{
    console.log("running");
})