let userScore = 0;
let compScore = 0;
let drawScore = 0;
let totalMatches = 0;

const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const drawScore_span = document.getElementById("draw-score");

const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const matches_p = document.getElementById("action-message");

const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

let cooldown = false;

let jsTitle = document.getElementById("jsTitle");
let typeEffect = new Typewriter(jsTitle, {
    loop: false,
    autoStart: true,
    strings: "Rock, Paper, Scissors",
    delay: 50
});

function generateChoice(externVar, other) {
    if (externVar == "compChoice") {
        const Options = ["r", "p", "s"];
        return Options[Math.floor(Math.random(1) * 3)];
    } else if (externVar == "rpsCalculation") {
        if (other == "r")
            return "Rock"
        else if (other == "p")
            return "Paper"
        else if (other == "s")
            return "Scissors"
    }
}

function matchOutcome(outcomeInput, userChoice, compChoice) {
    const userWord = "user".fontsize(3).sub();
    const compWord = "comp".fontsize(3).sub();

    if (outcomeInput == "win") {
        userScore++;
        userScore_span.innerHTML = userScore;
        result_div.innerHTML = `${generateChoice("rpsCalculation", userChoice)}${userWord} beats ${generateChoice("rpsCalculation", compChoice)}${compWord}  You win!`

        document.getElementById(userChoice).classList.add('green-glow');
        setTimeout(function () {
            document.getElementById(userChoice).classList.remove('green-glow')
        }, 500);
    } else if (outcomeInput == "lose") {
        compScore++;
        compScore_span.innerHTML = compScore;
        result_div.innerHTML = `${generateChoice("rpsCalculation", userChoice)}${userWord} loses to ${generateChoice("rpsCalculation", compChoice)}${compWord}  You lose!`

        document.getElementById(userChoice).classList.add('red-glow');
        setTimeout(function () {
            document.getElementById(userChoice).classList.remove('red-glow')
        }, 500);
    } else if (outcomeInput == "draw") {
        drawScore++;
        drawScore_span.innerHTML = drawScore;
        result_div.innerHTML = `${generateChoice("rpsCalculation", userChoice)}${userWord} draws to ${generateChoice("rpsCalculation", compChoice)}${compWord}  You draw!`

        document.getElementById(userChoice).classList.add('gray-glow');
        setTimeout(function () {
            document.getElementById(userChoice).classList.remove('gray-glow')
        }, 500);
    }
}

function gamePlay(userChoice) {
    if (cooldown == false) {
        cooldown = true;
        const computerChoice = generateChoice("compChoice");
        if (userChoice == computerChoice) {
            matchOutcome("draw", userChoice, computerChoice)
        } else {
            switch (userChoice + computerChoice) {
                case "rs":
                case "pr":
                case "sp":
                    matchOutcome("win", userChoice, computerChoice)
                    break;
                case "rp":
                case "ps":
                case "sr":
                    matchOutcome("lose", userChoice, computerChoice)
                    break;
            }
        }
        totalMatches++;
        matches_p.innerHTML = `Now make your move. | Matches played: ${totalMatches}`;
        cooldown = false;
    }   
}

function main() {
    rock_div.addEventListener('click', function () {
        gamePlay("r")
    });

    paper_div.addEventListener('click', function () {
        gamePlay("p")
    });

    scissors_div.addEventListener('click', function () {
        gamePlay("s")
    });
}



main()