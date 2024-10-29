require("dotenv").config();
const express = require('express');
const app = express();
const https = require('https');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

var pages;
const main = 'main_selected_link';
const secondary = 'secondary_selected_link';

function changeToSecondary(str){
    pages = {'home': secondary, 'general': secondary, 'assesment': secondary, 'advice': secondary,'community': secondary, 'map': secondary, 'chatbot': secondary};

    pages[str] = main;
}

console.log(changeToSecondary())

app.route('/').get((req, res) => {

    changeToSecondary('home');
    res.render('home', {pages});

});

app.get("/general",(req,res) => {

    changeToSecondary('general');
    res.render('general', {pages});
});

app.get("/assesment",(req,res) => {

    changeToSecondary('assesment');
    res.render('assesment', {pages});
});

app.get("/advice",(req,res) => {

    changeToSecondary('advice');
    res.render('advice', {pages});
});

app.get("/community",(req,res) => {
    changeToSecondary('community');
    res.render('community', {pages});
});

app.get("/map",(req,res) => {
    changeToSecondary('map');
    res.render('map', {pages});
});

app.get("/chatbot",(req,res) => {
    changeToSecondary('chatbot');
    res.render('chatbot', {pages});
});

app.listen(3000, ()=>{

    console.log('Listening at port 3000')

});