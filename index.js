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


app.listen(3000, ()=>{

    console.log('Listening at port 3000')

});