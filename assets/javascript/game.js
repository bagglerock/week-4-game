//  Array of characters to choose from
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
    pic: "./assets/images/sid.png"
  },
  {
    name: "vader",
    hp: 180,
    ap: 15,
    cp: 20,
    pic: "./assets/images/vader.jpg"
  }
];

//**  Script starts here  **//

//  Click the start button to set up the game and hide the start button
$("#start").on("click", function() {
  $("#start").hide();
  initGame();
});

$(".character-select").on("click", "div.character", function() {
  var heroLength = $(".hero").length;
  var opponentLength = $(".opponent").length;
  var className = $(this).attr("class");

  if (!heroLength) {
    $(this).remove();
    $(this).addClass("hero");
    $(".arena").append(this);
  } else if (!opponentLength && !className.includes("hero")) {
    $(this).removeClass("float-left");
    $(this).addClass("opponent float-right");
    var attackBtn = $("<button>");
    attackBtn.attr("id", "attack").text("Attack");
    $(".arena").append(attackBtn);
    $(".arena").append(this);
    $(".character-select div.character").fadeTo(1000, 0.2);
  }
});

$("#attack").on("click", function() {
  //reduce the hp of opponent by ap of hero and double hero ap

  //reduce the hp of the hero by cp of the opponent

});

//**  Functions  **//
function initGame() {
  //  Go through the array and set up each of the characters and append an image to each of the new divs
  for (var i = 0; i < characters.length; i++) {
    var character = $("<div>");
    var image = $("<img>");
    character.addClass("character float-left");
    character
      .attr("id", characters[i].name)
      .attr("hit-points", characters[i].hp)
      .attr("attack-power", characters[i].ap)
      .attr("counter-power", characters[i].cp);
    image.attr("src", characters[i].pic);
    $(".character-select").append(character);
    $(character).append(image);
  }
}
