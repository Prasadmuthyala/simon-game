const buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var count=0
$(".btn").click(function(e){
  var userChosenColour= e.target.classList[1];
  userClickedPattern.push(userChosenColour);
  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function playSound(name){
  var newaudio=new Audio("sounds/"+name+".mp3");
  newaudio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

$(document).keypress((e)=>{
  if(e.key=='a' && count==0){
    nextSequence();
    $("h1").text("level "+level);
    count++;
  }
})

function checkAnswer(currentLevel){
  // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    var wrongmp3=new Audio("sounds/wrong.mp3");
    wrongmp3.play();
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");

  }

}
function startOver(){
  level=0;
  gamePattern=[];
  count=0;
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("level "+level);
  var randomNumber =Math.floor(Math.random() * 4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
