//GLOBAL VARIABLES
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const expresshbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const spaceNew = require("./scripts/scrape");



//MiddleWare
app.use(express.static(path.join( __dirname +'/public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//HandleBars

app.engine('handlebars', expresshbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');

//Mongoose 
const db = process.env.MONGODB_URI || 'mongodb://localhost/mongoSpaceNews'
mongoose.connect(db, { useNewUrlParser: true }, (err) => { if (err) { throw err } console.log('mongoose connected') });


app.get('/', (req, res) => {
    // res.header("content-type: text/html");
    // res.render('home' , {info : news});
    res.render('home');
});
app.get('/api/scrapeData/', (req,res)=>{
    spaceNew(function(news){
        console.log("spaceNew ->", news)
        res.json(news)
    })
})
app.get('/saved', (req, res) => {

    res.render('saved')
})

const route = require("./config/routes");
// app.use(route)
//Activate server to listen for routes
app.listen(PORT, () => console.log('listening on PORT ' + PORT + ' Link: http://localhost:' + PORT))





