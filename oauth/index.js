require('dotenv').config()
const express=require("express");
const app=express();
const passport=require("passport");
const {Strategy:GoogleStrategy}=require("passport-google-oauth20");
app.set("view engine","ejs");
app.use(passport.initialize());
passport.use('custom-google',new GoogleStrategy({
    clientID:process.env.client_id,
    clientSecret:process.env.client_secret,
    callbackURL:process.env.redirect_uris,
    scope:['email','profile'],
},async (accessToken,refreshToken,profile,done)=>{
    console.log(accessToken);
    console.log(profile);
    done();
}));
// require()
app.get("/",(req,res)=>{
    
    res.render("index");
})

app.get("/login",passport.authenticate('custom-google'),(req,res)=>{
    res.send(200);
})
app.get("/redirect",passport.authenticate('custom-google'),(req,res)=>{
    
    res.render("index");
})
app.listen(3000,()=>{
    console.log("running");
})