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
        $(".stable-area").empty();
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
        game.gameState = game.gameStates.pro;
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
    },
    attack: (pro, ant) => {
        console.log(pro);
        console.log(ant);
        let proHP;
        let antHP;
        antHP = parseInt(ant.hp, 10) - parseInt(pro.ap, 10);
        console.log(antHP);
        if (antHP > 0) {
            proHP = parseInt(pro.hp, 10) - parseInt(ant.cp, 10);
            if (proHP > 0){
                proAP = parseInt(pro.ap, 10) + parseInt(pro.base, 10);
                let ng = {
                    ...game,
                    protagonist: {
                        ...game.protagonist,
                        hp: proHP,
                        ap: proAP
                    },
                    antagonist: {
                        ...game.antagonist,
                        hp: antHP
                    }
                }
                game = ng;
                return game;
            } else {
                game.losses++
                $(".protagonist-area").empty();
                $(".antagonist-area").empty();
                $("#messages").empty().text(messages.heroDefeated);
                game.gameState = game.gameStates.res;
                game.showResults("lose");
                game.makeButton("Start Game", "start", "score-area");
            }
        } else {
            game.wins++;
            $("#messages").empty().text(messages.opponentDefeated);
            $(".antagonist-area").empty();
            game.gameState = game.gameStates.ant;
        }
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
            $("#messages").empty().text(messages.chooseOpponent);
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
            $("#messages").empty().text(messages.attack);
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
            $(".score-area").empty();
            game.makeButton("Attack", "attack", "score-area");
        }
    })

    $(document).on("click", "#attack", function() {
        if(game.gameState === game.gameStates.play){
            const p = game.protagonist;
            const a = game.antagonist;
            let result = game.attack(p, a);
            // console.log(result);
            
        }
    })
})
