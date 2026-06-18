window.tablesDatabase = window.tablesDatabase || [];

// Master Topology Mapping for a 19-Hex Regular Hexagon Cluster
// Directions index order: [0: N, 1: NE, 2: SE, 3: S, 4: SW, 5: NW]
const hexTopology = {
    0:  { neighbors: [1, 2, 3, 4, 5, 6] },     // Center
    1:  { neighbors: [7, 8, 2, 0, 6, 18] },    // Inner North
    2:  { neighbors: [8, 9, 10, 3, 0, 1] },    // Inner North-East
    3:  { neighbors: [2, 10, 11, 12, 4, 0] },  // Inner South-East
    4:  { neighbors: [0, 3, 12, 13, 14, 5] },  // Inner South
    5:  { neighbors: [6, 0, 4, 14, 15, 16] },  // Inner South-West
    6:  { neighbors: [18, 1, 0, 5, 16, 17] },  // Inner North-West
    7:  { neighbors: [null, null, 8, 1, 18, null] }, // Outer Top
    8:  { neighbors: [null, null, 9, 2, 1, 7] },
    9:  { neighbors: [null, null, null, 10, 2, 8] }, // Outer Far Right Top
    10: { neighbors: [9, null, null, 11, 3, 2] },    // Outer Far Right Mid
    11: { neighbors: [10, null, null, null, 12, 3] }, // Outer Far Right Bot
    12: { neighbors: [3, 11, null, null, 13, 4] },
    13: { neighbors: [4, 12, null, null, null, 14] }, // Outer Bottom
    14: { neighbors: [5, 4, 13, null, null, 15] },
    15: { neighbors: [16, 5, 14, null, null, null] }, // Outer Far Left Bot
    16: { neighbors: [17, 6, 5, 15, null, null] },    // Outer Far Left Mid
    17: { neighbors: [null, 18, 6, 16, null, null] }, // Outer Far Left Top
    18: { neighbors: [null, 7, 1, 6, 17, null] }
};

window.tablesDatabase.push({
    id: "weather-hexes",
    title: "Weather Hexes Generator",
    description: "Advanced state-based weather engine tracking conditions Day-to-Day using spatial hex shifting.",
    type: "hex-grid",
    topology: hexTopology,
    seasons: {
        Spring: {
            names: {
                0: "Clear & Nippy", 1: "Sleet", 2: "Hail", 3: "Cold Wafts of Mist", 4: "Sunny & Clear",
                5: "Cloudy & Warm", 6: "Nippy & Humid", 7: "Heavy Rainfall !", 8: "Snowy Rain !",
                9: "Windy & Snowy", 10: "Heavy Snowfall !", 11: "Light Snowfall !", 12: "Coldy & Dry",
                13: "Pleasantly Warm", 14: "Strong Pollen Drift !", 15: "Hot & Dry !", 16: "Warm & Humid",
                17: "Warm Drizzle", 18: "Short Showers"
            },
            starts: { 5:0, 6:3, 9:4, 10:5, 12:6, 2:9, 4:10, 7:11, 8:12, 11:16, 3:18 }
        },
        Summer: {
            names: {
                0: "Pleasantly Warm", 1: "Cloudy & Humid", 2: "Cloudy & Windy", 3: "Warm Breeze", 4: "Hot & Dry",
                5: "Warm & Cloudy", 6: "Short, Warm Showers", 7: "Torrential Rain !!", 8: "Warm Storm !!",
                9: "Fierce Wind !", 10: "Partly Cloudy & Nippy", 11: "Clear & Nippy", 12: "Sunny & Clear",
                13: "Dry Heat Surges !!", 14: "Hot & Windy", 15: "Hot & Muggy", 16: "Warm Drizzle",
                17: "Warm Rain", 18: "Downpour !"
            },
            starts: { 2:6, 3:2, 4:10, 5:4, 6:3, 7:12, 8:11, 9:5, 10:13, 11:14, 12:16 }
        },
        Autumn: {
            names: {
                0: "Sunny & Cloudy", 1: "Sunny & Clear", 2: "Cold Wafts of Mist", 3: "Thick Fog Soup !", 4: "Rain & Fog",
                5: "Rain & Gusts !", 6: "Humid & Cloudy", 7: "Goose Summer", 8: "Sporadic Gusts !",
                9: "Cold Winds", 10: "Frosty & Cloudy", 11: "Cloudy & Nippy", 12: "Windy & Clear",
                13: "Short, Light Showers !", 14: "Heavy Downpour", 15: "Rainy Windstorm !!", 16: "Drizzle",
                17: "Sunny & Nippy", 18: "Pleasantly Warm"
            },
            starts: { 10:1, 3:2, 4:3, 5:4, 6:10, 7:11, 8:12, 2:14, 9:17, 11:18, 12:7 }
        },
        Winter: {
            names: {
                0: "Cold & Humid", 1: "Clear & Windy", 2: "Cold Fog Wafts", 3: "Cold & Cloudy", 4: "Wet Snowfall",
                5: "Snowy Rain", 6: "Cloudy & Nippy", 7: "Sunny & Nippy", 8: "Light Drizzle",
                9: "Heavy Rain !", 10: "Cold Winds", 11: "Sleet", 12: "Light Snowfall !",
                13: "Windy & Snowy !", 14: "Blizzard !!", 15: "Hail !", 16: "Cold & Clear",
                17: "Snowstorm", 18: "Cold Rain Showers !"
            },
            starts: { 9:1, 10:2, 5:4, 7:6, 6:7, 12:10, 4:12, 2:14, 3:15, 8:16, 11:18 }
        }
    }
});