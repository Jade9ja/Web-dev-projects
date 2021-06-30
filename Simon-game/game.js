var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber
var randomChosenColour
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    randomNumber = Math.floor((Math.random() * 4));
    // console.log(randomNumber);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    playAudio(randomChosenColour);
    // console.log(gamePattern);

}

$("body").on("keypress", function() {
    if (started == false) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // console.log("correct");
        // console.log(userClickedPattern.length + " = " + gamePattern.length);
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() { nextSequence(); }, 1000);
        }

    } else {
        // console.log("wrong");
        playAudio("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = []
    started = false;
}

function playAudio(randomChosenColour) {
    var btnAudio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // console.log(soundLocation);
    btnAudio.play();
}


// playAudio();

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


// $("#" + randomChosenColour).click(playAudio);
//document.addEventListener("canplaythrough", playAudio);

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => { $("#" + currentColour).removeClass("pressed"); }, 100);

}