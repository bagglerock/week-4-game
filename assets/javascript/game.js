//  An array of character objects to cycle through for initiating the game
var characters = [
  {
    name: "luke",
    pic: "somepic"
  },
  {
    name: "obi",
    pic: "somepic"
  },
  {
    name: "sid",
    pic: "somepic"
  },
  {
    name: "vader",
    pic: "somepic"
  }
];

$(document).ready(function() {
  
  
  $("#start").on("click", function() {
    initGame();
    $("#start").hide();
  });

  $("main").on("click", "div.character", function () {
    $(this).animate({top: "100px"});
    $(this).attr("attack-power", 10);
  });



});


//functions: add animations, VS later

//  Initialize all 4 characters
function initGame() {
  for (var i = 0; i < characters.length; i++) {
    var character = $("<div>");
    character.addClass("character").attr("id", characters[i].name).text(characters[i].name);
    $("main").append(character);
  }
}

// initialize hero:  create hero object
function selectHero() {
  var heroBox = $("<div>");
  heroBox.addClass("hero character");
  heroBox.attr("attack-power", 10);
  $("main").append(heroBox);
  $(".hero").animate({ top: "100px", left: "200px" });
}

// initialize opponent: create opponent object
function selectOpponent() {}

// create attack button
function makeAttButton() {}

// attack
function attack() {}

// booleans for isDead - if hp<1 return true else false
function isDead() {}

// showWin wins++ message create reset button
function showWin() {}

// showLose losses++ message create reset button
function showLose() {}

// create reset button
function makeResButton() {}

// reset - bring back to initial state

//

/* 
script part


select hero: initialize hero, take away option to select this div
select opponent: initialize opponent, take away option to select any div

-- event listeners set to play

attack:  reduces the hp of opponent by hero.attack + calculation, reduces hero hp by fixed
if hp of hero drops to <1 then show you lose
if hp of opponent drops to <1 then select new opponent


*/
