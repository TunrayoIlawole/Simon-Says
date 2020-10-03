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