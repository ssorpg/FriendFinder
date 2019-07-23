// FUNCTIONS
function strToInt(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }

    return arr;
}

function getRelativeScores(friendsList, myScores) {
    let scoreResults = [];

    for (let i = 0; i < friendsList.length; i++) {
        const friend = friendsList[i];
    
        let scoreResult = 0;
    
        for (let j = 0; j < friend.scores.length; j++) {
            scoreResult += Math.abs(friend.scores[j] - myScores[j]);
        }
    
        scoreResults.push(scoreResult);
    }

    return scoreResults;
}

function compareRelativeScores(scoreResults) {
    let curMin = 50;
    let closestMatch = 0;

    for (let i = 0; i < scoreResults.length; i++) {
        const curScore = scoreResults[i];

        if (curScore < curMin) {
            curMin = curScore;
            closestMatch = i;
        }
    }

    return closestMatch;
}



// EXPORTS
module.exports = {
    strToInt: strToInt,
    getRelativeScores: getRelativeScores,
    compareRelativeScores: compareRelativeScores
}