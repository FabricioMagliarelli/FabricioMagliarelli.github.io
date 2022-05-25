
//batalla
var savedEnemyMove;

var battleLog;
var showBattleLog = document.querySelector("#text");
var attackButton = document.querySelector("#attack");
var counterButton = document.querySelector("#counter");

//start game
function enableButtons() {
    attackButton.disabled = false;
    counterButton.disabled = false;
}


//let calc = Math.floor((Math.random()*6)+1)

function fight(id) {
    enemyMove(id)
    battleOver()

}

function roundResults(battleLog) {
    showBattleLog.innerText = battleLog;
    showBattleLog.animate([{
        opacity: 0,},
        {opacity: 1,}
    ],500)
}

function battleOver() {
    if (player.hp <= 0) {
        battleLog = "has muerto. Fin del Juego"
        roundResults(battleLog)
        attackButton.disabled = true;
        counterButton.disabled = true;
        const button =document.createElement('button')
        button.innerText = "restart"
        button.classList.add("btn")
        button.addEventListener("click", () => startGame())
        button.addEventListener("click", () => enableButtons())
        
        optionButtonsElement.appendChild(button)

    } else if (enemy.hp <= 0) {
        battleLog = "Felicitaciones!!! luego de una feroz batalla, logras asestar el golpe final y acabar con tu Enemigo! Vencistes a " + enemy.name 
        roundResults(battleLog)
        attackButton.disabled = true;
        counterButton.disabled = true;
        textNode.options.forEach(option => {
            if (option.type == "postBattle") {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add("btn")
                button.addEventListener("click", () => selectOption(option))
                button.addEventListener("click", () => enableButtons())
                optionButtonsElement.appendChild(button)
            }
        })
    }
}
    //enemyMove
    function enemyMove(id) {
        var move = Math.floor((Math.random() * 100) + 1);
        if (move <= 50) {
            var savedEnemyMove = "attack";
        } else {
            var savedEnemyMove = "counter";
        }
        damageStep(id, savedEnemyMove);
        roundResults(battleLog)
    }

    function damageStep(p, e) {
        if (p == "attack" && e == "attack") {
            battleLog = "Realizas un ataque feroz a tu enemigo, infligiéndole "+player.mainHand.damage+" de Daño! El enemigo te devuelve el ataque infligiendote "+ enemy.damage+" de daño! la lucha se agudiza!";
            player.hp -= enemy.damage;
            enemy.hp -= player.mainHand.damage;
            showPlayerHp.innerHTML = '<i><i class="fa-solid fa-heart"></i></i>: ' + player.hp;

        } else if (p == "attack" && e == "counter") {
            let dice = Math.floor(Math.random() * 6);
            if (dice >= player.mainHand.attack) {
                player.hp -= enemy.damage * 1.5;
                showPlayerHp.innerHTML = '<i><i class="fa-solid fa-heart"></i></i>: ' + player.hp;
                battleLog = "Realizas un ataque feroz, pero es bloqueado por tu enemigo, el cual aproecha la oportunidad para asestarte un golpe que te infringe "+ enemy.damage * 1.5+" de daño! En guardia! la lucha continua";
            } else {
                enemy.hp -= player.mainHand.damage * 1.5;
                showPlayerHp.innerHTML = '<i><i class="fa-solid fa-heart"></i></i>: ' + player.hp;
                battleLog = "El enemigo intento blokear tu ataque, pero pudiste atravezar su defensa inflingiendole "+player.mainHand.damage * 1.5+" de Daño! No te confies, el enemigo se recupera del Golpe, la lucha continua!"
            }

        } else if (p == "counter" && e == "counter") {
            battleLog = "los combatientes pusieron posturas defensivas al mismo tiempo en vano."

        } else if (p == "counter" && e == "attack") {
            let dice = Math.floor(Math.random() * 6);
            if (dice >= player.offHand.defense) {
                player.hp -= enemy.damage * 1.5;
                showPlayerHp.innerHTML = '<i><i class="fa-solid fa-heart"></i></i>: ' + player.hp;
                battleLog = "Asumes una posicion defensiva, pero el ataque de tu enemigo es tan potente que rompe tus defenzas inflingiendote "+enemy.damage * 1.5+" de Daño! Levántate!! la pelea sigue!";
            } else {
                enemy.hp -= player.mainHand.damage * 1.5;
                showPlayerHp.innerHTML = '<i><i class="fa-solid fa-heart"></i></i>: ' + player.hp;
                battleLog = "Asumes una posicion defensiva y logras frenar el ataque de tu enemigo, aprovechas la apertura para asestarle un golpe certero que le infringe "+player.mainHand.damage * 1.5+" de Daño!! No te confies! tu enemigo sigue en pie!"
            }
        }
    }

//Game




