window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "what-wakes-you",
    title: "What Wakes You?",
    description: "Roll a d100 to find out what disruptive event cuts short a long or short rest.",
    type: "ranged-d100",
    ranges: [
        { min: 1, max: 20, result: "Loud Noise" },
        { min: 21, max: 35, result: "Animal (indifferent)" },
        { min: 36, max: 50, result: "Animal (hostile) (Creatures table, Chapter 14)" },
        { min: 51, max: 60, result: "Disturbing dream/vision" },
        { min: 61, max: 80, result: "NPC (curious)" },
        { min: 81, max: 85, result: "Bandit / Thief" },
        { min: 86, max: 90, result: "Monster (Roll for monster by terrain, Chapter 16)" },
        { min: 91, max: 91, result: "Natural disaster" },
        { min: 92, max: 100, result: "Storm / Weather change" }
    ]
});