
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
        text: "El legendario reino de Skagard no era como cualquier reino. Sus tierras estaban totalmente rodeadas por el bosque encantado Skag, lo que lo mantenía prácticamente aislado de los demás territorios. La familia real de Skagard mantenía buena relación con las Nayades y los Elfos que habitaban el bosque y juntos mantenían a raya a los Goblins, Trolls y las otras viles criaturas de Skag… hasta que Morkor se hizo con el poder. ",
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
        text: "Morkor era el hermano del bondadoso Rey Athelstan y, como dictaba la costumbre, el general de la orden de los Caballeros Oscuros, la unidad militar de elite del reino, cuya misión era hacer incursiones en los bosques y defender al reino. Algunos creen que fue por simple avaricia, otros, que un brujo del bosque envenenó sus oídos, pero aquel día Morkor dirigió su Orden contra el castillo, derroto a la guardia real y mato a su hermano, la reina y a todos los herederos, haciéndose con el Reino.",
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
        text: "No todos los caballeros oscuros estuvieron de acuerdo con la rebelión, y algunos se le opusieron. En particular el Gran Cazador Alexander, reconocido por sus habilidades con el arco, la espada y el gran lobo azul que creio desde cachorro 'Lomo de Plata'. Alexander dirigió una revuelta contra el Tirano. ayudado por las Nayades y Elfos del bosque. Estos le confirieron dos artefactos legendarios capaces de vencer la magia oscura: El escudo de Roble Dorado y La espada élfica Baradun.",
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
        text: "Los rebeldes y sus aliados del bosque iniciaron juntos un asalto contra castillo de Morkor, pero el estaba preparado. Mientras su Orden de caballeros oscuros defendía las puertas del castillo, un ejercito de goblins y trolls, los nuevos aliados del tirano, atacaron a los asediantes desde la retaguardia. ¡Así y todo, los rebeldes presentaron una feroz batalla! Los caballeros de Alexander lograron derrotar a la Orden y llegaron a los aposentos de Morkor, donde se dio el combate mano a mano contra Morkor.",
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
        text: "La pelea fue pareja, pero al final Morkor logro asestar un golpe terrible contra Alexander, dejándolo mal herido. Con ayuda de sus hombres escapo a duras penas del castillo… jamás se le volvió a ver. Las secuelas de aquella batalla fueron devastadoras para el reino. Los elfos y náyades quedaro recluidos en el bosque, ahora dominado por las criaturas malignas. Morkor quedo sin su guardia, pero el pueblo quedo demasiado debilitado como para volverse a levantar contra él y así Skagard quedo estacada durante años.",
        options: [
            {
                text: "continuar",
                nextNode: 6,
            },
            {
                text: "omitir",
                nextNode: 7,
            }
        ]
    },
    {
        id: 6,
        text: "Sin embargo, muchos de los sobrevivientes de la gran batalla lograron escapar a tierras lejanas y allí esparcieron las leyendas sobre este escondido reino rodeado por el bosque Skag: '¡Aquel que lograra derortar a Morkor, podría reclamar el Trono'! Tu eres uno de tantos valientos que se aventuraron en el lejano reino, en busca de gloria… y de una corona por supuesto. El gran bosque encantado Skag se yergue frente a ti, ¿Qué harás ahora?",
        options: [
            {
                text: "Entrar al Bosque!",
                nextNode: 7,
            },
        ]
    },
    
    {
        id: 7,
        text: "Recorres el bosque. Te abres paso entre los árboles y los matorrales. Logras ubicarte. Sabes que al norte se encuentra el “Pueblo Negro”, ultimo asentamiento antes del Castillo de Morkor. Te diriges en esa dirección. De repente escuchas las hojas moverse, y de la vegetación salta un Goblin con daga en mano. Una vil criatura que se aprovecha de los viajeros desprevenidos, asesinándolos y robándoles sus pertenencias. ",
        options: [
            {
                text: "¡desenvainas tu espada y levantas tu escudo!",
                nextNode: 8,
                type: "preBattle",
                updateEnemy() {
                    setEnemy("Goblin", 50, 2)
                }

            },
            {
                text: "huyes despavorido ",
                nextNode: 9,
            }
        ]
    },
    {
        id: 8,
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
                nextNode: 10,

            }

        ]
    },
    {
        id: 9,
        text: "parece que tu irrevocable convicion no era tan... irrevocable, vuelves a tus tierras y quedas en el olvido. Habra que esperar a otro aventurero... un poco mas valiente. FIN DEL JUEGO!",
        options: [
            {
                text: "Volver a Empezar",
                nextNode: -1
            }
        ]
    },
    {
        id: 10,
        text: "Recuperas aire, el combate fue canzador, pero te recompones en la victoria. revisas el cuerpo del goblin y encuentras una bolas con 100 monedas.",
        options: [
            {
                text: "Tomar las monedas y seguir con tu camino",
                nextNode: 11,
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
        id: 11,
        text: "Llegas al Pueblo Negro. El lugar esta venido abajo. Todos los campesinos llevan caras largas. Te diriges a la plaza central. Desde allí puedes ver un herrero, parece habil podrias intercambiar las monedas por mejor equipo. En frente de el ves a un pobre vagabundo, vestido con arapos. Y mas alla la salida del pueblo, camino que te lleva directo hasta el castillo de Morkor.",
        options: [
            {
                text: "Hablar con el herrero a ver que puede ofrecerte",
                nextNode: 12


            },
            {
                text: "Hablar con el vagabundo.",
                nextNode: 13


            },
            {
                text: "Te diriges al Castillo de Morkor, es hora de terminar tu viaje.",
                nextNode: 90,
    
    
    
            },
        ]
    },
    {
        id: 12,
        text: "El herrero te recibe con una amblia sorrisa:'Bienvenido Guerrero. Veo que te dirijes al castillo de Morkor, muchos valiente como tu pasan por aqui... pocos vuelven, y ninguno entero jajaja. No te preocupes, tengo lo que necesitas. Puedo ofrecerte esta espada y este escudo, no son las armas legendarias de Alexander pero son de fino hierro. puedo ofresertelos por solo 100 monedas, que dices'?",
        options: [
            {
                text: "aceptas el trato",
                type: "setPlayer",
                requiredState: (currentState) => currentState.coins,
                updatePlayer() {
                    setPlayer(200, espadaDeHierro, escudoMetal, 0),
                        showPlayerState()
                },
                setState: { coins: false },
                nextNode: 14,



            },
            {
                text: "decides pensarlo un poco",
                nextNode: 14,
                requiredState: (currentState) => currentState.coins

            },
            {
                text: "No tienes una sola moneda",
                nextNode: 14,
                requiredState: (currentState) => !currentState.coins

            },
        ]
    },
    {
        id: 14,
        text: "Te encuentras en la plaza central, ¿que haras ahora?",
        options: [{
            text: "Hablar con el herrero",
            nextNode: 12


        },
        {
            text: "Hablar con el vagabundo.",
            nextNode: 13,
            requiredState: (currentState) => !currentState.quest && !currentState.negation && !currentState.legendary

        },
        {
            text: "sales en busca del anillo del Vagabundo",
            nextNode: 16,
            requiredState: (currentState) => currentState.quest


        },
        {
            text: "Te diriges al Castillo de Morkor, es hora de terminar tu viaje.",
            nextNode: 90,



        },
        ]
    },
    {
        id: 13,
        text: "te acercas al vagabundo, el alza su mirada hacia ti. Parece tener una antigua lesión en su brazo derecho y a pesar de su deplorable estado, te llaman la atención los ojos filosos con los que te mira: -'Oh noble guerrero, veo que llevas una bolsa con monedas. El herrero podría darte buenas armas por ese dinero, pero... ¿ayudarías a un pobre vagabundo como yo? hace días que no cómo, y con el dinero que veo que traes encima podría comer durante semanas. ¿Qué dices?'",
        options: [{
            text: "Entregarle las monedas",
            nextNode: 15,
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
            text: "sospechas de este hombre, no le das nada",
            nextNode: 14,
            requiredState: (currentState) => currentState.coins


        },
        {
            text: "no tienes monedas para darle",
            nextNode: 14,
            requiredState: (currentState) => !currentState.coins && !currentState.quest



        }
        ]
    },
    {
        id: 15,
        text: "Le entregas la bolsa al pobre hombre. Lo notas sorprendido, pareciera estar más contento por el acto mismo que por las monedas en sí. Te mira fijamente y dice: -'oh muchas gracias noble aventurero. No quiero abusar de tu buena voluntad, pero pareces dispuesto a ayudar a los necesitados. La única posesión que me quedaba era el anillo de mi difunta esposa, pero lo perdí en el bosque y con esta lesión en mi brazo seria comida para los trolls que allí habitan. ¿Serias capaz de ir a buscarlo por mí? sé que lo perdí en el lado este del bosque.'",

        options: [
            {
                text: "Te compadeces del pobre hombre y decides ayudarlo",
                nextNode: 14,
                setState: { quest: true },
                requieredState: (currentState) => !currentState.negation
            },
            {
                text: "Enfrentarse a trolls por un anillo? esta loco.",
                nextNode: 14,
                setState: { negation: true },

            },



        ]

    },
    {
        id: 16,
        text: "Te adentras en el bosque. Te diriges directo al este. El dia es muy hermoso, escuchas los pajaros cantar. todo esta muy tranquilo. De repente notas un brillo en el rabillo de tu ojo, giras y lo ves, en un matorral  ¡ahi esta el anillo que te pidio el vagabundo! pero tanta tranquilidad te parece sospechoso...",

        options: [
            {
                text: "Te dirijes a tomar el anillos",
                nextNode: 17
            },
            {
                text: "Las sospechas te vencen, vuelves al pueblo. Ese vagabundo no es de fiar.",
                nextNode: 14,
                setState: { negation: true, quest: false }
            },

        ]
    },
    {
        id: 17,
        text: "un rugido terrible se escucha detras del matorral, y ahi te das cuenta, no era un matorral, era la guarida de un Troll. Enorme, sale a tu encuentro, con garrote en mano, ahora eres su presa",

        options: [
            {
                text: "¡Desenvaina tu espada!",
                nextNode: 19,
                type: "preBattle",
                updateEnemy() {
                    setEnemy("Troll", 100, 8)
                }
            },
            {
                text: "¡oh dios! es mucho peor de lo que imaginabas, ¡sales corriendo!.",
                nextNode: 18,
                setState: { negation: true, quest: false }
            },

        ]
    },
    {
        id: 18,
        text: "el Troll te persigue, es mucho más rápido de lo que pensabas, te alcanza y te sujeta con fuerza con su enorme mano. Sientes como todos tus huesos crujen. Pierdes la conciencia mientras te devora. ¡HAS MUERTO! FIN DEL JUEGO",

        options: [
            {
                text: "Volver a Empezar",
                nextNode: -1
            }
        ]
    },
    {
        id: 19,
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
                nextNode: 20,
            }

        ]
    },
    {
        id: 20,
        text: "¡Por dios! ¡Que enemigo! costó, pero pudiste vencerlo. Estas cansado, herido, pero orgulloso de tu victoria. Te diriges a agarrar el anillo. En ese momento escuchas un aullido. De la vegetación a tu derecha, se abre paso un lobo gigante de color plateado. Porta un escudo dorado en su lomo y con su mandíbula empuña una espada de fabricación élfica. se abalanza contra ti. Todavía no te recuperas de la batalla anterior ¿que haces?",

        options: [
            {
                text: "Con las pocas fuerzas que te quedan levantas tu espada! acabemos con esto!",
                nextNode: 21
            },
            {
                text: "con lo poco que te quedan de fuerzas corres hacia el pueblo. Sobrevives, pero no quieres ni hacercarte otra vez a ese vagabundo.",
                nextNode: 14,
                setState: { negation: true, quest: false }

            }
        ]
    },
    {
        id: 21,
        text: "El lobo frena en su carga contra ti. Toda intención de atacarte parece haberse extinguido de sus ojos. Incluso pareciera... complacido. Se va, en dirección al pueblo. lo pierdes de vista. Respiras profundo, ¡El peligro al fin termino!",

        options: [
            {
                text: "te recuperas del combate, tomas el anillo y vuelves al pueblo",
                type: "setPlayer",
                updatePlayer() {
                    setPlayer(200, player.mainHand, player.offHand, 0),
                        showPlayerState()
                },
                nextNode: 22
            }
        ]
    },
    {
        id: 22,
        text: "Llegas al pueblo y no puedes creer lo que ves. En la entrada te encuentras al vagabundo acariciando la cabeza del gran lobo. Sentado y tranquilo, ahora parece un cachorro inofensivo. El vagabundo se dirige a ti: -'ja, al fin volviste guerrero, no hace faltas que digas nada, ya mi compañero lobo me conto todo.'",

        options: [
            {
                text: "O por dios! solo hay una persona capaz de domar un lobo asi! acaso este vagabundo es...",
                nextNode: 23
            }
        ]
    },
    {
        id: 23,
        text: "el vagabundo se ríe y con una amplia sonrisa te dice: -'Veo que ya te diste cuenta quien soy. Soy Alexander el cazador... o al menos lo que queda de él. En mi estado actual ya no puedo enfrentar a Morkor, por eso me quede en este pueblo, esperando durante años, a un guerrero digno de mi herencia. Perdón por ponerte a prueba, pero tenía que asegurarme que seas digno'.",

        options: [
            {
                text: "ves que toma la espada y el escudo del lobo y te las entrega",
                nextNode: 24
            }
        ]
    },
    {
        id: 24,
        text: "Pocas personas me han entregado sus monedas de oro y no recuerdo a nadie que se haya atrevido a enfrentar a ese troll por una baratija. Mucho menos a un lobo gigante. Toma, esta es Baradun la legendaria espada élfica y este es el escudo de Roble Dorado de las Náyades. As probado tu valía y tu habilidad. ¡Con estas armas Morkor no tiene oportunidad contra ti! eh? el anillo? descartalo, era solo una pieza de cobre que encontre por ahi, jamas tuve esposa jajaja",

        options: [
            {
                text: "te equipas tus nuevas armas agradecido. Te diriges al pueblo a descansar un poco",
                type: "setPlayer",
                updatePlayer() {
                    setPlayer(200, espadaLegendaria, escudoLegendario, 0),
                        showPlayerState()
                },
                setState: { legendary: true, quest: false },

                nextNode: 14,



            }
        ]
    },
    {
        id: 90,
        text: "Llegas a las puertas del castillo. No hay guardias. Una carcasa oscura y vacía, eso te parece este lugar. Entras en ella. Recorres pasillos interminables hasta llegar al gran salón. En su trono vestido con su armadura negra, su espada imponente y su escudo inquebrantable se encuentra Morkor, listo para acabar con tu ambición.",

        options: [
            {
                text: "desevainas tus armas legendarias, te preparas para la batalla final",
                requiredState: (currentState) => currentState.legendary,
                nextNode: 91
            },
            {
                text: "desevainas tus armas, te prepara para la batalla final",
                requiredState: (currentState) => !currentState.legendary,
                nextNode: 92
            },
        ]
    },
    {
        id: 91,
        text: "Morkor reconoce tus armas: -'ohhhh, parece que Alexander encontró alguien digno de sus armas, bien.... por fin un contendiente que valga la pena.",

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
        text: "Morkor se levanta de su trono y alza sus armas: -'Otro insecto ambicioso, bien... terminemos esto rapido!'",

        options: [
            {
                text: "Comenzar la batalla final",
                type: "preBattle",
                updateEnemy() {
                    setEnemy("Caballero Oscuro, Morkor", 200, 30)
                },
                nextNode: 93
            }
        ]
    },
    {
        id:93,
        text: "¡En guardia Morkor!",

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
        text: "Llegas al pueblo victorioso. Alexander te recibe en la entrada con una amplia sonrisa. El pueblo, aún enajenado, no puede creer lo que ven sus ojos. Al fin el tirano cayó. Alexander te nombra en frente de todos como el nuevo Rey de Skagard. ¡El labor será ardua pero juntos con el apoyo del pueblo y las criaturas bondadosas del bosque podrán llevar al Reino a su antiguo esplendor!. FELICIDADES, GANASTE EL JUEGO. ESTE ES EL FINAL BUENO. VUELVE A PROBAR PERO ESTA VEZ SIN LA AYUDA DE ALEXANDER.",

        options: [
            {
                text: "Volver a jugar",
                nextNode:-1
            }
        ]
    },
    {
        id: 96,
        text: "Llegas al pueblo victorioso. Lograste vencer a Morkor, sin la ayuda de nadie ¡El trono es tuyo! El pueblo te vitorea, pero no ves más que un montón campesinos débiles e inútiles ¿de que servirían? No, la fortaleza de este reino esta en las viles criaturas del bosque. Ahora que Morkor ya no está, tu las dirigirás y dominaras estas tierras junto a ellas… ¿y por qué no más allá? Al otro lado ves al vagabundo, te sorprende que un lobo gigante y plateado surge de la nada y se acerca a él. Los dos se retiran del en dirección al bosque. No sabes por qué… pero presientes que este hombre representa un peligro para tu nuevo gobierno.. FELICIDADES, GANASTE EL JUEGO. ESTE ES EL FINAL MALO. PRUEBA HABLAR CON EL VAGABUNDO LA PROXIMA.",

        options: [
            {
                text: "Volver a jugar",
                nextNode:-1
            }
        ]
    }


  

















]



startGame()

