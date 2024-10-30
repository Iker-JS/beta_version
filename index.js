require('dotenv').config();
const { name } = require('ejs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.CREDENTIAL);
//Data del vote
const forumData = [
    { id: 1, title: 'Idea for an event', upvotes: 0, downvotes: 0 },
    { id: 2, title: 'Do you think I am ugly?', upvotes: 0, downvotes: 0 },
];

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        responseMimeType: 'text/plain',
        maxOutputTokens: 1000,
        temperature: 0.05,
    },
});

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

var pages;
var pageName;

const main = 'main_selected_link';
const secondary = 'secondary_selected_link';
var userMessages = [];
var chatBotMessages = [];
var forums = [{'title': 'I am atractive?', 'description': 'Hi, i am a ugly', 'upvote': 0, 'downvote': 0}]


function changeToSecondary(str) {
    pages = {
        home: secondary,
        general: secondary,
        assesment: secondary,
        advice: secondary,
        community: secondary,
        map: secondary,
        chatbot: secondary,
    };

    if (str) {
        pageName = str.charAt(0).toUpperCase() + str.slice(1);
    }

    pages[str] = main;
}

app.route('/').get((req, res) => {
    changeToSecondary('home');
    res.render('home', { pages, pageName });
});

app.get('/general', (req, res) => {
    changeToSecondary('general');
    res.render('general', { pages, pageName });
});

app.get('/assesment', (req, res) => {
    changeToSecondary('assesment');
    res.render('assesment', { pages, pageName });
});

app.get('/advice', (req, res) => {
    changeToSecondary('advice');
    res.render('advice', { pages, pageName });
});

app.get('/community', (req, res) => {
    changeToSecondary('community');
    res.render('community', { pages, pageName, forums});
});


app.get('/map', (req, res) => {
    changeToSecondary('map');
    res.render('map', { pages, pageName });
});

app.get('/chatbot', (req, res) => {
    changeToSecondary('chatbot');
    res.render('chatbot', { pages, pageName });
});


app.get('/forum', (req, res) => {
    changeToSecondary('chatbot');
    res.render('forum', { pages, pageName });
});


app.post('/upvote/:index', (req, res) => {
    var index = req.params.index;
    forums[index].upvote++;
    res.redirect('/community');
});

app.post('/downvote/:index', (req, res) => {
    var index = req.params.index;
    forums[index].downvote++;
    res.redirect('/community');
});


app.post('/add_forum', (req, res) => {

    var title = req.body.title;
    var description = req.body.description;

    forums.push({'title': title, 'description': description, 'upvote': 0, 'downvote': 0})
    
    res.render('community', { pages, pageName, forums});
});


app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (userMessage.replaceAll(' ', '')) {
        userMessages.push(userMessage);

        chatHistory += `Usuario: ${userMessage}\n`;

        const result = await model.generateContent(chatHistory);
        const response = result.response.text();

        chatBotMessages.push(`AMADEUS: ${response}\n`);
        chatHistory += `AMADEUS: ${response}\n`;

        changeToSecondary('chatbot');

        res.render('chatbot', {
            pages,
            pageName,
            chatBotMessages,
            userMessages,
            error: false,
        });
    } else {
        res.render('chatbot', {
            pages,
            pageName,
            chatBotMessages,
            userMessages,
            error: true,
        });
    }
});

app.listen(3000, () => {
    console.log('Listening at port 3000');
});

let chatHistory =
    'Eres Amadeus, un ayudante de los usuarios con su salud mental, te encanta ayudar a las personas con temas personales o de situacion que los ponga en tristeza, usas ayudas psicologicas para ayudarlas e intentar hacerlas felices, mi inventor es Elshadowzr, un cientifico loco que le gusta el choripan';
