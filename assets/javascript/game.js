//  Array of characters
var wins = 0;
var losses = 0;
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
  clearArena();
  clearCharacterSelect();
  displayCharacters();
  removeStartButton();
}

function makeStartButton() {
  var startButton = $("<button>");
  startButton.text("Start Game").attr("id", "start");
  $(".character-select").append(startButton);
}

function removeStartButton() {
  $("#start").remove();
}

function clearArena() {
  $(".arena").empty();
}

function clearCharacterSelect () {
  $(".character-select").empty();
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

//display all characters in div
function displayCharacters() {
  Object.keys(characters).forEach(function(key) {
    $(".character-select").append(makeCharacter(key));
  });
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
    return true;
  } else {
    return false;
  }
}

function makeAttackButton() {
  var attackButton = $("<button>");
  attackButton.text("Attack!").attr("id", "attack");
  $(".arena").append(attackButton);
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

function showWin() {
  wins++;
  console.log("You Win!!!");
}

function showLose() {
  losses++;
  console.log("You Lose!!!");
}

//  Script

makeStartButton();

$(".character-select").on("click", "#start", function() {
  initialize();
});

$(".character-select").on("click", ".character", function() {
  if (!heroExists()) {
    chooseHero(this);
  } else if (heroExists() && !opponentExists()) {
    chooseOpponent(this);
    makeAttackButton();
  }
});

$(".arena").on("click", "#attack", function() {
  attackOpponent();
  if (opponentIsDead()) {
    removeAttackButton();
    removeOpponent();
    if (!allOpponentsDead()) {
      chooseOpponent();
    } else {
      showWin();
      makeStartButton();
      //show the start button again
    }
  } else {
    counterHero();
  }
  if (heroIsDead()) {
    removeHero();
    showLose();
    removeAttackButton();
    clearCharacterSelect();
    makeStartButton();
  }
});
//because character-select is cleared, the showstartbutton doesnt work anymore

//when character wins show results and have a clear button

//add some kind of preloading for images