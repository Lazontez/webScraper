//GLOBAL VARIABLES
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const expresshbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const spaceNew = require("./scripts/scrape");
const Headline = require('./models/headline');



//MiddleWare
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//HandleBars

app.engine('handlebars', expresshbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//Mongoose 
const db = process.env.MONGODB_URI || 'mongodb://localhost/mongoSpaceNews'
mongoose.connect(db, { useNewUrlParser: true }, (err) => { if (err) { throw err } console.log('mongoose connected') });


app.get('/', (req, res) => {
    res.render('home');
});
app.get('/api/scrapeData/', (req, res) => {
    spaceNew(function (news) {
        console.log("spaceNew ->", news)
        res.json(news)
    })
})
app.get('/saved', (req, res) => {
    Headline.find().then((broughtBack) => {
        // let articleData = []
        // for(x in broughtBack){
        //     articleData.push(broughtBack[x])
        // }
        // console.log("heres what I got " + broughtBack)
        console.log(broughtBack);
        res.render('saved', {news : broughtBack })
    })
});
//CREATE
app.post("/api/add/book", (req, res) => {
    const incoming = req.body;
    const article = new Headline(incoming);
    // console.log(incoming);
    article.save((error) => {
        if (error) console.log(error);
        const saveStatus = (error) ? console.log(error) : "saved"
        console.log(saveStatus)
        if (saveStatus === "saved") {
            res.send(article + " was added.").status(200)
        }
        else {
            res.send(error)
        }
    });




});


const route = require("./config/routes");
// app.use(route)
//Activate server to listen for routes
app.listen(PORT, () => console.log('listening on PORT ' + PORT + ' Link: http://localhost:' + PORT))





