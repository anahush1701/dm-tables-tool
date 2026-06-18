window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "generating-rumours",
    title: "Generating Rumours",
    description: "Rolls for the subject of a rumour. If the result is a Place, it automatically rolls on the Rumour Location Table.",
    type: "chained",
    subjects: [
        { roll: 1, name: "Person", notes: "Consult NPC tables (Chapter 13)" },
        { roll: 2, name: "Creature", notes: "Consult creature table (Chapter 14)" },
        { roll: 3, name: "Place", notes: "Consult Rumour location table (below)" },
        { roll: 4, name: "Thing", notes: "Consult Situations table (Chapter 14)" }
    ],
    locations: [
        "In this settlement/area",
        "Just outside settlement",
        "MILES miles away, in a structure (consult Structure Table, Chapter 9)",
        "In the nearest forest",
        "In the nearest hills",
        "In the nearest mountains",
        "In the nearest swamp",
        "In/beside the nearest body of water",
        "In the next village",
        "In the next large town",
        "In the capital of the realm",
        "In the next realm"
    ]
});