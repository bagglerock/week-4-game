//  Array of characters
var wins = 0;
var losses = 0;
var startMessage = "Click \"start game\" to start game.";
var chooseHeroMessage = "Please choose your hero.";
var chooseOpponentMessage = "Please choose your opponent.";
var attackMessage = "Click attack to battle";
var opponentDefeatedMessage = "Your opponent has been defeated.  Choose you next opponent.";
var heroDefeatedMessage = "You lose.  Click the start button to battle again.";
var winMessage = "Congratulations, you win.  Click the start button to battle again.";
var messageHTML = $("#message");
var characters = {
  luke: {
    name: "luke",
    hp: 100,
    ap: 8,
    cp: 5,
    pic: "./assets/images/luke.jpg"
  },
  obi: {
    name: "obi",
    hp: 120,
    ap: 10,
    cp: 8,
    pic: "./assets/images/obi.jpg"
  },
  sid: {
    name: "sid",
    hp: 150,
    ap: 12,
    cp: 12,
    pic: "./assets/images/sid.png"
  },
  vader: {
    name: "vader",
    hp: 180,
    ap: 15,
    cp: 20,
    pic: "./assets/images/vader.jpg"
  }
};

//  Functions

//initialize
function initialize() {
  clearCharacters();
  displayCharacters();
  removeStartButton();
  showScore();
}

function makeStartButton() {
  var startButton = $("<button>");
  startButton.text("Start Game").attr("id", "start");
  $(".scoreboard").append(startButton);
}

function removeStartButton() {
  $("#start").remove();
}

function clearCharacters() {
  $(".character").remove();
}

function makeCharacter(element) {
  var character = $("<div>");
  var image = $("<img>");
  var overlay = $("<div>");
  var hpOverlay = characters[element].hp + "/" + characters[element].hp;
  character
    .addClass("character float-left unselected")
    .attr("name", characters[element].name)
    .attr("hit-points", characters[element].hp)
    .attr("attack-power", characters[element].ap)
    .attr("counter-power", characters[element].cp);
  image.attr("src", characters[element].pic);
  overlay
  .addClass("overlay")
  .text(hpOverlay);
  character = $(character).append(image);
  character = $(character).append(overlay);
  return character;
}

function displayCharacters() {
  Object.keys(characters).forEach(function(key) {
    $(".character-select").append(makeCharacter(key));
  });
  messageHTML.text(chooseHeroMessage);
}

function heroExists() {
  var heroLength = $("#hero").length;
  if (heroLength === 0) {
    return false;
  } else {
    return true;
  }
}

function chooseHero(name) {
  $(name).remove();
  $(".arena").append(name);
  $(name)
    .attr("id", "hero")
    .removeClass("unselected");
    messageHTML.text(chooseOpponentMessage);
}

function opponentExists() {
  var opponentLength = $("#opponent").length;
  if (opponentLength === 0) {
    return false;
  } else {
    return true;
  }
}

function chooseOpponent(name) {
  $(name).remove();
  $(".arena").append(name);
  $(name)
    .removeClass("float-left")
    .addClass("float-right")
    .attr("id", "opponent")
    .removeClass("unselected");
}

function removeOpponent() {
  $("#opponent").remove();
}

function removeHero() {
  $("#hero").remove();
}

function allOpponentsDead() {
  if ($(".unselected").length === 0) {
    messageHTML.text(winMessage);
    return true;
  } else {
    return false;
  }
}

function makeAttackButton() {
  var attackButton = $("<button>");
  attackButton.text("Attack!").attr("id", "attack");
  $(".scoreboard").append(attackButton);
}

function removeAttackButton() {
  $("#attack").remove();
}

function attackOpponent() {
  var heroName = $("#hero").attr("name");
  var opponentName = $("#opponent").attr("name");
  var baseAttackPower = parseInt(characters[heroName].ap);
  var attackPower = parseInt($("#hero").attr("attack-power"));
  var hpOpponent = parseInt($("#opponent").attr("hit-points"));
  var hpOverlay;

  hpOpponent -= attackPower;
  attackPower = attackPower + baseAttackPower;
  hpOverlay = hpOpponent + "/" + characters[opponentName].hp;
  $("#hero").attr("attack-power", attackPower);
  $("#opponent").attr("hit-points", hpOpponent);
  $("#opponent > .overlay").text(hpOverlay);
}

function counterHero() {
  var hpHero = parseInt($("#hero").attr("hit-points"));
  var counterPower = parseInt($("#opponent").attr("counter-power"));
  var heroName = $("#hero").attr("name");
  var hpOverlay;

  hpHero -= counterPower;
  hpOverlay = hpHero + "/" + characters[heroName].hp;
  $("#hero").attr("hit-points", hpHero);
  $("#hero > .overlay").text(hpOverlay);
}

function heroIsDead() {
  var hpHero = parseInt($("#hero").attr("hit-points"));
  if (hpHero <= 0) {
    return true;
  } else {
    return false;
  }
}

function opponentIsDead() {
  var hpOpponent = parseInt($("#opponent").attr("hit-points"));
  if (hpOpponent <= 0) {
    return true;
  } else {
    return false;
  }
}

function updateWins() {
  wins++;
}

function updateLosses() {
  losses++;
}

function updateScores () {
  $("#wins").text(wins);
  $("#losses").text(losses);
}

function showStartMessage () {
  messageHTML.text(startMessage);
}

function showOppDefeatedMess () {
  messageHTML.text(opponentDefeatedMessage);
}

function showHeroDefeatedMess () {
  messageHTML.text(heroDefeatedMessage);
}
function showAttackMessage () {
  messageHTML.text(attackMessage);
}

//  Script

$.fn.preload = function() {
  this.each(function(){
      $('<img/>')[0].src = this;
  });
}

$(['./assets/images/luke.jpg','./assets/images/obi.jpg','./assets/images/sid.png','./assets/images/vader.jpg']).preload();

makeStartButton();
showStartMessage();

$(".scoreboard").on("click", "#start", function() {
  initialize();
});

$(".character-select").on("click", ".character", function() {
  if (!heroExists()) {
    chooseHero(this);
  } else if (heroExists() && !opponentExists()) {
    chooseOpponent(this);
    makeAttackButton();
    showAttackMessage();
  }
});

$(".arena").on("click", "#attack", function() {
  attackOpponent();
  if (opponentIsDead()) {
    removeAttackButton();
    removeOpponent();
    showOppDefeatedMess();
    if (!allOpponentsDead()) {
      chooseOpponent();
    } else {
      updateWins();
      makeStartButton();
      updateScores();
    }
  } else {
    counterHero();
  }
  if (heroIsDead()) {
    removeHero();
    updateLosses();
    showHeroDefeatedMess();
    removeAttackButton();
    makeStartButton();
    updateScores();
  }
});
//because character-select is cleared, the showstartbutton doesnt work anymore

//when character wins show results and have a clear button

//add some kind of preloading for images