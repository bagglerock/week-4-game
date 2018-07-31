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
    },
    showResults: (condition) => {
        const div = $("<div>");
        let wT = $("<p>");
        let lT = $("<p>");
        let cT = $("<p>");
        wT.text(`Wins: ${game.wins}`);
        lT.text(`Losses: ${game.losses}`);
        if(condition === "win"){
            cT.text(`Congratulations, you are a winner!`);
        } else {
            cT.text(`You lose. Sorry, try again.`);
        }
        div.append(cT, wT, lT);
        $(".score-area").empty().append(div);
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
        if (game.gameState === game.gameStates.pro) {
            game.gameState = game.gameStates.ant;
            let hero = $(this).detach();
            let ng = {
                ...game,
                protagonist: {
                    name: hero.attr("name"),
                    hp: hero.attr("hp"),
                    cp: hero.attr("cp"),
                    ap: hero.attr("ap"),
                    base: hero.attr("ap")
                }
            }
            game = ng;
            hero.appendTo($(".protagonist-area"));
        } else if (game.gameState === game.gameStates.ant){
            game.gameState = game.gameStates.play;
            let hero = $(this).detach();
            let ng = {
                ...game,
                antagonist: {
                    name: hero.attr("name"),
                    hp: hero.attr("hp"),
                    cp: hero.attr("cp"),
                    ap: hero.attr("ap"),
                }
            }
            game = ng;
            hero.appendTo($(".antagonist-area"));
            game.makeButton("Attack", "attack", "score-area");
        }
    })

    $(document).on("click", "#attack", function() {
        if(game.gameState === game.gameStates.play){
            const p = game.protagonist;
            const a = game.antagonist;
            if (game.protagonist.hp > 0 && game.antagonist.hp > 0) {
                let nHP = parseInt(p.hp, 10) - parseInt(a.cp, 10);
                let nHA = parseInt(a.hp, 10) - parseInt(p.ap, 10);
                let nAP = parseInt(p.ap, 10) + parseInt(p.base, 10);
                if (nHP <= 0){
                    game.losses++;
                    game.gameState = game.gameStates.res;
                    game.showResults("lose");
                } else if (nHA <= 0){
                    game.wins++;
                    game.gameState = game.gameStates.ant;
                } else {
                    let ng = {
                        ...game,
                        protagonist: {
                            ...game.protagonist,
                            hp: nHP,
                            ap: nAP
                        },
                        antagonist: {
                            ...game.antagonist,
                            hp: nHA
                        }
                    }
                    game = ng;
                }
            }
            console.log(game);
        }
    })
})
