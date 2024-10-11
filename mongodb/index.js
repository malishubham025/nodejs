const mongoose=require("mongoose");
mongoose.connect("mongodb://admin:password@localhost:27018").then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
});

