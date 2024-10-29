require("dotenv").config();
const express = require('express');
const app = express();
const https = require('https');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.route('/').get((req, res) => {

    res.render('home');

});

app.get("/general",(req,res) => {
    res.render('general');
});

app.get("/assesment",(req,res) => {
    res.render('assesment');
});

app.get("/advice",(req,res) => {
    res.render('advice');
});

app.get("/community",(req,res) => {
    res.render('community');
});

app.get("/map",(req,res) => {
    res.render('map');
});

app.listen(3000, ()=>{

    console.log('Listening at port 3000')

});