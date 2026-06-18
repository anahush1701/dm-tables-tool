window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "the-oracle",
    title: "The Oracle",
    description: "Select the likelihood of an event occurring, then roll a modified d20 to get your answer.",
    type: "oracle",
    modifiers: [
        { label: "Impossible (-6)", value: -6 },
        { label: "Highly Unlikely (-4)", value: -4 },
        { label: "Unlikely (-2)", value: -2 },
        { label: "Possible (0)", value: 0 },
        { label: "Likely (+2)", value: +2 },
        { label: "Highly Likely (+4)", value: +4 },
        { label: "A Certainty (+6)", value: +6 }
    ],
    entries: [
        "1–2: No, and",
        "3–7: No",
        "8–9: No, but",
        "10: Maybe (skill check or reroll)",
        "11–12: Yes, but",
        "13–18: Yes",
        "19–20+: Yes, and"
    ]
});