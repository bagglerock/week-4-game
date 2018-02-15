//  An array of character objects to cycle through for initiating the game
var characters = {
    "Luke Skywalker" : "somepic",
    "Obi Wan Kenobi" : "somepic",
    "Darth Sidious" : "somepic",
    "Darth Vader" : "somepic"
};


$(document).ready(function() {
  $("#start").on("click", function() {
    //initGame();
console.log(characters.length);


  });
});

//functions: add animations, VS later

//  Initialize all 4 characters
function initGame () {
    var heroBox = $("<div>");
  heroBox.addClass("hero character");
  heroBox.attr("attack-power", 10);
  $("main").append(heroBox);
  $(".hero").animate({top: "100px", left: "200px"});
}

// initialize hero:  create hero object
function initHero() {
  var heroBox = $("<div>");
  heroBox.addClass("hero character");
  heroBox.attr("attack-power", 10);
  $("main").append(heroBox);
  $(".hero").animate({top: "100px", left: "200px"});
}

// initialize opponent: create opponent object
function initOpp() {}

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

start game: reset
-- event listeners set to initialize

select hero: initialize hero, take away option to select this div
select opponent: initialize opponent, take away option to select any div

-- event listeners set to play

attack:  reduces the hp of opponent by hero.attack + calculation, reduces hero hp by fixed
if hp of hero drops to <1 then show you lose
if hp of opponent drops to <1 then select new opponent


*/
