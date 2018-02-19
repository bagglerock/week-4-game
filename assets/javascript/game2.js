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

  //choose hero

  //hero exists

  //choose opponent

  //opponent exists

  //make attack button

  //attack hero

  //attack opponent

  //defeated

  //windisplay

  //losedisplay



  //  Script

makeStartButton();

$("#start").on("click", function () {
    initialize();
})



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
