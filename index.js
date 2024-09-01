const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require("mongoose")
const app = express();
const port = process.env.PORT || 3000;
require("./server/routes/dbRoute.js")

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);



const model = require("./server/models/DataEntires.js");



// Code for Sign up feature 


app.post('/signup', async (req, res) => {
  const { names, gmail, password } = req.body;
  try {
    const Data = new model({ names, gmail, password });
    let UserInfo = await Data.save();
    console.log(UserInfo);
    //  res.send('Sucessful Signup')
    // req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect("/")
  }
  catch (error) {
    if (error.response) {
      console.log(error)
    }

  }
})

app.get("/signup", (req, res) => {
  res.render("signup");
})




// Code for Login functionality  
app.post('/login' , async(req , res)=>{
     
  let {gmail , password} = req.body;
  try {

      let Data = await model.findOne({gmail , password})
      if(!Data) 
      {
         req.flash('error', 'Invalid username or password');
          res.send("Invaild username or password");
      }
      res.render('/', {
        successMessages: req.flash('success'),
        errorMessages: req.flash('error')
    });

      res.redirect('/');
      console.log(Data);
  } catch (error) {
      
  }

})

app.get("/login", (req, res) => {
  res.render("login");
})




app.listen(port, () => console.log(`Listening to port ${port}`));
