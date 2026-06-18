window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "creatures-table",
    title: "Creatures Array",
    description: "Rolls a 2d20 probability curve array to generate a local animal, beast, or hazard encounter.",
    type: "2d20-list",
    entries: {
        2: "Monster!", 3: "Bear", 4: "Cat", 5: "Dire Wolf", 6: "Dog", 7: "Draft Horse",
        8: "Eagle", 9: "Elephant", 10: "Elk", 11: "Flying Snake", 12: "Ape",
        13: "Giant Ape", 14: "Giant Badger", 15: "Giant Boar", 16: "Giant Eagle",
        17: "Giant Elk", 18: "Giant Fire Beetle", 19: "Giant Frog", 20: "Giant Lizard",
        21: "Giant Owl", 22: "Giant Rat", 23: "Giant Spider", 24: "Goat", 25: "Hawk",
        26: "Mastiff", 27: "Mule", 28: "Owl", 29: "Riding Horse", 30: "Panther",
        31: "Poisonous Snake", 32: "Pony", 33: "Rat", 34: "Raven", 35: "Swarm of Insects",
        36: "Swarm of rats", 37: "Swarm of ravens", 38: "Vulture", 39: "Weasel", 40: "Wolf"
    }
});