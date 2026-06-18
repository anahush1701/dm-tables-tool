window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "settlement-shops",
    title: "Settlement Shop & Merchant Generator",
    description: "Select a settlement scale and merchant type to check availability, operational quality, and custom item search DCs.",
    type: "settlement-shop-generator",
    sizes: ["Small Settlement", "Hamlet", "Village", "Town", "City", "Metropolis"],
    
    // Existence Threshold Array mapped to: [Small Settlmt, Hamlet, Village, Town, City, Metropolis]
    merchants: {
        "Inn / Tavern": [10, 8, 6, 4, 2, 1],
        "Adventuring Supplies": [17, 14, 10, 5, 2, 1],
        "Animals and Mounts": [12, 11, 9, 7, 5, 3],
        "Books and Maps": [18, 17, 15, 13, 11, 9],
        "Jewelry and Gem trader": [20, 19, 18, 16, 14, 12],
        "Armourer": [18, 16, 14, 12, 10, 8],
        "Bank": [17, 15, 13, 10, 8, 6],
        "Tinkerer / Finesmith": [18, 17, 15, 13, 11, 9],
        "Tailor": [15, 13, 11, 10, 8, 6],
        "Potions, poisons, herbs": [18, 17, 16, 14, 12, 10],
        "Religious idols & Blessings": [16, 15, 13, 11, 9, 7],
        "Food & drink seller": [14, 12, 10, 8, 6, 4],
        "Temple (Rituals, weddings, etc)": [16, 14, 12, 10, 8, 6],
        "Spell tomes and scrolls": [20, 19, 17, 15, 13, 11],
        "Thieving supplies": [19, 18, 16, 14, 12, 10],
        "Weapons Shop": [17, 15, 13, 11, 9, 7],
        "Vehicles and transportation": [15, 12, 13, 10, 8, 6],
        "Adventurer's Guild": [19, 18, 16, 14, 12, 10],
        "Magic Items Shop": [25, 22, 19, 16, 15, 14],
        "Blacksmith": [12, 10, 8, 6, 4, 2],
        "Necromancy / Resurrection": [20, 19, 18, 17, 16, 16],
        "Couriers": [19, 18, 17, 15, 13, 11],
        "Brothel": [17, 15, 13, 11, 9, 7],
        "Land Sales Office": [16, 15, 13, 10, 8, 6],
        "Carpenter / Cooper / Cartwright": [15, 13, 10, 8, 6, 4],
        "Entertainer's Guild": [20, 18, 16, 13, 11, 9],
        "Healer / Physician": [18, 15, 12, 10, 7, 4],
        "Shipping Contracts (Coastal)": [19, 18, 16, 14, 12, 10],
        "Worker's Union": [19, 18, 16, 11, 9, 7],
        "Stonemason": [18, 15, 12, 10, 7, 4],
        "University": [null, null, 18, 16, 14, 12], // Null targets are impossible to locate
        "Mercenaries": [19, 18, 17, 16, 14, 12]
    },

    // Quality Threshold brackets mapped from image_26588c.png
    qualityRanges: {
        "Small Settlement": [
            { max: 7, label: "Atrocious" }, { max: 11, label: "Poor" }, 
            { max: 15, label: "Medium" }, { max: 18, label: "Good" }, { max: 20, label: "Excellent" }
        ],
        "Hamlet": [
            { max: 6, label: "Atrocious" }, { max: 10, label: "Poor" }, 
            { max: 14, label: "Medium" }, { max: 17, label: "Good" }, { max: 20, label: "Excellent" }
        ],
        "Village": [
            { max: 5, label: "Atrocious" }, { max: 9, label: "Poor" }, 
            { max: 13, label: "Medium" }, { max: 17, label: "Good" }, { max: 20, label: "Excellent" }
        ],
        "Town": [
            { max: 4, label: "Atrocious" }, { max: 8, label: "Poor" }, 
            { max: 12, label: "Medium" }, { max: 16, label: "Good" }, { max: 20, label: "Excellent" }
        ],
        "City": [
            { max: 3, label: "Atrocious" }, { max: 7, label: "Poor" }, 
            { max: 11, label: "Medium" }, { max: 15, label: "Good" }, { max: 20, label: "Excellent" }
        ],
        "Metropolis": [
            { max: 2, label: "Atrocious" }, { max: 5, label: "Poor" }, 
            { max: 9, label: "Medium" }, { max: 13, label: "Good" }, { max: 20, label: "Excellent" }
        ]
    },

    // Item Procurement DC Matrix mapped from image_1c7b44.png
    itemDCs: {
        "Atrocious": { common: 14, uncommon: 18, rare: 20, legendary: "Not Available" },
        "Poor": { common: 12, uncommon: 17, rare: 19, legendary: "Not Available" },
        "Medium": { common: 10, uncommon: 15, rare: 18, legendary: 20 },
        "Good": { common: 8, uncommon: 13, rare: 17, legendary: 19 },
        "Excellent": { common: 6, uncommon: 12, rare: 16, legendary: 18 }
    }
});