require("dotenv").config();
const { name } = require("ejs");
const express = require('express');
const app = express();
const https = require('https');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

var pages;
var pageName;
const main = 'main_selected_link';
const secondary = 'secondary_selected_link';

function changeToSecondary(str){
    pages = {'home': secondary, 'general': secondary, 'assesment': secondary, 'advice': secondary,'community': secondary, 'map': secondary, 'chatbot': secondary};

    
    if (str) {
        pageName = str.charAt(0).toUpperCase() + str.slice(1);
    }

    pages[str] = main;
}
console.log(changeToSecondary())


app.route('/').get((req, res) => {

    changeToSecondary('home');
    res.render('home', {pages, pageName});

});

app.get("/general",(req,res) => {

    changeToSecondary('general');
    res.render('general', {pages, pageName});
});

app.get("/assesment",(req,res) => {

    changeToSecondary('assesment');
    res.render('assesment', {pages, pageName});
});

app.get("/advice",(req,res) => {

    changeToSecondary('advice');
    res.render('advice', {pages, pageName});
});

app.get("/community",(req,res) => {
    changeToSecondary('community');
    res.render('community', {pages, pageName});
});

app.get("/map",(req,res) => {
    changeToSecondary('map');
    res.render('map', {pages, pageName});
});

app.get("/chatbot",(req,res) => {
    changeToSecondary('chatbot');
    res.render('chatbot', {pages, pageName});
});

app.listen(3000, ()=>{

    console.log('Listening at port 3000')

});