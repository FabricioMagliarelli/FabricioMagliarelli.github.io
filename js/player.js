//cosntructor del jugador
var player

function Player(hp, mainHand, offHand, coins) {
    this.hp = hp
    this.mainHand = mainHand
    this.offHand = offHand
    this.coins = coins
}

//Equipos del jugador
let espadaOxidada = {
    name: "Espada Oxidada",
    attack: 2,
    damage: 10
}

let espadaDeHierro ={
    name: "Espada de Hierro",
    attack: 4,
    damage: 15

}

let espadaLegendaria ={
    name: "Espada Elfica Baradun",
    attack: 5,
    damage: 30
}

let escudoMadera = {
    name: "Escudo de Madera",
    defense: 2
}

let escudoMetal = {
    name: "Escudo de Metal",
    defense: 4
}

let escudoLegendario ={
    name: "Escudo de Roble Dorado",
    defense: 5
}