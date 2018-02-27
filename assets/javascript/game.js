//  Array of characters
var wins = 0;
var losses = 0;
//  Alot of the variables for the message text
var startMessage = "Click \"start game\" to start game.";
var chooseHeroMessage = "Please choose your hero.";
var chooseOpponentMessage = "Please choose your opponent.";
var attackMessage = "Click attack to battle";
var opponentDefeatedMessage = "Your opponent has been defeated.  Choose you next opponent.";
var heroDefeatedMessage = "You lose.  Click the start button to battle again.";
var winMessage = "Congratulations, you win.  Click the start button to battle again.";
var messageHTML = $("#message");
// The sound file
var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "./assets/sounds/wilhelm.ogg");

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

function initialize() {
  //  Clear out the div for any previous characters
  clearCharacters();
  //  Make some new characters and display them
  displayCharacters();
  //  Get rid of the start button
  removeStartButton();
}

//  Function to make the start button
function makeStartButton() {
  var startButton = $("<button>");
  startButton.text("Start Game").attr("id", "start");
  $(".scoreboard").append(startButton);
}

//  Function to remove the start button
function removeStartButton() {
  $("#start").remove();
}

//  Clear out the divs with a class named character
function clearCharacters() {
  $(".character").remove();
}

//  Make a character specified by the key at a specific element of the object array.  
function makeCharacter(element) {
  //  Create the div that the character will reside in
  var character = $("<div>");
  //  Create the image container
  var image = $("<img>");
  //  Create the div that the hit points will reside in 
  var overlay = $("<div>");
  //  Create the text that will go in the overlay
  var hpOverlay = characters[element].hp + "/" + characters[element].hp;
  //  Create the character using all the information from that object array and stack them left
  character 
    .addClass("character float-left unselected")
    .attr("name", characters[element].name)
    .attr("hit-points", characters[element].hp)
    .attr("attack-power", characters[element].ap)
    .attr("counter-power", characters[element].cp);
    //  Add source attribute to the image
  image.attr("src", characters[element].pic);
  //  Add the overlay class and the text to the overlay
  overlay
  .addClass("overlay")
  .text(hpOverlay);
  //  Append these new divs to the character and return it to be appended to the character-select div
  character = $(character).append(image);
  character = $(character).append(overlay);
  return character;
}

//  Go through the object array and make a character for each key
function displayCharacters() {
  Object.keys(characters).forEach(function(key) {
    $(".character-select").append(makeCharacter(key));
  });
  messageHTML.text(chooseHeroMessage);
}

//  Check the whole DOM if an id of hero exists
function heroExists() {
  var heroLength = $("#hero").length;
  if (heroLength === 0) {
    return false;
  } else {
    return true;
  }
}

//  Remove the character from the character-select div and append it to the arena and add the id of hero
function chooseHero(name) {
  $(name).remove();
  $(".arena").append(name);
  $(name)
    .attr("id", "hero")
    .removeClass("unselected");
    messageHTML.text(chooseOpponentMessage);
}

//  Check the whole DOM if there is an id called opponent
function opponentExists() {
  var opponentLength = $("#opponent").length;
  if (opponentLength === 0) {
    return false;
  } else {
    return true;
  }
}

//  Remove the character from the character-select div and append it to the area with the id of opponent
function chooseOpponent(name) {
  $(name).remove();
  $(".arena").append(name);
  $(name)
    .removeClass("float-left")
    .addClass("float-right")
    .attr("id", "opponent")
    .removeClass("unselected");
}

//  Function to remove the div with the id of opponent
function removeOpponent() {
  $("#opponent").remove();
}

// Function to remove the div with the id of hero
function removeHero() {
  $("#hero").remove();
}

//  Check the DOM if there are any classes called unselected
function allOpponentsDead() {
  if ($(".unselected").length === 0) {
    messageHTML.text(winMessage);
    return true;
  } else {
    return false;
  }
}

//  Make the attack button
function makeAttackButton() {
  var attackButton = $("<button>");
  attackButton.text("Attack!").attr("id", "attack");
  $(".scoreboard").append(attackButton);
}

//  Remove the attack button
function removeAttackButton() {
  $("#attack").remove();
}

//  Function to do the attack
function attackOpponent() {
  //  Set up the variables
  var heroName = $("#hero").attr("name");
  var opponentName = $("#opponent").attr("name");
  //  Get the attack power from the character object array and make it the base attack power
  var baseAttackPower = parseInt(characters[heroName].ap);
  //  Get the attack power from the character directly from the current hero element
  var attackPower = parseInt($("#hero").attr("attack-power"));
  //  Get the hit points directly from the current opponent element
  var hpOpponent = parseInt($("#opponent").attr("hit-points"));
  var hpOverlay;

  //  Decrease the hp of the opponent by the attack power
  hpOpponent -= attackPower;
  // Increment the attack power by the base attack power
  attackPower = attackPower + baseAttackPower;
  //  Update the data for the hpOverlay
  hpOverlay = hpOpponent + "/" + characters[opponentName].hp;
  //  Update the attack power of the hero
  $("#hero").attr("attack-power", attackPower);
  //  Update the data on screen
  $("#opponent").attr("hit-points", hpOpponent);
  $("#opponent > .overlay").text(hpOverlay);
}

//  Function to counter attack the hero
function counterHero() {
  //  Get the hp of the hero
  var hpHero = parseInt($("#hero").attr("hit-points"));
  //  Get the counter power of the opponent
  var counterPower = parseInt($("#opponent").attr("counter-power"));
  //  Get the hero name
  var heroName = $("#hero").attr("name");
  var hpOverlay;

  //  Subtract the hero hit points by counter power
  hpHero -= counterPower;
  //  Set up the data for the hp data
  hpOverlay = hpHero + "/" + characters[heroName].hp;
  //  Update the data on screen
  $("#hero").attr("hit-points", hpHero);
  $("#hero > .overlay").text(hpOverlay);
}

//  If hero is dead then return true
function heroIsDead() {
  var hpHero = parseInt($("#hero").attr("hit-points"));
  if (hpHero <= 0) {
    return true;
  } else {
    return false;
  }
}

//  If the opponent is dead then return true
function opponentIsDead() {
  var hpOpponent = parseInt($("#opponent").attr("hit-points"));
  if (hpOpponent <= 0) {
    return true;
  } else {
    return false;
  }
}

//  Function to increase wins
function updateWins() {
  wins++;
}

//  Function to increase losses
function updateLosses() {
  losses++;
}

//  Update the score on the screen
function updateScores () {
  $("#wins").text(wins);
  $("#losses").text(losses);
}

//  functions to update the messages
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

//  Function to make the sound that is played in alot of movies
function playWilhelm () {
  audioElement.play();

}

//  Preload the images so they load right when the divs are made
$.fn.preload = function() {
  this.each(function(){
      $('<img/>')[0].src = this;
  });
}

//  Script

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
    playWilhelm();
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
    playWilhelm();
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
