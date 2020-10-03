// store the buttons in an array
const buttonColours = ["red", "blue", "green", "yellow"];

// this stores the pattern in which random button colours are chosen
const gamePattern = [];

// this stores the pattern in which the user clicks on the buttons
let userClickedPattern = [];

// at the start of the game:
let level = 0;

let started = false;


// to start the game, a key on the keyboard is pressed.
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);

        nextSequence();
        started = true;
    }
});

const nextSequence = () => {
    userClickedPattern = [];
    level++;

    $("#level-title").text(`Level ${level}`);

    const randomNumber = Math.floor(Math.random() * 4);

    // when the game starts, a random button is chosen
    const randomChosenColour = buttonColours[randomNumber];

    // The buttons chosen are pushed into the game pattern array to be sequentially followed by the user
    gamePattern.push(randomChosenColour);


    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");

    // as a user clicks a button following the random button chosen by the game, it is added to the userClickedPattern array
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

const playSound = (name) => {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

const animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass("pressed");

    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

const checkAnswer = (currentLevel) => {
    // check if the last items in the two arrays are the same
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        
        // start a new sequence when the user has correctly clicked the buttons selected by the game
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        // start the game over
        startOver();
    }
}

const startOver = () => {
    // reset all variables.
    level = 0;
    gamePattern = [];
    started = false;
}