var express             = require("express"),
 app                    = express(),
 bodyParser             = require("body-parser"),
 mongoose               = require("mongoose"),
 flash                  = require("connect-flash"),
 methodOverride         = require("method-override"),
 passport               = require("passport"),
 LocalStategy           = require("passport-local"),
 Campground             = require("./models/campground"),
 Comment                = require("./models/comment"),
 User                   = require("./models/user"),
 seedDB                 = require("./seeds");
 
 //Requiring Routes
 var    commentRoutes    = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true}); // Set up mongo DB
app.use(bodyParser.urlencoded({extended: true})); // To use Body Parser
app.set("view engine",'ejs'); // For using EJS with express
app.use(express.static(__dirname + "/public")); // To add Css 
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PASSEPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Rusty the best!",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware // Make the current User available on all template
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Use the route
app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//For local environnement development
// app.listen(3000,function(){
//     console.log("Yelpcamp server has started!");
// });

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Yelpcamp server has started!");
});