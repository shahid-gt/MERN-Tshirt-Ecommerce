let express = require("express") ;
let app = express() ;
let port = 5000 ; 

//testing middleware 
const isAdmin = (req,res,next) => {
    console.log("under isAdmin");
    next();
};
const isLoggedin = (req,res,next) => {
    console.log("under login");
    next() ;
};
const admin = (req, res) => { 
    return res.send("admin loggedin successful");
};
app.get('/admin',isLoggedin,isAdmin ,admin);



app.get('/',(req,res) => {
    return res.send("hey there greetings from shahid in Home page");
});

app.get('/signin',(req,res)=>{
    return res.send("sign in successfull") ;
});

app.get('/shahid',(req,res)=>{
})

app.listen(port,()=>{
    console.log("server is up and running ");
});