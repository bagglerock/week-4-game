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

//  Script
$("#start").on("click", function() {
  $("#start").hide();
  initGame();
});

//  Functions
function initGame() {
  for (var i = 0; i < characters.length; i++) {
    var character = $("<div>");
    var image = $("<img>");
    character.addClass("character float").attr("id", characters[i].name);
    image.attr("src", characters[i].pic);
    $(".character-select").append(character);
    $(character).append(image);
  }
}
