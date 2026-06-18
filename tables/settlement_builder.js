window.tablesDatabase = window.tablesDatabase || [];

window.tablesDatabase.push({
    id: "settlement-builder",
    title: "Procedural Settlement Constructor",
    description: "Executes a multi-stage chained simulation to completely construct a unique settlement, its ruler, demographics, and active districts from scratch.",
    type: "settlement-builder",
    category: "settlements",
    
    populations: [
        { type: "Encampment", range: "1–200 residents", districtsText: "Just basic amenities", getCount: () => 0 },
        { type: "Hamlet", range: "200–500 residents", districtsText: "3 fixed districts (Commodities, Home & Hospitality, Residential)", getCount: () => 3, fixed: ["Commodities District", "Home & Hospitality District", "Residential District"] },
        { type: "Village", range: "500–1,500 residents", districtsText: "3–5 core districts", getCount: () => Math.floor(Math.random() * 3) + 3 }, 
        { type: "Town", range: "1,500–6,000 residents", districtsText: "6–13 complex districts", getCount: () => Math.floor(Math.random() * 8) + 6 }, 
        { type: "City", range: "6,000–25,000 residents", districtsText: "14–24 massive districts", getCount: () => Math.floor(Math.random() * 11) + 14 }, 
        { type: "Metropolis", range: "25,000+ residents", districtsText: "25+ sprawling districts", getCount: () => Math.floor(Math.random() * 6) + 25 } 
    ],

    demographics: [
        "Main humanoid race 75%, 20% second races, 5% other assorted races (Note: 25% chance certain minority races are completely excluded from formal governmental positions)",
        "An even, balanced mix of all regional races (Note: Evaluate if races are concentrated into distinct cultural quarters, or harmoniously mixed)",
        "Main humanoid race 50%, 50% an even mixture of all other local races",
        "Main humanoid race 40%, Second humanoid race 30%, remaining 30% a mixture of other races (Note: The two main primary races are actively at odds with each other!)",
        "Homogeneous community: Main humanoid race 90%, 10% separate mixture of all other races (Note: 70% chance minority populations are heavily concentrated in specific ghettoized areas)",
        "Melting Pot: Roll a separate d100 to determine the exact percentage split of all minority races combined; the exact remainder constitutes one primary founding race"
    ],

    rulers: [
        { max: 2, type: "Lawless", law: "Corrupt guard or completely compromised constabulary force. Order is barely maintained by a figurehead leader who rarely makes his presence felt.", mod: 4 },
        { max: 5, type: "Relaxed", law: "Laid back, benign, or completely ineffectual town guard. High chance that the active civic leader is openly viewed as a local laughing stock.", mod: 2 },
        { max: 8, type: "Functional", law: "Normal baseline guard force. Will actively step in to halt the most heinous public crimes, but leaves the populace to sort out most of their own daily problems.", mod: 1 },
        { max: 13, type: "Pragmatic", law: "Standard town guard that gets the job done properly, if occasionally doing so in a begrudging or bureaucratic manner.", mod: 0 },
        { max: 17, type: "Reasonably Strict", law: "Well-paid, highly committed town watch who are passionately vigilant and constantly on the lookout for civic trouble.", mod: -1 },
        { max: 19, type: "Very Strict", law: "Intolerant, iron-spurred leadership. Stepping out of line is met with instant arrest; harsh imprisonment is the standard order of the day for even minor offenses.", mod: -3 },
        { max: 20, type: "Despotic", law: "Draconian rule with a ruthless iron fist. Public executions are common for trivial offenses. Guard forces operate vengefully, beating suspects first and asking questions later.", mod: -5 }
    ],

    districtsTable: [
        { min: 1, max: 7, name: "Adventurer's District", dc: 12, unique: true },
        { min: 8, max: 14, name: "Arcane District", dc: 12, unique: true },
        { min: 15, max: 21, name: "Artisan District", dc: 15, unique: true },
        { min: 22, max: 28, name: "Commerce District", dc: 16, unique: true },
        { min: 29, max: 35, name: "Commodities District", dc: 15, unique: true },
        { min: 36, max: 42, name: "Divine District", dc: 15, unique: true },
        { min: 43, max: 44, name: "Entertainment District", dc: 10, unique: false },
        { min: 45, max: 49, name: "Illicit Industries District", dc: 10, unique: true },
        { min: 50, max: 56, name: "Government District", dc: 18, unique: true },
        { min: 57, max: 63, name: "Home & Hospitality District", dc: 14, unique: false },
        { min: 64, max: 70, name: "Military District", dc: 18, unique: true },
        { min: 71, max: 77, name: "Personal Services District", dc: 14, unique: false },
        { min: 78, max: 84, name: "Scribes District", dc: 14, unique: true },
        { min: 85, max: 91, name: "Smith's District", dc: 13, unique: true },
        { min: 92, max: 100, name: "Residential District", dc: 12, unique: false } 
    ],

    merchantTables: {
        "Adventurer's District": { die: 20, ranges: [
            { min: 1, max: 2, name: "Adventurer's Guild / Guildhall" }, { min: 3, max: 4, name: "Tavern / Inn" },
            { min: 5, max: 5, name: "Weaponry Shop" }, { min: 6, max: 6, name: "Horse Trader / Mounts Market" },
            { min: 7, max: 7, name: "Bowyer / Fletcher workshop" }, { min: 8, max: 8, name: "General Goods Store" },
            { min: 9, max: 9, name: "Weapons Made-to-Order Forge" }, { min: 10, max: 10, name: "Exotic / Foreign Weapons Dealer" },
            { min: 11, max: 11, name: "Complex / Special Combat Gear" }, { min: 12, max: 12, name: "Concealable Blades Emporium" },
            { min: 13, max: 13, name: "Magic Item Broker" }, { min: 14, max: 14, name: "Magic Weapon & Armor Smith" },
            { min: 15, max: 15, name: "General Provisions Warehouse" }, { min: 16, max: 16, name: "Ritual Scroll & Tome Dealer" },
            { min: 17, max: 17, name: "Arcane Supplies (Simple Rituals)" }, { min: 18, max: 18, name: "Spell Component Merchant" },
            { min: 19, max: 19, name: "Wand Artisan / Carver" }, { min: 20, max: 20, name: "Potion & Elixir Alchemist" }
        ]},
        "Arcane District": { die: 12, ranges: [
            { min: 1, max: 1, name: "Spell Components Supplier" }, { min: 2, max: 2, name: "Magic Items Store (Common/Uncommon)" },
            { min: 3, max: 3, name: "Magical Relics Vault (Rare/Wondrous)" }, { min: 4, max: 4, name: "Magical Weapons Conservatory" },
            { min: 5, max: 5, name: "Commercial Ritual Spellcasting Service" }, { min: 6, max: 6, name: "Local Magician's Guild Base" },
            { min: 7, max: 7, name: "The Wizard's Tankard (Tavern / Inn)" }, { min: 8, max: 8, name: "Private Mage Apprenticeship Manor" },
            { min: 9, max: 9, name: "General Curio & Oddities Store" }, { min: 10, max: 10, name: "Hedge Mage / Domestic Charm Shop" },
            { min: 11, max: 11, name: "Grand Mage's Guild Headquarters" }, { min: 12, max: 12, name: "Arcane Script Research Library" }
        ]},
        "Artisan District": { die: 100, ranges: [
            { min: 1, max: 3, name: "Book Binder & Paper Restorer" }, { min: 4, max: 6, name: "Fine Marble & Stone Sculptor" },
            { min: 7, max: 9, name: "Clock Maker / Timepieces Studio" }, { min: 10, max: 12, name: "Furrier / Winter Clothing Atelier" },
            { min: 13, max: 15, name: "General Goods Distribution Hub" }, { min: 16, max: 18, name: "Artisanal Soap & Tallow Maker" },
            { min: 19, max: 21, name: "Fine Clothier / Royal Costume Tailor" }, { min: 22, max: 24, name: "Glass Blower Workshop" },
            { min: 25, max: 27, name: "Master Carpenter / Wood Carver" }, { min: 28, max: 30, name: "Local Boat Builder / Dockwright" },
            { min: 31, max: 33, name: "Window Glazier" }, { min: 34, max: 36, name: "Apothecary Perfume Maker" },
            { min: 37, max: 39, name: "Rope & Net Weaver" }, { min: 40, max: 42, name: "Leathermonger Furrier" },
            { min: 43, max: 45, name: "Cabinetmaker / Joiner Shop" }, { min: 46, max: 48, name: "Wax Candlemaker House" },
            { min: 49, max: 51, name: "Imported Carpet Merchant" }, { min: 52, max: 55, name: "Artisan Quarter Shared Rowhouses" },
            { min: 56, max: 61, name: "The Crafter's Flagon (Tavern / Inn)" }, { min: 62, max: 64, name: "Toy Maker / Bone Dice Carver" },
            { min: 65, max: 67, name: "Precious Metals Jeweller Store" }, { min: 68, max: 70, name: "Leather Cobbler" },
            { min: 71, max: 73, name: "The Undertaker's Coffin Maker" }, { min: 74, max: 76, name: "Indigo & Pigment Textile Dyer" },
            { min: 77, max: 79, name: "Loom House Carpet Weavers" }, { min: 80, max: 82, name: "Wagon & Wheelwright Yard" },
            { min: 83, max: 85, name: "Heavy Hide Tanner" }, { min: 86, max: 87, name: "Sail Loft & Rigging Maker" },
            { min: 88, max: 90, name: "Hemp Rope Walk Factory" }, { min: 91, max: 93, name: "Musical Instrument Luthier Shop" },
            { min: 94, max: 95, name: "Clay Pottery & Brick Kiln" }, { min: 96, max: 97, name: "Limner / Sign Painter's Studio" },
            { min: 98, max: 100, name: "Glass Blower Factory" }
        ]},
        "Commerce District": { die: 20, ranges: [
            { min: 1, max: 2, name: "Imperial Vault Bank" }, { min: 3, max: 3, name: "Currency Exchange / Money Changer" },
            { min: 4, max: 4, name: "High-Interest Money Lender Office" }, { min: 5, max: 5, name: "Historical Military Antiques Vault" },
            { min: 6, max: 6, name: "Curio Shop: Rare Trinkets Specialist" }, { min: 7, max: 7, name: "Curio Shop: Large Artifact Specialist" },
            { min: 8, max: 8, name: "Antique Furniture & Rare Coin Dealer" }, { min: 9, max: 9, name: "High-End Fine Art Dealer Gallery" },
            { min: 10, max: 10, name: "Gem Cutter & Diamond Lapidary" }, { min: 11, max: 11, name: "District General Goods Bazaar" },
            { min: 12, max: 12, name: "The Coin & Cushion (Tavern / Inn)" }, { min: 13, max: 13, name: "Bounty Hunter Association Office" },
            { min: 14, max: 14, name: "Deed Office & Land Broker" }, { min: 15, max: 15, name: "Notary / Corporate Lawyer Firm" },
            { min: 16, max: 16, name: "District Guard Watch Barracks" }, { min: 17, max: 17, name: "Opulent Urban Manor Grounds" },
            { min: 18, max: 18, name: "Master Scribe / Document Preparer" }, { min: 19, max: 19, name: "Governmental Ministry of Commerce Office" },
            { min: 20, max: 20, name: "The Elite Gentry Leisure Club" }
        ]},
        "Commodities District": { die: 12, ranges: [
            { min: 1, max: 1, name: "Bulk Building Supplies & Timber Yard" }, { min: 2, max: 2, name: "The Lumberman's Rest (Tavern)" },
            { min: 3, max: 3, name: "Commercial Boating & Fishing Supplies" }, { min: 4, max: 4, name: "Drayage Yard / Heavy Teamster Outfitter" },
            { min: 5, max: 5, name: "Industrial Blacksmith (Local Business Supply)" }, { min: 6, max: 6, name: "Secure Wholesale Storage Warehouse" },
            { min: 7, max: 7, name: "Architect / Construction Engineering Firm" }, { min: 8, max: 8, name: "Grain Elevator Millers" },
            { min: 9, max: 9, name: "Wholesale Grain & Feed Merchant" }, { min: 10, max: 10, name: "Drydock Boatbuilder / Shipbuilder" },
            { min: 11, max: 11, name: "Maritime Chandler Outfitter" }, { min: 12, max: 12, name: "Bulk Cargo General Goods Market" }
        ]},
        "Divine District": { die: 100, ranges: [
            { min: 1, max: 20, name: "Grand Factional Temple Sanctuary" }, { min: 21, max: 24, name: "Shrine Idols & Altar Devotional Supplier" },
            { min: 25, max: 28, name: "Cloistered Monastery / Convent Abbey" }, { min: 29, max: 32, name: "Sacred Orb Dealer & Relic Scholar" },
            { min: 33, max: 36, name: "Religious Scribe (Non-Magical Holy Scrolls)" }, { min: 37, max: 40, name: "Cleric & Paladin Armament Armory" },
            { min: 41, max: 44, name: "Sanctified Holy Site / Pilgrimage Crypt" }, { min: 45, max: 48, name: "Ecclesiastical History Museum / University" },
            { min: 49, max: 52, name: "Charity Soup House & Downtrodden Shelter" }, { min: 53, max: 56, name: "Sacred Incense Myrrh Maker" },
            { min: 57, max: 60, name: "Scriptorium illumination Vault" }, { min: 61, max: 64, name: "Sanctuary Infirmary Hospital" },
            { min: 65, max: 68, name: "Divine District General Goods Store" }, { min: 69, max: 72, name: "The Saint's Chalice (Tavern / Inn)" },
            { min: 73, max: 76, name: "Alchemical Lab & Holy Apothecary" }, { min: 77, max: 80, name: "Monastic Herbal Healer Infirmary" },
            { min: 81, max: 84, name: "Barber Surgeon Sawbones & Dentist" }, { min: 85, max: 88, name: "Clairvoyant / Divine Mystic Arts Supplies" },
            { min: 89, max: 92, name: "General Knowledge Consultant Sage" }, { min: 93, max: 96, name: "Ancient Archivist Historian Sage" },
            { min: 97, max: 100, name: "Holy Scripture Theology Sage" }
        ]},
        "Entertainment District": { die: 12, ranges: [
            { min: 1, max: 1, name: "Shady Underground Smuggling Den" }, { min: 2, max: 2, name: "Bustling Central District Goods Stall" },
            { min: 3, max: 3, name: "Fencer / Secret Black Market Trader" }, { min: 4, max: 4, name: "Minstrel Agency / Bards-for-Hire Stage" },
            { min: 5, max: 5, name: "Steam House & Public Bathhouse" }, { min: 6, max: 6, name: "The Crimson Velvet Brothel" },
            { min: 7, max: 7, name: "Grand Civic Theatre / Playhouse" }, { min: 8, max: 8, name: "High-Stakes Dice & Card Casino" },
            { min: 9, max: 9, name: "Actor & Performer District Tenements" }, { min: 10, max: 10, name: "The Gilded tankard (Tavern / Inn)" },
            { min: 11, max: 11, name: "Needle & Ink Tattooist Parlor" }, { min: 12, max: 12, name: "District Cosmetic Barber Shop" }
        ]},
        "Illicit Industries District": { die: 12, ranges: [
            { min: 1, max: 2, name: "Hidden Opium & Narcotic Shady Den" }, { min: 3, max: 4, name: "Fencer / Black Market Smuggling Hub" },
            { min: 5, max: 6, name: "Underground Illegal Gambling Casino" }, { min: 7, max: 8, name: "Low-Watch Backalley Brothel House" },
            { min: 9, max: 10, name: "Cutthroat Tankard Dive (Tavern / Inn)" }, { min: 11, max: 12, name: "Poison Alchemist / Shady Tattooist Outpost" }
        ]},
        "Government District": { die: 12, ranges: [
            { min: 1, max: 1, name: "High City Hall / Ministry of Civic Works" }, { min: 2, max: 2, name: "Chancery Magistrate / Magistrate Lawyer" },
            { min: 3, max: 3, name: "Freeman Guildhall / Citizen's Assembly" }, { min: 4, max: 4, name: "Elite Central Guard Watch Headquarters" },
            { min: 5, max: 5, name: "Civic Polling Booth & Voting Pavilion" }, { min: 6, max: 6, name: "High Court of Criminal Justice" },
            { min: 7, max: 7, name: "Grand Senate / House of Lords Parliament" }, { min: 8, max: 8, name: "Ambassadorial Embassy Row Suite" },
            { min: 9, max: 9, name: "Imperial Land Registry Office" }, { min: 10, max: 10, name: "The Lord Mayor's Executive Mansion" },
            { min: 11, max: 11, name: "Central Postal Messenger Service Courier" }, { min: 12, max: 12, name: "The Gavel & Wig Tavern" }
        ]},
        "Home & Hospitality District": { die: 20, ranges: [
            { min: 1, max: 1, name: "Confectionery Candy Maker" }, { min: 2, max: 2, name: "Imported Delicacies Exotic Foods Shop" },
            { min: 3, max: 3, name: "Bulk Staples Grain & Dry Foods Vault" }, { min: 4, max: 4, name: "Rare Edibles & Fine Mushroom Specialist" },
            { min: 5, max: 5, name: "Fine Estate Wine Merchant / Vintner" }, { min: 6, max: 6, name: "Liquors Distiller & Spirit Specialist" },
            { min: 7, max: 7, name: "Vault Security Trap Smith workshop" }, { min: 8, max: 8, name: "Overseas Spice Trader Merchant" },
            { min: 9, max: 9, name: "Sourdough Baker & Pastry Kitchen" }, { min: 10, max: 10, name: "Fresh Produce Green Grocer Stalls" },
            { min: 11, max: 11, name: "Seafood Dock Fishmonger Warehouse" }, { min: 12, max: 12, name: "District Brewery & Ale Cellar" },
            { min: 13, max: 13, name: "Kitchen Supplies & Blade Sharpening" }, { min: 14, max: 14, name: "Livestock Cleaver / Butcher Shop" },
            { min: 15, max: 15, name: "Dairy Artisan Cheese Merchant Vault" }, { min: 16, max: 16, name: "Fishmonger Wholesale Depot" },
            { min: 17, max: 17, name: "Imported Dry Herb Tea Merchant" }, { min: 18, max: 18, name: "District Teahouse Booths" },
            { min: 19, max: 19, name: "Multi-Course Sitdown Restaurant" }, { min: 20, max: 20, name: "The Hearthfire Inn & Tavern" }
        ]},
        "Military District": { die: 12, ranges: [
            { min: 1, max: 3, name: "The Shield & Spear Garrison Tavern" }, { min: 4, max: 4, name: "Cavalry Charger Horse Trader Paddock" },
            { min: 5, max: 5, name: "Military Courier Service / Scout Office" }, { min: 6, max: 6, name: "Siege Engineer Compound & Blueprint Room" },
            { min: 7, max: 7, name: "Warhorse Cavalry Stables" }, { min: 8, max: 8, name: "Regular Infantry Barracks Block" },
            { min: 9, max: 9, name: "Garrison Officers' Quarters Suites" }, { min: 10, max: 10, name: "Recruitment & Conscription Master Office" },
            { min: 11, max: 11, name: "Military Commissary General Goods Store" }, { min: 12, max: 12, name: "High Command Ambassadorial Reception Suite" }
        ]},
        "Personal Services District": { die: 20, ranges: [
            { min: 1, max: 1, name: "Undertaker Embalming Mortuary" }, { min: 2, max: 2, name: "Cosmetic Supplies & Luxury Beautician" },
            { min: 3, max: 3, name: "Professional Garment Tailor" }, { min: 4, max: 4, name: "Domestic Pet & Hunting Dog Dealer" },
            { min: 5, max: 5, name: "Hygienic Barber & Leech Bloodletter" }, { min: 6, max: 6, name: "Livestock & Hound Veterinarian" },
            { min: 7, max: 7, name: "Undertaker Shroud & Casket Vault" }, { min: 8, max: 8, name: "Professional Utility Spellcasting Mage" },
            { min: 9, max: 9, name: "Contract & Document Defense Lawyer" }, { min: 10, max: 10, name: "Fast Messenger Courier Dispatch Station" },
            { min: 11, max: 11, name: "City & Wilderness Expedition Guide Office" }, { min: 12, max: 12, name: "Private Eye Claims Investigator" },
            { min: 13, max: 13, name: "Multilingual Text Court Interpreter" }, { min: 14, max: 14, name: "Bounty Hunter Office / Lockup" },
            { min: 15, max: 15, name: "District Medical Doctor / Physician Clinic" }, { min: 16, max: 16, name: "Real Estate Tenement Landlord Offices" },
            { min: 17, max: 17, name: "Scrub-Tub Public Laundry House" }, { min: 18, max: 18, name: "Traveler Budget Shared-Bunk Hostel" },
            { min: 19, max: 19, name: "Collateral Loan Collateral Pawnshop" }, { min: 20, max: 20, name: "District Shared Inn / Restaurant" }
        ]},
        "Scribes District": { die: 12, ranges: [
            { min: 1, max: 1, name: "Master Ink Calligrapher Studio" }, { min: 2, max: 2, name: "Scroll Merchant (Exotic & Rare Languages)" },
            { min: 3, max: 3, name: "Boiled Oak Gall Ink Maker Manufactory" }, { min: 4, max: 4, name: "Surveyor Map Vendor Shop" },
            { min: 5, max: 5, name: "Cartographer & Legal Boundary Surveyor" }, { min: 6, max: 6, name: "Parchment, Vellum & Paper Maker Mill" },
            { min: 7, max: 7, name: "Wax Seal Maker & Signet Ring Engraver" }, { min: 8, max: 8, name: "Academic Tutor / Linguistic Educator" },
            { min: 9, max: 9, name: "Gold Leaf Manuscript Illuminator Studio" }, { min: 10, max: 10, name: "Scribe / Public Text Transcriber Office" },
            { min: 11, max: 11, name: "Rare & Exotic Arcane Bookshop" }, { min: 12, max: 12, name: "Local History & National Law Bookstore" }
        ]},
        "Smith's District": { die: 20, ranges: [
            { min: 1, max: 1, name: "Heavy Iron Architectural Blacksmith" }, { min: 2, max: 2, name: "Fine Tableware Silversmith Forge" },
            { min: 3, max: 3, name: "Treated Leather Worker & Tanner Yard" }, { min: 4, max: 4, name: "Precious Metals Goldsmith Mint" },
            { min: 5, max: 5, name: "Tumbler Locksmith workshop" }, { min: 6, max: 6, name: "Cast Pewter Smith Foundry" },
            { min: 7, max: 7, name: "Iron Wire & Chain Mail Link Draw-House" }, { min: 8, max: 8, name: "Vehicle Chassis Maker / Machine Engineer" },
            { min: 9, max: 9, name: "Acid-Etching Metal Jewelry Engraver" }, { min: 10, max: 10, name: "Finesmith / Clock-Tinkerer Studio" },
            { min: 11, max: 11, name: "Mount Saddler & Harness Builder" }, { min: 12, max: 12, name: "Bronze Worker Forge & Brazier Foundry" },
            { min: 13, max: 13, name: "Smithy Quarter Raw General Store" }, { min: 14, max: 14, name: "The Sooty Anvil (Tavern / Inn)" },
            { min: 15, max: 15, name: "Pattern Wood Carver / Joiner Studio" }, { min: 16, max: 16, name: "Axle Cart / Transport Vehicle Maker" },
            { min: 17, max: 17, name: "Smelthouse Dining Grill Restaurant" }, { min: 18, max: 18, name: "Padlock Locksmith Shop" },
            { min: 19, max: 19, name: "Architectural Stonemason Shed Yard" }, { min: 20, max: 20, name: "High-Carbon Steel Weaponsmith Blast-Forge" }
        ]},
        "Residential District": { die: 4, ranges: [
            { min: 1, max: 1, name: "Crowded Tenement Slum blocks" }, { min: 2, max: 2, name: "Standard Average Residential Rowhouses" },
            { min: 3, max: 3, name: "Thriving Middle-Class Townhomes" }, { min: 4, max: 4, name: "Gated Wealthy Merchant Mansions" }
        ]}
    }, // <-- TYPO FIXED HERE (Changed bracket to brace)

    disturbances: {
        "Adventurer's District": [
            { event: "Shortage of commodities such as metals is hampering weapons and armour trade. Possible deliberate sabotage.", seed: "PCs take a contract to locate new source of commodities." },
            { event: "Local militia have bought out all stock and many shops are empty. They demanded the weapons at a reduced price.", seed: "Perhaps there is a war on? Anyway, merchants are not doing well." },
            { event: "A mysterious rust has affected many weapons.", seed: "Many weapons are useless. Is this normal rust, or some other cause?" },
            { event: "Organized crime collecting levies.", seed: "Merchants are hurting. If someone could sort this particular disturbance out for them, they would be rewarded." },
            { event: "Merchant unions are causing strife, demanding better pay for labour working in smiths' etc.", seed: "Production of goods has halted until a solution can be found." },
            { event: "Adventurer's Guild favouring one particular weapons merchant. Others are suffering.", seed: "Possibly not much to be done, unless the party has some affiliation with the weapons merchant." },
            { event: "Adventurers buying everything out, none left for militia.", seed: "Militia looking down on / harassing adventurers." },
            { event: "Local militia are on the lookout for a band of particularly troublesome adventurers.", seed: "Due to some poorly-behaved individuals visiting the area recently! Or... is it you, perhaps?" },
            { event: "A wild magic field has sprung up in the area, causing havoc in various businesses, and occasionally, out on the streets!", seed: "PCs to investigate and quell the disturbance?" },
            { event: "Fire in a shop is causing havoc.", seed: "PCs help to put it out, get possible discount!" }
        ],
        "Arcane District": [
            { event: "A mage meddling with planar spells has unwittingly opened a portal into another plane.", seed: "What plane? And perhaps adventurers are hired to rescue someone who has gone missing within the plane, or to figure out a way to close it." },
            { event: "Wild magic field has sprung up.", seed: "All sorts of craziness going on, disrupting business. Use keywords, or Wild Magic Surge table (DMG) to provide flavour." },
            { event: "Supply issues with rare magic spell components.", seed: "Adventurers hired to travel to distant lands / interesting locations to procure strange spell components." },
            { event: "A huge arcane explosion in a wizard's laboratory has set several adjacent buildings on fire. Possibly started by an apprentice.", seed: "Party might gain some renown by putting out fire and rescuing wizard's apprentice." },
            { event: "An evil faction practicing secret magic has moved into the neighbourhood, so the rumours go.", seed: "Adventurers hired to gather information." },
            { event: "People are being driven mad by a particular spell that was cast a few weeks ago and has taken on a life of its own. It is some form of illusion or enchantment, and it has people losing their minds.", seed: "Party hired to investigate or perhaps procure an item that will bring an end to this spell. Or, figure out some other solution." },
            { event: "Creatures from below are attracted to the arcane energy in the area.", seed: "Adventurers hired to quell these creatures and uncover exactly what it is that is attracting them." },
            { event: "A prominent local mage has died and a huge ceremony is in progress.", seed: "The festivities are very interesting for all and may lead to some interesting leads / adventure seeds." }
        ],
        "Artisan District": [
            { event: "Shortage of raw materials due to repeated hijackings of supply trains en route to the city.", seed: "PCs offer services to escort / remove obstacles?" },
            { event: "Workers striking.", seed: "PCs mistaken for 'scabs' and mobbed by angry workers." },
            { event: "Shopkeepers harassed by local thugs.", seed: "PCs offer to remove thug disturbance." },
            { event: "Major organized crime disturbance.", seed: "Local thieves' guild responsible? Adventurers hired to investigate." },
            { event: "Different smiths are arguing about water supply and how particular businesses are taking more than their fair share.", seed: "Who is going to sort this dispute? Could erupt into violence." },
            { event: "Someone has adopted a controversial hiring policy. Competitors are not pleased.", seed: "One group being discriminated against? Or perhaps the method of interview is controversial." },
            { event: "Bound elementals causing havoc.", seed: "Adventurers hired to fix the problem." },
            { event: "Prices are hugely inflated due to scarcity of resources.", seed: "Can new resources be sourced elsewhere?" }
        ],
        "Commerce District": [
            { event: "District in an uproar after a recent heist relieved one bank of most of its gold and gems!", seed: "Adventurers hired to track down the thieves." },
            { event: "Security extra tight after a huge shipment of treasure is scheduled to be transported here from a dead noble's estate.", seed: "Possibility of a heist? Or, adventurers hired as security, and for good money too." },
            { event: "A prominent local financier or other moneyed person has been murdered. There are a few suspects.", seed: "What was this person doing that caused them to become a target?" },
            { event: "Poverty-stricken citizens are protesting outside a large merchant bank, saying that the bank has been acting unscrupulously.", seed: "It looks like it could kick off into a riot at any stage!" },
            { event: "There is an exhibition of extremely valuable art on right now at a gallery in this district, although some of the paintings are... evocative to say the least.", seed: "Several people have reported having strange hallucinations after viewing the exhibition. The artist themself has not been seen in a number of days." },
            { event: "Authorities have just discovered a network of tunnels running underneath the financial district, although their purpose is unknown.", seed: "Someone needs to get to the bottom of this!" },
            { event: "A religious group has stored an ancient artifact in a bank here, made of a pure precious mineral. It was recently discovered and they are unsure where to house it. Perhaps a new temple must be built.", seed: "There are strange goings-on around this idol. The bank itself is exhibiting some strange phenomena, as are the staff who work there." },
            { event: "High ranking financial dignitaries are visiting from out of town. There are rumours that some of them make their money in less than scrupulous ways.", seed: "Adventurers hired for protection? Or assassination perhaps?" }
        ],
        "Commodities District": [
            { event: "Workers are striking and demanding better pay.", seed: "Rioting in streets, general unrest." },
            { event: "There is a trade issue with a neighbouring realm who supplies a basic material (such as iron or timber) to this realm. Ambassadors from that nation are in town, but will they ever be able to get along?", seed: "What is the issue at heart here? This could form an interesting background to your current quest." },
            { event: "A warrant is out for a particularly brazen thief who is conducting robberies against transports to and from the commodities district. This thief has been at large for months now.", seed: "A large bounty is being offered for their capture and/or death." },
            { event: "A vacant building has become infested with all kinds of vermin. Rumour suggests that the basement is connected to some catacombs beneath.", seed: "Adventurers could be hired to go in and investigate, possibly venturing into the catacombs below." },
            { event: "An engineer resident in this area is known for his remarkable buildings, all of which seem to planar anomalies. Is it the design of these buildings that causes this?", seed: "Adventurers to interview this man and get to the bottom of why he is doing this." },
            { event: "There is a condemned, boarded-up building that no-one seems to know anything about, but that everyone avoids. No-one even knows who owns the place.", seed: "Adventurers to investigate city records to find out the building's history, and/or explore the building." },
            { event: "A boatbuilder is restoring an historically significant ship and has discovered hidden treasure, including a map which shows directions to an island previously thought undiscovered!", seed: "The boatbuilder is looking for an adventuring party to follow up on these leads." },
            { event: "Building supplies are short due to a newly-landed noble constructing a castle just outside of town. He seems to be a recluse. However, they are monopolising building materials in town!", seed: "Look into this lord's background perhaps, or find another source where timber and stone can be sourced from." }
        ],
        "Divine District": [
            { event: "Rival religious factions are warring here. Violent clashes are frequent.", seed: "Mediate between factions." },
            { event: "Aggressive recruitment drive by a particular cult.", seed: "Violence / Clashes." },
            { event: "The worshippers of a particular god are the target of religious hate crimes.", seed: "Find out what the perpetrators are." },
            { event: "Hardship in a particular part of the city (or area outside the city) has drawn many refugees and impoverished people to the area.", seed: "Petition local government to act on this situation." },
            { event: "Temples have been vandalised and idols destroyed.", seed: "Who is behind this?" },
            { event: "Supplies for worship and offerings are in scant supply and devotees are worried their god or gods will become displeased.", seed: "Where can these supplies be sourced from?" },
            { event: "Disease is causing hospitals and poor-houses to be overwhelmed.", seed: "What is causing the disease?" },
            { event: "A miracle of some sort is happening in one of the temples. Perhaps an idol is crying blood or a planar rift has opened beneath a temple.", seed: "Adventurers to investigate." }
        ],
        "Entertainment District": [
            { event: "A playwright has written a new work that a rival claims steals ideas from a tome of black magic.", seed: "Where did this writer find this tome? They shouldn't possess such a book!" },
            { event: "Visitors to dens of iniquity are waking up groggy, with all their belongings gone - and sometimes other things - vital organs perhaps, or their sanity...", seed: "Who is trapping these hapless wretches and stealing their most precious belongings?" },
            { event: "A noted gangster's family has been kidnapped. The kidnappers are demanding a ransom. His foot soldiers don't have the finesse required to deal with this situation.", seed: "Adventurers hired to track down the kidnappers and rescue the family." },
            { event: "A local rogue has been training street urchins as pickpockets. By all reports their efforts have been very fruitful!", seed: "Either stop this miscreant or maybe join forces!" },
            { event: "A potent new drug is doing the rounds and is turning addicts into zombies... literally!", seed: "Adventurers to look into this. Who is behind it?" },
            { event: "A local tavern is hosting a drinking contest of epic proportions. Those who can take their ale are encouraged to enter!", seed: "Sounds like the beginnings of a great night's entertainment!" },
            { event: "There is a warrant out for the arrest of a notorious criminal who is said to be hiding amongst the taverns, theatres, brothels and drug dens in this area.", seed: "A large bounty is at stake! But beware - this criminal is said to have many accomplices." },
            { event: "A notable musician and composer has invited the public to come witness the premier of his latest piece, which he promises will be 'unlike anything you've seen before!'", seed: "Dare you attend?" }
        ],
        "Illicit Industries District": [
            { event: "Visitors to dens of iniquity are waking up groggy, with all their belongings gone - and sometimes other things - vital organs perhaps, or their sanity...", seed: "Who is trapping these hapless wretches and stealing their most precious belongings?" },
            { event: "A noted gangster's family has been kidnapped. The kidnappers are demanding a ransom.", seed: "Adventurers hired to track down the kidnappers and rescue the family." },
            { event: "A local rogue has been training street urchins as pickpockets. By all reports their efforts have been very fruitful!", seed: "Either stop this miscreant or maybe join forces!" },
            { event: "A potent new drug is doing the rounds and is turning addicts into zombies... literally!", seed: "Adventurers to look into this. Who is behind it?" },
            { event: "There is a warrant out for the arrest of a notorious criminal who is said to be hiding amongst the taverns, theatres, brothels and drug dens in this area.", seed: "A large bounty is at stake! But beware - this criminal is said to have many accomplices." }
        ],
        "Government District": [
            { event: "Common folk picketing for better living conditions / change of something.", seed: "PCs join their cause? Or, PCs are paid by governmental officials to move the peasants on?" },
            { event: "Election of some sort (major / minor) is causing chaos and violent exchanges in the street.", seed: "PCs caught in the middle." },
            { event: "Visiting dignitary has the place in a tight security lockdown.", seed: "PCs hired for security / PCs questioned as to their presence there." },
            { event: "Corrupt officials are hampering proper running of government. Tampering with judicial / electoral processes.", seed: "PCs hired to investigate." },
            { event: "A coup by a powerful cult has ousted / killed the previous ruling body and is now holding possession of major administrative buildings.", seed: "PCs hired to rout out these revolutionaries. But who here fights the good fight?" },
            { event: "Sectors of the government are being mismanaged and it shows. Corrupt local politicians accepting bribes etc.", seed: "Corruption is rife, from the town guard up." },
            { event: "Government is preparing for potential war with another nation and have no time for any other concerns.", seed: "Military are massing, officers are consulting with higher dignitaries - things are heating up. Where do you stand in this fight?" },
            { event: "A high-ranking politician/noble/public figure has been kidnapped. Revolutionaries are suspected.", seed: "Who is in the right here? Party hired to investigate." }
        ],
        "Home & Hospitality District": [
            { event: "A plague of rats is decimating many warehouses, causing grains and many other food sources to become spoiled.", seed: "Where are these vermin coming from?" },
            { event: "A local trap merchant is rushed off his feet making traps for a mage who lives somewhere out of town. It is said that this mage is constructing a deathtrap dungeon to test worthy champions.", seed: "Sounds intriguing! When will the mage announce the contest?" },
            { event: "A fishmonger has returned from his most recent catch with disturbing tales of monsters terrorizing the harbour.", seed: "What foul denizens of the deep are out there?" },
            { event: "People will pay anything for this particular rare ingredient, and a local rare edibles specialist will reward anyone who can find the source.", seed: "What is this strange food and where can it be found?" },
            { event: "It's said that this restaurant was once the best in the city, but now something has made their dishes taste awful, and the chefs can't discover what it is. Has someone cursed them?", seed: "Adventurers hired to investigate." },
            { event: "A local noble is planning a huge banquet to honour a local retired adventurer, and the food businesses are rushed off their feet.", seed: "How hard would it be to get an invite to this banquet? You're sure to pick up some interesting information if you attend." },
            { event: "A seller of rare wines and liquors has been robbed, cleaned out of all their stock. Amongst their vaults were also some vintages said to possess magical properties.", seed: "What is the owner not telling you? There's something about these bottles..." },
            { event: "Strange noises have been coming from beneath the streets here. Possibly all the rich food has created a 'fatberg' in the sewers?", seed: "Adventurers with strong stomachs hired to investigate. Hopefully this problem is only wafer-thin, as they say." }
        ],
        "Military District": [
            { event: "A drunken soldier tells you that revolution is in the air. The local militia are tired of the poor treatment and are planning on staging a coup.", seed: "Adventurers either sit back and watch it happen, or alert the authorities." },
            { event: "Combat drills are taking place in the streets, putting local vendors on edge. What is all the fuss about?", seed: "Is there an invasion coming that the locals don't know about?" },
            { event: "A shortage of steel means that many local weaponsmiths are struggling to produce stock. This has made the local militia tetchy and on edge.", seed: "Might be best to move on quickly." },
            { event: "The militia has their sights set on a local bandit camp. Anyone looking vaguely suspicious is stopped and interrogated without warning.", seed: "Adventurers could be hired to go and rout the bandits and retrieve stolen booty." },
            { event: "The guards are nervous, due to a spate of troll/giant/ogre (pick your monster) attacks that have happened in the last few months.", seed: "Who knows when the next attack on the gates of this settlement will come?" },
            { event: "The militia are down to a skeleton crew. Several garrisons have left to take care of a nearby incursion threatening the town, leaving it vulnerable to other threats.", seed: "The remaining guards are nervous, and will probably welcome any help the adventurers can offer." },
            { event: "The local militia have had numbers bolstered by a visiting army allied with the ruler. This has meant there are a lot more professional soldiers out and about, stretching resources.", seed: "Anything could kick off!" },
            { event: "A tournament of knights and warriors, aiming to test martial ability, is currently in progress, attracting all comers.", seed: "The adventurers could try their hand in these tests of martial prowess." }
        ],
        "Personal Services District": [
            { event: "There has been a spate of disappearances in this area. Many people suspect the local barber, but regardless, the undertaker doesn't seem too concerned.", seed: "Adventurers hired to investigate." },
            { event: "A local dealer in pets has just come into possession of the most bizarre creature. Word has spread, and crowds have gathered outside, hoping to get a glimpse.", seed: "This merchant might have bitten off a bit more than she can chew... or maybe it's the creature that's going to be doing some chewing." },
            { event: "A bounty hunter who has his offices in this area has gone missing. It is uncertain what his last job was.", seed: "A bounty for those who can find the missing bounty hunter?" },
            { event: "A local doctor cannot explain a spate of strange illnesses that she has seen recently. Patients come in with strange markings on their bodies, then speak absolute gibberish and become violent.", seed: "Perhaps the good doctor has some theories about what is causing this illness." },
            { event: "An urban mage is said to be trapped in his tower. Passers-by say that it is something he summoned, or perhaps his arcane patron.", seed: "Adventurers hired to investigate." },
            { event: "Someone has been convicted of a crime they did not commit and is sentenced to be executed. A lawyer in this area is appealing for help.", seed: "This lawyer has a theory about who did it and needs the investigators to check it out." },
            { event: "The local undertaker is swamped with recently deceased clients. Where are all these corpses coming from? He doesn't even recognize them and they all share one strange trait.", seed: "Are these people even from this town?" },
            { event: "A local guide is recruiting adventurers to help with an expedition into nearby dangerous territory. A noble is convinced that an inherited map leads to treasure.", seed: "Is the party interested? The reward is quite good!" }
        ],
        "Residential District": [
            { event: "Slum lords hiking rents sky high. Residents are on the verge of rioting!", seed: "PCs take the disturbance to the local slum lord, who is potentially connected with organized crime." },
            { event: "Giant rat (or other nastier) infestation!", seed: "PCs investigate. Probably originating from the sewers or catacombs. What else is down there?" },
            { event: "A particular group (religious/cult?) has moved into the area. Certain narrow-minded residents are not happy.", seed: "PCs move in to mediate? Surely we can all get along." },
            { event: "Brothel setting up shop. Certain narrow-minded residents are not happy.", seed: "Frequent spats between residents and brothel employees. Organized crime may be involved." },
            { event: "Tavern moving into the area. The resident's association is worried about this attracting 'the wrong sort of people'.", seed: "Residents picketing outside tavern, sometimes violence erupts." },
            { event: "Town planning has determined that a new street or road needs to run right through this area. They are compulsorily acquiring houses.", seed: "Residents in an uproar. Perhaps PCs can take this to city hall, acting as representatives?" },
            { event: "Burglaries have been happening in various houses around here.", seed: "PCs apprehend the villain? Might take some staking out." },
            { event: "Lively block party getting a little too lively.", seed: "The town guard is trying to disband it but it looks like a nasty confrontation is imminent." },
            { event: "A fire has ravaged / is ravaging several houses.", seed: "Does anyone need saving?" },
            { event: "Major graffiti / vandalism disturbance.", seed: "Who is perpetrating this, and what does the graffiti say?" },
            { event: "Squatters in abandoned houses. And they may not be humanoid!", seed: "Adventurers hired to get to the bottom of this situation." },
            { event: "A sorcerer moved into the area recently, and the smells and sounds coming from his house have been alarming residents.", seed: "What is he up to in there?" },
            { event: "A team of archaeologists has found something in the middle of someone's courtyard and are now digging large holes.", seed: "Some sort of ancient tomb, or perhaps something that should be left buried?" },
            { event: "Natural gas, under the streets, is causing explosions.", seed: "PCs investigate cause? Does an explosion happen as they are passing through?" },
            { event: "Bodies found in the wall of a particular house, or buried in the garden. Historical, or recent?", seed: "This could be the result of an ancient crime." },
            { event: "A local group of bards is practicing their songs till all hours, annoying local residents.", seed: "OK guys, we know you love to jam, but this is getting ridiculous!" },
            { event: "Gangs of armed thugs, roaming the streets at night, terrorising local residents.", seed: "These thugs need to be taught a lesson." },
            { event: "Local authorities believe that a large building connects to a system of tunnels below and is used to ferry criminals.", seed: "Adventurers hired to investigate." },
            { event: "Bizarre smells are coming from a local restaurant.", seed: "What are they cooking in there? Smells nasty!" },
            { event: "A wealthy noble has just purchased the entire district from its slum-lord owners and is the process of evicting everyone.", seed: "Who does this noble think she is?" }
        ],
        "Scribes District": [
            { event: "Shortage of ink is making doing business difficult!", seed: "Adventurers contracted to go and search for giant squid." },
            { event: "A map vendor has come into possession of a rare map. He can't really understand its strange markings.", seed: "Adventurers hired to look into it." },
            { event: "A scribe is offering a reward of 500 gold pieces to the brave soul who can pluck a feather from a living roc.", seed: "Adventurers hired to quest into the mountains and retrieve a roc feather." },
            { event: "A local bookseller has come into possession of a disturbing occult tome. Cultists are protesting outside the bookshop.", seed: "Can you aid this poor merchant? They appear to be in way over their head." },
            { event: "Carts carrying wood to the town/city for conversion into paper have been waylaid by an army of angry treants.", seed: "Adventurers asked to mediate." },
            { event: "There is a huge dispute regarding paper supplies between officials, militia and townsfolk due to military activity.", seed: "Adventurers to look into securing another source of paper?" },
            { event: "A fanatic local religion is advocating the burning of what they call 'profane texts.' Tensions are high.", seed: "What can the adventurers do to quell this fanaticism and stop this madness?" },
            { event: "A fire has broken out and threatens to consume several well-loved bookstores.", seed: "If the party can help rescue these stores, they may be rewarded with a valuable tome or two." }
        ],
        "Smith's District": [
            { event: "Shortage of commodities such as metals is halting local industry and causing strife amongst workers and businesses.", seed: "PCs take on contract to locate new source of commodities." },
            { event: "Oversupply / harsh taxes / disturbances with military funding have caused quite a few smiths to close.", seed: "Adventurers asked to mediate." },
            { event: "Organized crime is trying to muscle their way into the area, offering 'protection' to blacksmithing businesses.", seed: "Sounds like some thugs need a beatdown! Or at least a stern talking-to." },
            { event: "The creation of a large dwarven artifact is causing one forge to emit an extreme, disruptive amount of heat.", seed: "Adventurers asked to investigate." },
            { event: "Workers are being mistreated in several smiths and smelting factories. Exploitation is suspected.", seed: "Some particularly vulnerable people are being mistreated. What are you going to do about it?" },
            { event: "One industry is taking all the metal products; other industries are suffering and unable to operate business.", seed: "This conflict is impinging on peaceful life within this settlement!" },
            { event: "Fire has broken out, started from one of the forges. If not controlled, there could be huge damage.", seed: "Adventurers to the rescue!" },
            { event: "A bound elemental controlling a forge has escaped and is causing havoc.", seed: "You may encounter this elemental on the street, or you may hear about it and be asked to help." }
        ]
    }
});