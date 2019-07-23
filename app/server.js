// SERVER SETUP
const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;



// CUSTOM JS
var friendsList = require('./data/friends');
const helper = require('./helper');



// ROUTING
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/survey.html');
});

app.get('/api/friends', (req, res) => {
    res.json(friendsList);
});

app.post('/api/friends', (req, res) => {
    req.body.scores = helper.strToInt(req.body.scores);
    const myScores = req.body.scores;

    const scoreResults = helper.getRelativeScores(friendsList, myScores);
    const closestMatch = helper.compareRelativeScores(scoreResults);

    friendsList.push(req.body);

    console.log(friendsList[closestMatch]);
    console.log(req.body);
    
    res.json(friendsList[closestMatch]);
});



// SERVER INIT
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});