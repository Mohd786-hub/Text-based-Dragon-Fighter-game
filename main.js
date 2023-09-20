let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [{
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30

    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [{
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

const locations = [{
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goToStore, goToCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"store\"."


    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goToTownSquare],
        text: "You enter the store"
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightFangedBeast, goToTownSquare],
        text: "You enter the cave. You see some Monster."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goToTownSquare],
        text: "You are fighting a monster"
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goToTownSquare, goToTownSquare, goToTownSquare],
        text: 'The monster screams "Arg!" as it dies. You gain experience point and find gold'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die."
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME!"


    }
];

// Initilize button

button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;

// function 

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerText = location.text;

}

function goToTownSquare() {
    update(locations[0]);

}

function goToStore() {
    update(locations[1]);

}

function goToCave() {
    update(locations[2]);
}



function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health."
    }

}


function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText = "In your inventory you have " + inventory + ".";
        } else {
            text.innerText = "You do not have enough gold to buy weapon";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "sell weapon for 15 gold";

        button2.onclick = sellWeapon;
    }

}

function sellWeapon() {
    if (inventory.lenght > 1) {
        gold += 15;
        goldText.innerText = gold;
        let soldedWeapon = inventory.shift();
        text.innerText = "You sold a " + soldedWeapon + ".";
        text.innerText += " In your inventory you have " + inventory + ".";

    } else {
        text.innerText = "Don't sell your only weapon!";
    }

}

function fightSlime() {
    fighting = 0;
    goFight();

}

function fightFangedBeast() {
    fighting = 1;
    goFight();

}

function fightDragon() {
    fighting = 2;
    goFight();

}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;

    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name;
    text.innerText += " You attack it with yours " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else {
        if (monsterHealth <= 0) {
            if (fighting == 2) {
                winGame();
            } else {
                defeatMonster();
            }
        }
    }

}

function dodge() {
    text.innerText = "You dodge from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goToTownSquare();

}