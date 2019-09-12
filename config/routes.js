const express = require("express");
const app = express()

module.exports = function (routes) {

    app.get('/', (req, res) => {
        console.log("URL HIT")
        res.render('home');
    });

    app.get('/saved', (req, res) => {
        res.render('saved')
    });
};