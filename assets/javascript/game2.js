//  Array of characters
var characters = {
    luke : {
        name : "luke",
        hp : 100,
        ap : 5,
        cp : 10,
        pic : "./assets/images/luke.jpg"
    },
    obi : {
        name : "obi",
        hp : 120,
        ap : 8,
        cp : 15,
        pic : "./assets/images/obi.jpg"
    },
    sid : {
        name: "sid",
        hp : 150,
        ap : 12,
        cp : 18,
        pic : "./assets/images/sid.png"
    },
    vader : {
        name : "vader",
        hp : 180,
        ap : 15,
        cp : 20,
        pic : "./assets/images/vader.jpg"
    }
  }

  //  Functions

  //initialize
  function initialize () {
      displayCharacters();
      hideStartButton();
  }

  function makeStartButton () {
      var startButton = $("<button>");
      startButton
      .text("Start Game")
      .attr("id" , "start")
      ;
      $(".scores").append(startButton);
  }

  function hideStartButton () {
      $("#start").hide();
  }

  function showStartButton () {
      $("#start").show();
  }

  function makeCharacter (element) {
      var character = $("<div>");
      var image = $("<img>");
      character
      .addClass("character float-left")
      .attr("name", characters[element].name)
      .attr("hit-points", characters[element].hp)
      .attr("attack-power", characters[element].ap)
      .attr("counter-power", characters[element].cp)
      ;
      image
      .attr("src", characters[element].pic)
      ;
      character = $(character).append(image);
      return character;
  }


  //display all characters in div
  function displayCharacters () {
      Object.keys(characters).forEach(function(key) {
          $(".character-select").append(makeCharacter(key));
        });
  }

  function heroExists () {
      var heroLength = $("#hero").length;
      if (heroLength === 0){
          return false;
      } else {
          return true;
      }
  }

  function chooseHero (name) { 
      $(name).remove();
      $(".arena").append(name);
      $(name).attr("id", "hero");
}

  function opponentExists () {
      var opponentLength = $("#opponent").length;
      if (opponentLength === 0){
          return false;
      } else {
          return true;
      }
  }
  
  function chooseOpponent (name) {
      $(name).remove();
      $(".arena").append(name);
      $(name)
      .removeClass("float-left")
      .addClass("float-right")
      .attr("id", "opponent");
  }

  function makeAttackButton () {
      var attackButton = $("<button>");
      attackButton
      .text("Attack!")
      .attr("id" , "attack")
      ;
      $(".arena").append(attackButton);
  }

  //attack hero
  function attack () {
    var heroName = $("#hero").attr("name");
    var attackPower = parseInt($("#hero").attr("attack-power"));
    var baseAttackPower = parseInt(characters[heroName].ap);
    var hpHero = parseInt($("#hero").attr("hit-points"));
    var counterPower = parseInt($("#opponent").attr("counter-power"));
    var hpOpponent = parseInt($("#opponent").attr("hit-points"));
  
    //reduce the hp of opponent by ap of hero and double hero ap
    hpOpponent -= attackPower;
    attackPower = attackPower + baseAttackPower;
    $("#hero").attr("attack-power", attackPower);
    $("#opponent").attr("hit-points", hpOpponent);
  
    //check the hp of the opponent before firing the next shot
  
    //reduce the hp of the hero by cp of the opponent
    hpHero -= counterPower;
    $("#hero").attr("hit-points", hpHero);
    console.log("Hero's HP: " + hpHero);
    console.log("Opponent's HP: " + hpOpponent);
  
    //check to see of the hero's hp is 0
  }

  //attack opponent

  //defeated

  //windisplay

  //losedisplay



  //  Script

makeStartButton();

$("#start").on("click", function () {
    initialize();
});

$(".character-select").on("click", "div.character", function () {
    if ( !heroExists() ) {
        chooseHero(this);
    } else if( heroExists() && !opponentExists() ) {
        chooseOpponent(this);
        makeAttackButton();
    }
});

$(".arena, #attack").on("click", function() {
    attack();
});



  //  General Strategy
  /*
  
  1. When the start button is clicked, create and display all the characters all to be used.
  2. When the hero is chosen, set heroExists.
  3. When opponent is chose, set opponentExists.
  4. When both characters are chosen, add attack button
  5. Attack button -> heroHP -= cp; opponentHP -= heroAPcumulative + heroAP ; display hp's and do checks
  6. if win or lose...  display
  7.


  
  
  */
