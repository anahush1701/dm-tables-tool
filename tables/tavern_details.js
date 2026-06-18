window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "tavern-profile-details",
    title: "Tavern Characteristic Profiler",
    description: "Rolls a d10 array across 5 distinct sectors to build an immediate interior profile for an inn.",
    type: "multi-column-profile",
    columns: {
        "Rooms Available": ["None", "1 room", "2 rooms", "3 rooms", "4 rooms", "5 rooms", "6 rooms", "8 rooms", "10 rooms", "20 rooms"],
        "Building Quality": ["Atrocious", "Poor", "Poor", "Average", "Average", "Average", "Good", "Good", "Excellent", "Outstanding"],
        "Active Innkeeper": ["Male gnome", "Female halfling", "Male dwarf", "Tiefling", "Human male", "Human female", "Male Halfling", "Female gnome", "Orc or Half-orc", "Player's Choice"],
        "Local Rumours Present": ["None", "1 active rumour", "1 active rumour", "2 active rumours", "2 active rumours", "2 active rumours", "3 active rumours", "3 active rumours", "4 active rumours", "4 active rumours"],
        "Customer Service Style": ["Unfriendly", "Neutral", "Neutral", "Civil", "Civil", "Cordial", "Cordial", "Warm & Welcoming", "Warm & Welcoming", "Treated like a monarch!"]
    }
});