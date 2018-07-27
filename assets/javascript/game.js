const characters =[
    {
        name: "Luke Skywalker",           
        hp: 100,
        ap: 8,
        cp: 5,
        pic: "./assets/images/luke.jpg"
    },
    {
        name: "Obiwan Kenobe",
        hp: 120,
        ap: 10,
        cp: 8,
        pic: "./assets/images/obi.jpg"
    },
    {
        name: "Darth Sidious",
        hp: 150,
        ap: 12,
        cp: 12,
        pic: "./assets/images/sid.png"
    },
    {
        name: "Darth Vader",
        hp: 180,
        ap: 15,
        cp: 20,
        pic: "./assets/images/vader.jpg"
    }
];

const messages = {
    start: "Click \"start game\" to start game.",
    chooseHero: "Please choose your hero.",
    chooseOpponent: "Please choose your opponent.",
    attack: "Click attack to battle",
    opponentDefeated: "Your opponent has been defeated.  Choose you next opponent.",
    heroDefeated: "You lose.  Click the start button to battle again.",
    win: "Congratulations, you win.  Click the start button to battle again.",

};

let game = {
    wins: 0,
    losses: 0,
    protagonist: {},
    antagonist: {},
    gameState: 0,
    gameStates: {
        fin: 0,
        pro: 1,
        ant: 2,
        play: 3,
        res: 4
    },
    startGame: () => {
        characters.map((character, i) => {
            const stableCharDiv = $("<div>");
            const stableCharImg = $("<img>");
            stableCharImg
                .attr("src", character.pic)
                .attr("name", character.name)
                .attr("id", i)
                .attr("hp", character.hp)
                .attr("ap", character.ap)
                .attr("cp", character.cp)
                .addClass("image");
            stableCharDiv.append(stableCharImg);
            $(".stable-area").append(stableCharDiv);
        })
        $("#messages").empty().text(messages.chooseHero);
    },
    makeButton: (name, id, location) => {
        const button = $("<button>");
        button.attr("id", id).text(name);
        $(`.${location}`).append(button);
    }

};

$(document).ready(function() {

    $("#messages").text(messages.start);
    game.makeButton("Start Game", "start", "score-area");

    $(document).on("click", "#start", function() {
        if(game.gameState === game.gameStates.fin){
            game.gameState = game.gameStates.pro;
        }
        $(this).remove();
        game.startGame();
    })

    $(document).on("click", ".image", function(){
        console.log($(this).attr("id"));
        if (game.gameState === game.gameStates.pro) {
            game.gameState = game.gameStates.ant;
            let hero = $(this).detach();
            let ng = {
                protagonist: {
                    name: hero.attr("name"),
                    hp: hero.attr("hp"),
                    cp: hero.attr("cp"),
                    ap: hero.attr("ap")
                },
                ...game
            }
            game = ng;
            hero.appendTo($(".protagonist-area"));
        } else if (game.gameState === game.gameStates.ant){
            game.gameState = game.gameStates.play;
            let hero = $(this).detach();
            let ng = {
                antagonist: {
                    name: hero.attr("name"),
                    hp: hero.attr("hp"),
                    cp: hero.attr("cp"),
                    ap: hero.attr("ap")
                },
                ...game
            }
            game = ng;
            hero.appendTo($(".antagonist-area"));
            game.makeButton("Attack", "attack", "score-area");
        }
    })

    $(document).on("click", "#attack", function() {
        if(game.gameState === game.gameStates.play){
            console.log(game.protagonist.name);


            
            
            
        }
    })
      

})
