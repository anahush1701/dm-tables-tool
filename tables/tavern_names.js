window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "tavern-name-generator",
    title: "Tavern Name Generator",
    description: "Rolls two independent d20s to combine prefixes and suffixes into localized establishment names.",
    type: "two-part",
    part1: [
        "The Gilded", "The Frog and", "The Hammer and", "The Golden", "The Black",
        "Eye of the", "The Sword and", "The Filthy", "The Evil", "The Good",
        "The Stroppy", "The Greasy", "The Naughty", "The Queen and", "The Leper and",
        "The Dog and", "The Sweaty", "The Blessed", "The Cunning", "The Knight's"
    ],
    part2: [
        "Anvil", "Eye", "Rogue", "Assassin", "Dagger", 
        "Spadger", "Quipper", "King", "Wizard", "Toad",
        "Bullock", "Bollock", "Buttock", "Cuckold", "Sabre",
        "Strumpet", "Nonce", "Scoundrel", "Knave", "Cock"
    ]
});