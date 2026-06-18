window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "master-traps",
    title: "Master Traps Matrix",
    description: "Roll automated, level-scaling traps. Select between Standard Dungeon hazards (d100) or Wilderness/Urban tactical traps (d10).",
    type: "traps-matrix",
    category: "exploration",
    standard: [
        { min: 1, max: 6, type: "Poison darts", notice: 11, save: 10, calcDmg: (lvl) => `${Math.max(1, lvl - 3)}d6` },
        { min: 7, max: 12, type: "Collapsing Roof", notice: 11, save: 10, calcDmg: (lvl) => `${Math.max(1, lvl - 2)}d6` },
        { min: 13, max: 19, type: "Simple Pit", notice: 11, save: 11, calcDmg: (lvl) => `${Math.max(1, lvl - 1)}d6` },
        { min: 20, max: 26, type: "Hidden pit", notice: 11, save: 12, calcDmg: (lvl) => `${Math.max(1, lvl - 1)}d6` },
        { min: 27, max: 32, type: "Locking pit", notice: 11, save: 12, calcDmg: (lvl) => `${lvl}d6` },
        { min: 33, max: 38, type: "Spiked pit", notice: 12, save: 13, calcDmg: (lvl) => `${lvl}d6` },
        { min: 39, max: 44, type: "Rolling sphere", notice: 12, save: 14, calcDmg: (lvl) => `${lvl}d6` },
        { min: 45, max: 50, type: "Scything blade", notice: 13, save: 14, calcDmg: (lvl) => `${lvl + 1}d6` },
        { min: 51, max: 56, type: "Glyph trap [GLYPH_SUB]", notice: 14, save: 15, calcDmg: (lvl) => `${lvl + 1}d6` },
        { min: 57, max: 63, type: "Magic missile spell", notice: 14, save: 15, calcDmg: (lvl) => `${lvl + 1}d6` },
        { min: 64, max: 69, type: "Poison gas released / Acid Spray", notice: 15, save: 16, calcDmg: (lvl) => `${lvl + 1}d6` },
        { min: 70, max: 76, type: "Room fills with water", notice: 15, save: 16, calcDmg: (lvl) => `${lvl + 2}d6` },
        { min: 77, max: 82, type: "Walls begin closing", notice: 16, maxSave: 17, calcDmg: (lvl) => `${lvl + 2}d6` },
        { min: 83, max: 88, type: "Spears come out of floor", notice: 17, save: 18, calcDmg: (lvl) => `${lvl + 2}d6` },
        { min: 89, max: 93, type: "Spiked grate drops", notice: 17, save: 19, calcDmg: (lvl) => `${Math.ceil(lvl * 1.5)}d6` },
        { min: 94, max: 100, type: "Trapdoor (snakes / acid below?)", notice: 18, save: 20, calcDmg: (lvl) => `${lvl * 2}d6` }
    ],
    wilderness: [
        { roll: 1, type: "Deadfall", notice: 11, save: 13, saveType: "Dex save", dmg: (t) => `${t}d6 bludgeoning`, notes: "Ranged attacks on PC are at advantage until they succeed on a DC [ATH_DC] Athletics or Acrobatics check on their turn." },
        { roll: 2, type: "Log Trap", notice: 11, save: 11, saveType: "Dex save", dmg: (t) => `${t}d8 bludgeoning`, notes: "" },
        { roll: 3, type: "Spiked Pit", notice: 11, save: 13, saveType: "Dex save", dmg: (t) => `${t}d8 piercing`, notes: "Ranged attacks on PC are at advantage until they succeed on a DC [ATH_DC] Athletics or Acrobatics check on their turn (one check per turn, at the start of their turn)." },
        { roll: 4, type: "Glyph Spell Trap", notice: 13, save: 15, saveType: "Dex save", dmg: (t) => `${t * 2}d6 fire`, notes: "" },
        { roll: 5, type: "Bear Trap", notice: 12, save: 12, saveType: "Dex save", dmg: (t) => `${t * 2}d6 piercing`, notes: "" },
        { roll: 6, type: "Tripwire", notice: 13, save: 12, saveType: "Dex save", dmg: (t) => "No damage", notes: "Become prone on a failed save." },
        { roll: 7, type: "Whipping Tree", notice: 11, save: 13, saveType: "Dex save", dmg: (t) => `${t}d8 bludgeoning`, notes: "" },
        { roll: 8, type: "Fey Illusion", notice: 11, save: 14, saveType: "Wisdom save", dmg: (t) => `${t}d8 psychic`, notes: "" },
        { roll: 9, type: "Quicksand", notice: 11, save: 12, saveType: "Athletics check", dmg: (t) => "No damage", notes: "Ranged attacks on PC are at advantage until they succeed on the Athletics check on their turn." },
        { roll: 10, type: "Net Trap", notice: 11, save: 12, saveType: "Dex save or Acrobatics check", dmg: (t) => "No damage", notes: "All attacks on PC are at advantage until they succeed on the save or check on their turn." }
    ]
});