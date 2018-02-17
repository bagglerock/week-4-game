//  An array of character objects to cycle through for initiating the game
var characters = [
  {
    name: "luke",
    hp: 100,
    ap: 5,
    cp: 10,
    pic: "./assets/images/luke.jpg"
  },
  {
    name: "obi",
    hp: 120,
    ap: 8,
    cp: 15,
    pic: "./assets/images/obi.jpg"
  },
  {
    name: "sid",
    hp: 150,
    ap: 12,
    cp: 18,
    pic: "./assets/images/sid.jpg"
  },
  {
    name: "vader",
    hp: 180,
    ap: 15,
    cp: 20,
    pic: "./assets/images/vader.jpg"
  }
];

var className =  $(this).attr("class"); //might be helpful later

$(document).ready(function() {
  
  
  $("#start").on("click", function() {
    initGame();
    $("#start").hide();
  });

  $("main").on("click", "div.character", function () {
    var heroLength = $(".hero").length;
    var opponentLength = $(".opponent").length;
    var className =  $(this).attr("class")

    if (!heroLength){
      $(this).animate({top: "100px"});
      $(this).removeClass("float");
      $(this).attr("attack-power", 10).addClass("hero clear");
      $("main").append(this);
    } else if (!opponentLength && !className.includes("hero")){
      $(this).animate({top: "3px", left: "200px"});
      $(this).removeClass("float");
      $(this).attr("counter-power", 20).addClass("opponent clear");
      var attackBtn = $("<button>");
      attackBtn.attr("id", "attack").text("Attack");
      $("main").append(attackBtn);
      $("main").append(this);
    }
  
  });

  $("main").on("click", "#attack", function (){
    console.log("test");
  })


});


//functions: add animations, VS later

//  Initialize all 4 characters
function initGame() {
  for (var i = 0; i < characters.length; i++) {
    var character = $("<div>");
    character.addClass("character float").attr("id", characters[i].name).text(characters[i].name);
    $("main").append(character);
  }
}

// initialize hero:  create hero object
function selectHero() {

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

 once you click start, the four choices are shown
 once you choose one character, the choice is locked out to opponents to choose
 once the opponent is chosen, then all characters are locked up and you can only choose the attack button
 attack will hit for hp and increment the attack power. hero will also get hit for x points depending on the opponent chosen
 once the hero's hp goes to zero its game over
 once the opponents hp goes to zero, you will be able to choose another opponent.
 choose the opponent again and it will be locked out again


*/
