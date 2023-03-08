let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

//key down function
$(document).keydown(function () {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});
//button click function
$('.btn').click(function () {
  userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
//checks answer with game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    playSound('wrong');

    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}
//level incrementer and button generator
function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}
//play sound function
function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}
//animation of button
function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
//start over level function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
