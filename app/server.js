const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

var friendsList = require('./data/friends');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/survey.html');
});

app.get('/api/friends', (req, res) => {
    res.json(friendsList);
});

app.post('/api/friends', (req, res) => {
    let scoreResults = [];

    for (let i = 0; i < friendsList.length; i++) {
        const friend = friendsList[i];

        let scoreResult = 0;

        for (let j = 0; j < friend.scores.length; j++) {
            scoreResult += Math.abs(friend.scores[j] - req.body.scores[j]);
        }

        scoreResults.push(scoreResult);
    }

    let curMin = 50;
    let closestMatch = 0;

    for (let i = 0; i < scoreResults.length; i++) {
        const curScore = scoreResults[i];

        if (curScore < curMin) {
            curMin = curScore;
            closestMatch = i;
        }
    }

    friendsList.push(req.body);

    console.log(friendsList[closestMatch]);
    res.json(friendsList[closestMatch]);
});

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});