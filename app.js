const avlChoces = ["rock", "paper", "sissor"];
const userChoices = document.querySelectorAll(".player-choices .choices img");//img nodes
const botChoices = document.querySelectorAll(".computer-choices .choices img");//img nodes
const scoreBoard = document.querySelector(".score-board .scores");//0:0
const scoreResult = document.querySelector(".score-board .result")//It,s a Draw
const btn = document.querySelector(".start-btn");

let usermove = "rock", botmove = "rock", result = 0, userScore = 0, botScore = 0, radIdx = 0, botImgNode = botChoices[0], userImgNode = userChoices[0];


function checkResult(plr1move, plr2move) {
    if (plr1move == plr2move) return 0;
    else if ((plr1move == "rock" && plr2move == "sissor") || (plr1move == "sissor" && plr2move == "paper") || (plr1move == "paper" && plr2move == "rock"))
        return 1;

    return -1;
}
function updateScore(urmove, btmove, res) {
    if (res == 0) {
        scoreResult.textContent = "It's a Draw";
        return;
    } else if (res == 1) {
        userScore++;
        scoreResult.innerHTML = `It's a Draw <br> Your ${urmove} defeated the ${btmove}`;
    } else {
        botScore++;
        scoreResult.innerHTML = `It's a Draw <br> Bot's ${urmove} defeated the ${btmove}`;
    }
    scoreBoard.textContent = `${userScore}:${botScore}`;
};

function showBothChoices(userImgNode, botRandIdx) {
    botImgNode = botChoices[botRandIdx];
    botImgNode.classList.add("clicked-img");
    userImgNode.classList.add("clicked-img");
    setTimeout(() => {
        botImgNode.classList.remove("clicked-img");
        userImgNode.classList.remove("clicked-img");
    }, 700);
}

function refreshScore() {
    userScore = botScore = 0;
    scoreBoard.textContent = `${userScore}:${botScore}`;
    scoreResult.textContent = "Chosse a Move";
}


//adding event lstener
userChoices.forEach(imgNode => {
    imgNode.addEventListener("click", function (evt) {
        usermove = imgNode.className;//store user move
        radIdx = Math.floor(Math.random() * 3); //random index 
        botmove = avlChoces[radIdx];//store bot move
        result = checkResult(usermove, botmove); //check who wins
        showBothChoices(imgNode, radIdx);//highlight both user and bot chosed img 
        console.log(usermove, botmove, result);//check on console
        updateScore(usermove, botmove, result);//update result
    });
});

btn.addEventListener("click", function () {
    refreshScore();
    if (scoreResult.classList.contains("hidden")) {
        scoreResult.classList.remove("hidden");
        btn.textContent = "Refresh Scores";
    }
});