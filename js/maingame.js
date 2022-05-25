
var textElement = document.querySelector("#text")
var optionButtonsElement = document.querySelector("#option-buttons")
var showPlayerHp = document.querySelector("#playerHp");
var showMainHand = document.querySelector("#mainHand");
var showOffHand = document.querySelector("#offHand");
var showItem = document.querySelector("#item");
var textNode

var state = {}

function showPlayerState() {
    showPlayerHp.innerHTML = '<i><i class="fa-solid fa-heart"></i></i>: ' + player.hp;
    showMainHand.innerHTML = '<i class="fa-solid fa-khanda"></i>: ' + player.mainHand.name;
    showOffHand.innerHTML = '<i class="fa-solid fa-shield-halved"></i>: ' + player.offHand.name;
    showItem.innerHTML = '<i class="fa-solid fa-sack-dollar"></i>: ' + player.coins
}

function setPlayer(hp, mainHand, offHand, coins) {
    player = new Player(hp, mainHand, offHand, coins)
}

function setEnemy(name, hp, damage) {
    enemy = new Enemy(name, hp, damage)
}

function startGame() {
    setPlayer(200, espadaOxidada, escudoMadera, 0);
    showPlayerState();
    state = {}
    showTextNode(1)
}

function showTextNode(index) {
    textNode = textNodes.find(textNode => textNode.id === index)
    textElement.innerText = textNode.text
    textElement.animate([{
        opacity: 0,},
        {opacity: 1,}
    ],500)
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            if (option.type == null) {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add("btn")
                button.addEventListener("click", () => selectOption(option))
                optionButtonsElement.appendChild(button)
            } else if (option.type == "attack") {
                optionButtonsElement.appendChild(attackButton)
            } else if (option.type == "counter") {
                optionButtonsElement.appendChild(counterButton)
            } else if (option.type == "preBattle") {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add("btn")
                button.addEventListener("click", () => selectOption(option))
                button.addEventListener("click", () => option.updateEnemy())
                optionButtonsElement.appendChild(button)
            } else if (option.type == "setPlayer") {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add("btn")
                button.addEventListener("click", () => selectOption(option))
                button.addEventListener("click", () => option.updatePlayer())
                optionButtonsElement.appendChild(button)
            }
        }
    })

}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextNode
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "El reinado del virtuoso rey Athelstan llego drásticamente a su fin. Su reinado es recordado como el mejor. Trajo abundancia y Paz al pueblo. Pero Su hermano Morkor, Líder de la orden de los Caballeros Oscuros, siempre ansió el trono. Apenas tuvo la oportunidad, inrumpio en el castillo acompañado de su Orden y derrotó a la Guardia Real, asesino a su hermano junto a la reina y todos los herederos, Asiéndose con el total control del reino.",
        options: [
            {
                text: "continuar",
                nextNode: 2,
            },
            {
                text: "omitir",
                nextNode: 6,
            }
        ]

    },
    {
        id: 2,
        text: "Antes las injusticias del tirano, muchos se levantaron en armas para tratar de derrocarlo, héroes que enfrentaron a Morkor y a su orden de caballeros oscuros en su mismo castillo, pero todos fueron derrotados.",
        options: [
            {
                text: "continuar",
                nextNode: 3,
            },
            {
                text: "omitir",
                nextNode: 6,
            }
        ]

    },
    {
        id: 3,
        text: "Uno de estos Héroes, conocido como “Alexander el Cazador”, Atravesó el castillo del tirano, armado con su espada y escudos legendarios, herencia de su familia y acompañado de su fiel compañero de caza, el gigante lobo Fenril. Su habilidad como espadachín era tan excelente como su habilidad con el arco y logro vencer a todos los caballeros Oscuros. Luego de dejar mal herido al jefe de la Orden, Ferindur, dirijio su espada hacia Morkor, para terminar de una vez con su tiranico gobierno.",
        options: [
            {
                text: "continuar",
                nextNode: 4,
            },
            {
                text: "omitir",
                nextNode: 6,
            }
        ]

    },
    {
        id: 4,
        text: "La batalla fue pareja, pero Morkor poco a poco fue ganando ventaja. Su habilidad con la espada era inigualable y logro asestar un golpe terrible contra Alexander, quien mal herido, logro huir a pocas penas del castillo con ayuda de su fiel lobo. Esa fue la única vez que el Reinado de Morkor estuvo a punto de terminar. El sigue en su castillo, gobernando, defendido por Ferindur, el único sobreviviente de su Orden de Caballeros oscuros. En cuanto a Alexander, nunca más se le ha vuelto a ver.",
        options: [
            {
                text: "continuar",
                nextNode: 5,
            },
            {
                text: "omitir",
                nextNode: 6,
            }
        ]

    },
    {
        id: 5,
        text: "De todas formas, el reino se sigue oponiendo al tirano y de tanto en cuando, un nuevo Guerrero aparece, con espada y escudo en mano. Tu eres uno de ellos, nacido de humilde casa, armado solo con una espada oxidada y un escudo de madera, pero con la irrevocable convicción de derrocar a Morkor. Comienzas tu viaje. Frente ti se levanta un frondoso bosque ¿que haces?",
        options: [
            {
                text: "adentrarse en el bosque",
                nextNode: 6,
            }
        ]
    },
    {
        id: 6,
        text: "Recorres el bosque. Te abres paso entre los árboles y los matorrales. No es la primeras que lo haces y logras Ubicarte. Sabes que mas al norte esta el Pueblo llamado “Pueblo Negro”, ultimo asentamiento antes del Castillo de Morkor. Te diriges en esa dirección. De repente escuchas las hojas moverse, y de la vegetación en frente, salta un Goblin con daga en mano. Una vil criatura que se aprovecha de los viajeros desprevenidos, asesinándolos y robándoles sus pertenencias. ",
        options: [
            {
                text: "desenvainas tu espada y levantas tu escudo!",
                nextNode: 7,
                type: "preBattle",
                updateEnemy() {
                    setEnemy("Goblin", 100, 2)
                }

            },
            {
                text: "huyes despavorido ",
                nextNode: 8,
            }
        ]
    },
    {
        id: 7,
        text: "El Goblin no retrocede, te mira fijo con sed de sangre. Comienza el combate!",
        options: [
            {
                text: "atacar",
                type: "attack"

            },
            {
                text: "defender",
                type: "counter"
            },
            {
                text: "continuar",
                type: "postBattle",
                nextNode: 9,

            }

        ]
    },
    {
        id: 8,
        text: "parece que tu irrevocable convicion no era tan... irrevocable, vuelves a tu pueblo a vivir bajo el yugo de Morkor. Habra que esperar a otro guerrero... un poco mas valiente. FIN DEL JUEGO!",
        options: [
            {
                text: "restart",
                nextNode: -1
            }
        ]
    },
    {
        id: 9,
        text: "Recuperas aire, el combate fue canzador, pero te recompones en la victoria. revisas el cuerpo del goblin y encuentras una bolas con 100 monedas.",
        options: [
            {
                text: "tomar las monedas y seguir con tu camino",
                nextNode: 10,
                type: "setPlayer",
                updatePlayer() {
                    setPlayer(200, player.mainHand, player.offHand, 100),
                        showPlayerState()
                },
                setState: { coins: true }
            }
        ]
    },
    {
        id: 10,
        text: "Llegas al Pueblo Negro. te encuentras con bastante movimiento, aunque todos los pueblerinos llevan caras largas. Ves una posada y un burdel, pero no tienens tiempo para eso. Sigues de largo y te diriges a la plaza central del pueblo. Allí encuentras a un herrero, parece habil podrias intercambiar las monedas por mejor equipo. En frente de el ves a un pobre vagabundo, vestido con arapos.",
        options: [
            {
                text: "Hablar con el herrero a ver que puede ofrecerte",
                nextNode: 11


            },
            {
                text: "Hablar con el vagabundo.",
                nextNode: 12


            },
        ]
    },
    {
        id: 11,
        text: "El herrero te recibe con una amblia sorrisa:'Bienvenido Guerrero. Veo que te dirijes al castillo de Morkor, muchos valiente como tu pasan por aqui, pero olvidate poder vencer con ese equipo mal trecho. No te preocupes, tengo lo que necesitas. Puedo ofrecerte esta espada y este escudo, pertenecieron al mismo Alexander, yo mismo se las forje. puedo ofresertelos por solo 100 monedas, que dices'?",
        options: [
            {
                text: "acepta el trato, armas legendarias como estas es todo lo que necesitas para vencer a Morkor, no puedes rechazarlas",
                type: "setPlayer",
                requiredState: (currentState) => currentState.coins,
                updatePlayer() {
                    setPlayer(200, espadaDeHierro, escudoMetal, 0),
                        showPlayerState()
                },
                setState: { coins: false },
                nextNode: 13,



            },
            {
                text: "decides pensarlo un poco y sigues recorriendo la plaza",
                nextNode: 13,
                requiredState: (currentState) => currentState.coins

            },
            {
                text: "No te queda una sola moneda, sigues recorriendo la plaza",
                nextNode: 13,
                requiredState: (currentState) => !currentState.coins

            },
        ]
    },
    {
        id: 13,
        text: "Te encuentras en la plaza central pueblo, ¿que haras ahora?",
        options: [{
            text: "Hablar con el herrero",
            nextNode: 11


        },
        {
            text: "Hablar con el vagabundo.",
            nextNode: 12,
            requiredState: (currentState) => !currentState.quest && !currentState.negation

        },
        {
            text: "sales en busca del anillo del Vagabundo",
            nextNode: 15,
            requiredState: (currentState) => currentState.quest


        },
        {
            text: "Te diriges al Castillo de Morkor, es hora de terminar tu viaje.",
            nextNode: 90,



        },
        ]
    },
    {
        id: 12,
        text: "te hacercas al vagabundo, el alza su mirada hacia ti. Parece tener una antigua lecion en su brazo derecho y a pesar de su deplorable estado, te llaman la atencion los ojos filosos con los que te mira: -Oh noble guerrero, veo que llevas una bolsa con monedas. El herrero podria darte buenas armas por ese dinero pero... ayudarias a un pobre vagabundo?? hace dias que no como, me entregarias esa bolsa de monedas a mi para poder comprar algo de comida?",
        options: [{
            text: "Entregarle la bolsa, te quedaras sin nada, pero estaras haciendo una buena accion",
            nextNode: 14,
            type: "setPlayer",
            requiredState: (currentState) => currentState.coins,
            updatePlayer() {
                setPlayer(player.hp, player.mainHand, player.offHand, 0),
                    showPlayerState()
            },
            requiredState: (currentState) => currentState.coins,
            setState: { coins: false }



        },
        {
            text: "sospechas de este hombre. Esa mirada no es la de un desposeido y con 100 monedas podria comprar un poco mas que solo algo de comida. Prefieres guardarte el dinero para comprar mejor equipo.",
            nextNode: 13,
            requiredState: (currentState) => currentState.coins


        },
        {
            text: "no tienes monedas para darle",
            nextNode: 13,
            requiredState: (currentState) => !currentState.coins && !currentState.quest



        }
        ]
    },
    {
        id: 14,
        text: "Le entregas la bolsa al pobre hombre. Lo notas sorprendido, pareciera estar mas contento por el acto mismo que por las monedas en si.te mira fijamente y dice: -'oh muchas gracias noble aenturero. No quiero abusar de tu buena voluntad, pero pareces dispuesto a ayudar a los necesitados. Mi unica posesion era el anillo de mi difunta esposa, pero lo perdi en el bosque y con esta lecion en mi brazo seria comida para los trolls que habitan en el bosque. ¿Serias capaz de irlo a buscar por mi? se que lo perdi en el lado este del bosque.",

        options: [
            {
                text: "Te compadeces del pobre hombre y decides ayudarlo, esos trolls podrian ser un buen calentamiento antes de enferntar al Tirano ¿Que podria salir mal?",
                nextNode: 13,
                setState: { quest: true },
                requieredState: (currentState) => !currentState.negation
            },
            {
                text: "Enfrentarse a trolls por un anillo? esta loco, ya bastante que le diste tu bolsa de dinero. Te das media vuelta y sigues con tu viaje.",
                nextNode: 13,
                setState: { negation: true },

            },



        ]

    },
    {
        id: 15,
        text: "Te adentras en el bosque. Te diriges directo al este, a donde te guio el vagabundo. El dia es muy hermoso, escuchas lso pajaros cantar. todo esta muy tranquilo. De repente notas un brillo en el rabillo de tu ojo, giras y lo ves, en un matorral, ahi esta el anillo que te pidio el vagabundo!! pero te parece sospechoso",

        options: [
            {
                text: "Te dirijes a tomar el anillos",
                nextNode: 16
            },
            {
                text: "Las sospechas te vencen, algo huele mal aqui, decides abandonar esta busqueda, ese vagabundo no es de fiar.",
                nextNode: 13,
                setState: { negation: true, quest: false }
            },

        ]
    },
    {
        id: 16,
        text: "un rugido terrible se escucha detras del matorrar, y ahi te das cuenta, no era un matorral, era la mismisima guarida de un Troll. El mismo salle de ella, enorme, con garrote en mano, ahora eres su presa",

        options: [
            {
                text: "Desenvaina tu espada!! llego la hora del precalentamiento!",
                nextNode: 18,
                type: "preBattle",
                updateEnemy() {
                    setEnemy("Troll", 100, 8)
                }
            },
            {
                text: "oh dios! es mucho peor de lo que imaginabas, sales corriendo!!.",
                nextNode: 17,
                setState: { negation: true, quest: false }
            },

        ]
    },
    {
        id: 17,
        text: "el Troll te percigue, es mucho mas rapido de lo que pensabas, te alcanza y te sujeta con fuerza con su enorme mano. Sientes como todos tus hueso crugen. Pierdes la conciencia meintras te lleva hacia su enorme boca avierta. HAS MUERTO!! FIN DEL JUEGO",

        options: [
            {
                text: "restart",
                nextNode: -1
            }
        ]
    },
    {
        id: 18,
        text: "El Troll se yergue imponente frente a ti. Comienza el combate!",
        options: [
            {
                text: "atacar",
                type: "attack"

            },
            {
                text: "defender",
                type: "counter"
            },
            {
                text: "continuar",
                type: "postBattle",
                nextNode: 19,
            }

        ]
    },
    {
        id: 19,
        text: "Por dios! que enemigo! fue un poco mas que un calentamiento, pero pudiste venserlo. Estas cansado, herido, pero orgullo de tu vintoria. Te diriges a harrar el anillo. Se escucha un aullido de un lobo. A tu derecha, de los matorrales sale un lobo gigante. De color plateado, porta un escudo en su lombo y en su mandibula empuña una espada de fabricacion esquicita. se avalanza contra ti. Todavia no te recuperas de la batalla anterior ¿que ahras?",

        options: [
            {
                text: "Con las pocas fuerzas que te quedan levantas tu espada! acabemos con esto!",
                nextNode: 20
            },
            {
                text: "con lo poco que te quedan de fuerzas corres hacia el pueblo. Sobrevives, pero no quieres ni hacercarte otra vez a ese vagabundo.",
                nextNode: 13,
                setState: { negation: true, quest: false }

            }
        ]
    },
    {
        id: 20,
        text: "El lobo frena en su carga contra ti. Toda intencion de atacarte se extinguio de sus ojos. Incluso pareciera... complacido. Se va, en direccion al pueblo. lo puerdes de vista. Respiras profundo, El peligro al fin termino!",

        options: [
            {
                text: "te recuperas del combate, tomas el anillo y vuelves al pueblo",
                type: "setPlayer",
                updatePlayer() {
                    setPlayer(200, player.mainHand, player.offHand, 0),
                        showPlayerState()
                },
                nextNode: 21
            }
        ]
    },
    {
        id: 21,
        text: "Llegas al pueblo y no puedes creer lo que ves. En la entrada del mismo esta el vagabundo con su mano sada apollada sobre la cabeza del Lobo gigante que te encontraste hace un rato. Sentado y tranquilo, ahora parece un cachorro inofensivo. El vagabundo te habla: -'ja, al fin volviste guerrero, no hace faltas que digas nada, ya mi compañero lobo me conto todo.'",

        options: [
            {
                text: "O por dios! solo hay una persona capaz de domar un lobo asi! acaso este vagabundo es...",
                nextNode: 22
            }
        ]
    },
    {
        id: 22,
        text: "el vagabundo se rie: -'jaja, veo que ya te diste cuenta quien soy. Si soy Alexander el cazador... o al menos lo que queda de el. Eh estado en este pueblo durante años, esperando mi sucesor para entregarle mi Espada y escudo magicos, pero no pensaba darselo a cualquiera. Tenia que ser alguien digno, alguien noble que s epreocupara por el pueblo.",

        options: [
            {
                text: "ves que toma su espada y escudo y te las entrega",
                nextNode: 23
            }
        ]
    },
    {
        id: 23,
        text: "Pocas personas me han entregado sus monedas de oro y no recuerdo a nadie que halla enfrentado un troll por una baratija, y mucho menos enfentarse a un lobo gigante. Si, eso que te mande a buscar era un simple pedazo de cobre que enocntre por ahi, nunca tuve esposa. Era un token para poner a prueba a los guerreros que llegaran aqui y tu la aspasado ampliamente. Ve guerrero!! cumple con el destino que yo no pude cumplir. Tienes aptitudes y con estas armas, Podras vencer Morkor!",

        options: [
            {
                text: "te equipas tus nuevas armas, siente su magia en el mismo momento que las empuñas. Emprendes camino hacia el Castillo de Morkor.",
                type: "setPlayer",
                updatePlayer() {
                    setPlayer(200, espadaLegendaria, escudoLegendario, 0),
                        showPlayerState()
                },
                setState: { legendary: true, quest: false },

                nextNode: 90,



            }
        ]
    },
    {
        id: 90,
        text: "Llegas a las puertas del castillo, entras. No hay guardias ni sirvientes, una carcaza oscura y vacia, lo unico que queda aqui es Morkor, que gobierna con tanta seguridad el solo se encarga de eliminar a quienes lo desafian. llegas a sus aposentos y alli esta, en su trono vestido con su armadura negra, su espada imponente y su escudo inquebrantable.",

        options: [
            {
                text: "desevainas tus armas legendarias, te prepara para la batalla final",
                requiredState: (currentState) => currentState.legendary,
                nextNode: 91
            },
            {
                text: "desevainas tus armas, te prepara para la batalla final",
                requiredState: (currentState) => !currentState.legendary,
                nextNode: 92
            }
        ]
    },
    {
        id: 91,
        text: "Morkor reconoce tus armas: -'ohhhh, al fin encontro un heredero, bien.... al fin un enemigo digno.",

        options: [
            {
                text: "Comenzar la batalla final",
                type: "preBattle",
                updateEnemy() {
                    setEnemy("Caballero Oscuro, Morkor", 200, 50)
                },
                nextNode: 93
            }
        ]
    },
    {
        id: 92,
        text: "Morkor se levanta de su trono y alza sus armas: -'Otro insecto molesto, bien... terminemos esto rapido!'",

        options: [
            {
                text: "Comenzar la batalla final",
                type: "preBattle",
                updateEnemy() {
                    setEnemy("Caballero Oscuro, Morkor", 200, 50)
                },
                nextNode: 93
            }
        ]
    },
    {
        id:93,
        text: "En guardia Morkor!",

        options: [
            {
                text: "atacar",
                type: "attack"

            },
            {
                text: "defender",
                type: "counter"
            },
            {
                text: "continuar",
                type: "postBattle",
                nextNode: 94,
            }

        ]
    },
    {
        id:94,
        text: "luego de una terrible batalla venciste al fin al Caballero Oscuro, su tiranico gobierno ah terminado.",

        options: [
            {
                text: "volver al pueblo a dar la buena noticia.",
                requiredState: (currentState) => currentState.legendary,
                nextNode: 95
            },
            {
                text: "volver al pueblo.",
                requiredState: (currentState) => !currentState.legendary,
                nextNode: 96
            }
        ]
    },
    {
        id: 95,
        text: "final bueno todos contentos, el alexander te felicita bla bla bla. FELICIDADES, GANASTE EL JUEGO. ESTE ES EL FINAL BUENO. VUELVE A PROBAR PERO ESTA VEZ SIN LA AYUDA DE ALEXANDER.",

        options: [
            {
                text: "Volver a jugar",
                nextNode:-1
            }
        ]
    },
    {
        id: 96,
        text: "Lograste vencer a Morkor, sin la ayuda de nadie, ahora van a ver, ahora voy a gobernar tiranicamente yo. FELICIDADES, GANASTE EL JUEGO. ESTE ES EL FINAL MALO. PRUEBA HABLAR CON EL VAGABUNDO LA PROXIMA.",

        options: [
            {
                text: "Volver a jugar",
                nextNode:-1
            }
        ]
    }


  

















]



startGame()

