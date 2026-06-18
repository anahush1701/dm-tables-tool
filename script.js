const tablesDatabase = window.tablesDatabase || [];
let activeTable = null;

// --- AUTO-CATEGORIZED DASHBOARD RENDERER ---
function renderDashboard(searchTerm = "") {
    tableList.innerHTML = "";
    
    // Safety Fallback: Automatically assigns categories to older files
    tablesDatabase.forEach(table => {
        if (!table.category) {
            if (table.id === "the-oracle" || table.id === "situations-verbs") table.category = "core";
            else if (table.id === "weather-hexes" || table.id === "regional-events") table.category = "environment";
            else if (table.id === "master-location-encounters" || table.id === "creatures-table" || table.id === "what-wakes-you" || table.id === "master-traps" || table.id === "narrative-encounters" || table.id === "boons-banes-matrix" || table.id === "items-table") table.category = "exploration";
            else if (table.id === "settlement-shops" || table.id === "tavern-name-generator" || table.id === "tavern-profile-details" || table.id === "settlement-builder") table.category = "settlements";
            else if (table.id === "generating-rumours" || table.id === "quest-generator" || table.id === "clue-table") table.category = "story";
            else table.category = "core";
        }
    });

    const filtered = tablesDatabase.filter(table => 
        table.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        table.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = {
        "core": "🔮 Core Systems",
        "environment": "🌍 World & Environment",
        "exploration": "⚔️ Exploration & Tactical Pacing",
        "settlements": "🏘️ Settlement Utilities",
        "story": "📜 Story Hooks & Investigation"
    };

    // Render grouped layout categories
    for (let catKey in categories) {
        const categoryTables = filtered.filter(t => t.category === catKey);
        
        if (categoryTables.length > 0) {
            const sectionHeader = document.createElement('h2');
            sectionHeader.style.gridColumn = "1 / -1";
            sectionHeader.style.margin = "1.5rem 0 0.5rem 0";
            sectionHeader.style.color = "var(--text-muted)";
            sectionHeader.style.fontSize = "1.2rem";
            sectionHeader.innerText = categories[catKey];
            tableList.appendChild(sectionHeader);

            categoryTables.forEach(table => {
                const card = document.createElement('div');
                card.className = 'table-card';
                card.innerHTML = `<h3>${table.title}</h3><p>${table.description}</p>`;
                card.addEventListener('click', () => openTablePage(table));
                tableList.appendChild(card);
            });
        }
    }
}

// --- DOM ELEMENTS ---
const homeView = document.getElementById('home-view');
const tableView = document.getElementById('table-view');
const tableList = document.getElementById('table-list');
const searchInput = document.getElementById('search-input');
const backBtn = document.getElementById('back-btn');
const rollBtn = document.getElementById('roll-btn');
const rollOutput = document.getElementById('roll-output');
const customModifierZone = document.getElementById('custom-modifier-zone');

function openTablePage(table) {
    activeTable = table;
    homeView.classList.add('hidden');
    tableView.classList.remove('hidden');

    document.getElementById('current-table-title').innerText = table.title;
    document.getElementById('current-table-desc').innerText = table.description;
    rollOutput.innerText = "Click the button to roll...";
    
    customModifierZone.innerHTML = "";
    const listContainer = document.getElementById('current-table-rows');
    listContainer.innerHTML = "";

    if (table.type === "oracle") {
        const wrapper = document.createElement('div'); wrapper.className = 'modifier-select-wrapper';
        let optionsHTML = table.modifiers.map(mod => `<option value="${mod.value}" ${mod.value === 0 ? 'selected' : ''}>${mod.label}</option>`).join('');
        wrapper.innerHTML = `<label>Select Likelihood:</label><select id="oracle-mod-select">${optionsHTML}</select>`;
        customModifierZone.appendChild(wrapper);
        listContainer.innerHTML = table.entries.map(e => `<li>${e}</li>`).join('');
    } 
    else if (table.type === "hex-grid") {
        const wrapper = document.createElement('div'); wrapper.className = 'modifier-select-wrapper';
        wrapper.innerHTML = `
            <div style="margin-bottom:1rem;"><label>Current Season:</label><select id="weather-season-select"><option value="Spring">Spring</option><option value="Summer">Summer</option><option value="Autumn">Autumn</option><option value="Winter">Winter</select></div>
            <div><label>Yesterday's Weather:</label><select id="yesterday-weather-select"><option value="unknown">Unknown / Seasonal Shift Setup</option></select></div>
        `;
        customModifierZone.appendChild(wrapper);
        const sSel = document.getElementById('weather-season-select'); const ySel = document.getElementById('yesterday-weather-select');
        function buildYDrop() {
            const s = sSel.value; const sData = table.seasons[s]; let html = '<option value="unknown">Unknown / Seasonal Shift Setup</option>';
            for (let id in sData.names) { html += `<option value="${id}">${sData.names[id]}</option>`; }
            ySel.innerHTML = html;
            listContainer.innerHTML = Object.keys(sData.names).map(id => `<li><strong>${sData.names[id]}</strong></li>`).join('');
        }
        sSel.addEventListener('change', buildYDrop); buildYDrop();
    } 
    else if (table.type === "ranged-d100") {
        listContainer.innerHTML = table.ranges.map(r => `<li><strong>[${r.min}–${r.max}]:</strong> ${r.result}</li>`).join('');
    }
    else if (table.type === "two-part") {
        listContainer.innerHTML = table.part1.map((p1, i) => `<li>[d20: ${i+1}] ${p1} ... ${table.part2[i]}</li>`).join('');
    }
    else if (table.type === "multi-column-profile") {
        for (let colName in table.columns) { listContainer.innerHTML += `<li style="list-style:none; margin-bottom:1rem;"><strong>${colName}:</strong><br><span style="font-size:0.9rem; color:var(--text-muted);">${table.columns[colName].map((v,i)=>`[${i+1}] ${v}`).join(' | ')}</span></li>`; }
    }
    else if (table.type === "chained") {
        let referenceHTML = `<li style="list-style:none; margin-bottom:1rem;"><strong>Step 1: Rumour Subject (d4)</strong><br><span style="font-size:0.9rem; color:var(--text-muted);">` + table.subjects.map(s => `[${s.roll}] ${s.name} (${s.notes})`).join(' | ') + `</span></li><li style="list-style:none;"><strong>Step 2: Location Matrix (d12 if 'Place' is rolled)</strong><ol style="margin-top:0.5rem; padding-left:1.2rem; font-size:0.9rem; color:var(--text-muted);">` + table.locations.map(l => `<li>${l.replace("MILES", "1d4")}</li>`).join('') + `</ol></li>`;
        listContainer.innerHTML = referenceHTML;
    }
    else if (table.type === "environment-matrix") {
        const wrapper = document.createElement('div'); wrapper.className = 'modifier-select-wrapper';
        let envOptions = Object.keys(table.environments).map(env => `<option value="${env}">${env}</option>`).join('');
        wrapper.innerHTML = `<label for="env-type-select">Select Environment Context:</label><select id="env-type-select">${envOptions}</select>`;
        customModifierZone.appendChild(wrapper);
        const envSelect = document.getElementById('env-type-select');
        function updateReferenceListView() {
            const selectedEnv = envSelect.value; const entries = table.environments[selectedEnv];
            listContainer.innerHTML = entries.map(r => { let textClean = r.result.replace("[SUB_SKILL_1]", "Roll d10 Skill Check").replace("[SUB_SKILL_2]", "Roll d10 Skill Check"); return `<li><strong>${r.min === r.max ? r.min : r.min+'–'+r.max}:</strong> ${textClean}</li>`; }).join('');
        }
        envSelect.addEventListener('change', updateReferenceListView); updateReferenceListView();
    }
    else if (table.type === "combo-quest") {
        let referenceHTML = `<li style="list-style:none; margin-bottom:1.5rem;"><strong>Core Target Problems (d100)</strong><ol style="font-size:0.9rem; color:var(--text-muted); margin-top:0.5rem; padding-left:1.2rem;">` + table.problems.map(p => `<li>[${p.min}-${p.max}] <strong>${p.problem}</strong> → Quest Goal: <em>${p.quest}</em></li>`).join('') + `</ol></li><li style="list-style:none;"><strong>Quest Discovery Sources (d100)</strong><ol style="font-size:0.9rem; color:var(--text-muted); margin-top:0.5rem; padding-left:1.2rem;">` + table.sources.map(s => `<li>[${s.min}-${s.max}] ${s.source}</li>`).join('') + `</ol></li>`;
        listContainer.innerHTML = referenceHTML;
    }
    else if (table.type === "clue-matrix") {
        const wrapper = document.createElement('div'); wrapper.className = 'modifier-select-wrapper';
        let optionsHTML = Object.keys(table.environments).map(env => `<option value="${env}">${env}</option>`).join('');
        wrapper.innerHTML = `<label for="clue-env-select">Select Clue Environment:</label><select id="clue-env-select">${optionsHTML}</select>`;
        customModifierZone.appendChild(wrapper);
        const clueEnvSelect = document.getElementById('clue-env-select');
        function renderClueReferenceList() { const selectedEnv = clueEnvSelect.value; listContainer.innerHTML = table.environments[selectedEnv].map((clue, idx) => `<li><strong>${idx + 1}:</strong> ${clue.replace("**[SUB_D4_ALTERCATION]**", "Roll d4 Alternation branch")}</li>`).join(''); }
        clueEnvSelect.addEventListener('change', renderClueReferenceList); renderClueReferenceList();
    }
    else if (table.type === "settlement-shop-generator") {
        const wrapper = document.createElement('div'); wrapper.className = 'modifier-select-wrapper';
        let sizeOptions = table.sizes.map(s => `<option value="${s}">${s}</option>`).join('');
        let shopOptions = Object.keys(table.merchants).map(m => `<option value="${m}">${m}</option>`).join('');
        wrapper.innerHTML = `<div style="margin-bottom:1rem;"><label for="settlement-size-select">Settlement Scale:</label><select id="settlement-size-select">${sizeOptions}</select></div><div><label hitch for="merchant-type-select">Merchant Institution:</label><select id="merchant-type-select">${shopOptions}</select></div>`;
        customModifierZone.appendChild(wrapper);
        const sSelect = document.getElementById('settlement-size-select'); const mSelect = document.getElementById('merchant-type-select');
        function updateReferenceMatrixView() { const chosenSize = sSelect.value; const sizeIdx = table.sizes.indexOf(chosenSize); listContainer.innerHTML = Object.keys(table.merchants).map(mName => { const dcVal = table.merchants[mName][sizeIdx]; const dcDisplay = dcVal === null ? '<span style="color:red;">Unavailable</span>' : `DC ${dcVal}`; return `<li><strong>${mName}:</strong> ${dcDisplay}</li>`; }).join(''); }
        sSelect.addEventListener('change', updateReferenceMatrixView); updateReferenceMatrixView();
    }
    else if (table.type === "2d20-list") {
        listContainer.innerHTML = Object.keys(table.entries).map(rollKey => `<li><strong>Roll ${rollKey}:</strong> ${table.entries[rollKey]}</li>`).join('');
    }
    else if (table.type === "situations-verbs") {
        listContainer.innerHTML = `<li style="list-style:none; margin-bottom:1rem;"><strong>Step 1: Hundreds Bracket (d10)</strong><br><span style="font-size:0.9rem; color:var(--text-muted);">1-2: 0-99 | 3-4: 100-199 | 5-6: 200-299 | 7-8: 300-399 | 9-10: 400-499</span></li><li style="list-style:none;"><strong>Step 2: Units Selector (d100)</strong><br><span style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${table.entries.map((v, i) => `[${i+1}] ${v}`).join(' | ')}</span></li>`;
    }
    else if (table.type === "traps-matrix") {
        const wrapper = document.createElement('div'); wrapper.className = 'modifier-select-wrapper';
        wrapper.innerHTML = `<div style="margin-bottom:1rem;"><label for="trap-style-select">Trap Ecosystem Strategy:</label><select id="trap-style-select"><option value="Standard">Standard Dungeon Traps (d100)</option><option value="Wilderness">Wilderness / Urban Traps (d10)</option></select></div><div id="trap-variable-input-row"></div>`;
        customModifierZone.appendChild(wrapper);
        const styleSelect = document.getElementById('trap-style-select'); const inputRow = document.getElementById('trap-variable-input-row');
        function refreshTrapReferenceLayout() {
            const isStandard = styleSelect.value === "Standard";
            if (isStandard) {
                inputRow.innerHTML = `<label for="trap-pc-level">Target PC Level:</label><input type="number" id="trap-pc-level" value="1" min="1" max="20" style="width:100%; padding:0.75rem; background-color:var(--bg-input); border:1px solid var(--border); border-radius:6px; color:var(--text-main); box-sizing:border-box;">`;
                listContainer.innerHTML = table.standard.map(t => `<li><strong>[${t.min}–${t.max}] ${t.type}:</strong> Notice DC ${t.notice} | Disarm DC ${t.save}</li>`).join('');
            } else {
                inputRow.innerHTML = `<label for="trap-adventure-tier">Campaign Threat Tier:</label><input type="number" id="trap-adventure-tier" value="1" min="1" max="4" style="width:100%; padding:0.75rem; background-color:var(--bg-input); border:1px solid var(--border); border-radius:6px; color:var(--text-main); box-sizing:border-box;">`;
                listContainer.innerHTML = table.wilderness.map(t => `<li><strong>[d10: ${t.roll}] ${t.type}:</strong> Notice DC 11+Tier | Save DC ${t.save}+Tier</li>`).join('');
            }
        }
        styleSelect.addEventListener('change', refreshTrapReferenceLayout); refreshTrapReferenceLayout();
    }
    else if (table.type === "settlement-builder") {
        listContainer.innerHTML = `
            <li style="list-style:none; margin-bottom:1rem;"><strong>Scale Mappings (d6):</strong> Encampment, Hamlet, Village, Town, City, Metropolis</li>
            <li style="list-style:none; margin-bottom:1rem;"><strong>Ruler Modifiers Matrix (d20):</strong> Evaluates alignment rules from Lawless (+4 Disorder) up to Despotic (-5 Disorder).</li>
            <li style="list-style:none;"><strong>District Merchant Directory Mappings:</strong> Automatically rolls distinct localized storefronts and signature shops from the custom district sub-tables.</li>
        `;
    }
    else if (table.type === "narrative-matrix") {
        const wrapper = document.createElement('div'); wrapper.className = 'modifier-select-wrapper';
        let envOptions = Object.keys(table.environments).map(env => `<option value="${env}">${env}</option>`).join('');
        wrapper.innerHTML = `<label for="narrative-env-select">Select Narrative Context:</label><select id="narrative-env-select">${envOptions}</select>`;
        customModifierZone.appendChild(wrapper);
        const envSelect = document.getElementById('narrative-env-select');
        function updateNarrativeListView() { const selectedEnv = envSelect.value; listContainer.innerHTML = table.environments[selectedEnv].map(r => `<li><strong>[${r.min === r.max ? r.min : r.min+'–'+r.max}]:</strong> ${r.result.replace(/\*\*\[.*?\]\*\*/g, "(Dynamic Context Sub-Roll)")}</li>`).join(''); }
        envSelect.addEventListener('change', updateNarrativeListView); updateNarrativeListView();
    }
    else if (table.type === "boons-banes-matrix") {
        const wrapper = document.createElement('div'); wrapper.className = 'modifier-select-wrapper';
        wrapper.innerHTML = `<label for="boon-bane-strand-select">Active Metaphysical Strand:</label><select id="boon-bane-strand-select"><option value="boons">Supernatural Divine Boons (d100)</option><option value="banes">Cosmic Malefic Banes (d100)</option></select>`;
        customModifierZone.appendChild(wrapper);
        const strandSelect = document.getElementById('boon-bane-strand-select');
        function refreshBoonBaneReference() { const strand = strandSelect.value; listContainer.innerHTML = table[strand].map(r => `<li><strong>[${r.min}–${r.max}]:</strong> ${r.result.replace(/\*\*\[.*?\]\*\*/g, "(Dynamic Sub-Roll)")}</li>`).join(''); }
        strandSelect.addEventListener('change', refreshBoonBaneReference); refreshBoonBaneReference();
    }
    // BRAND NEW HANDLER VISUALIZER: Two-stage Master Item Table Layout List
    else if (table.type === "items-table") {
        listContainer.innerHTML = `
            <li style="list-style:none; margin-bottom:1rem;"><strong>Custom Two-Tier Selector Architecture:</strong> Uses an integrated d4 hundreds calculator mapped directly alongside a standard d100 unit index array.</li>
            <li style="list-style:none; margin-bottom:1rem;"><strong>Bracket Distribution Rules (image_1aff22.jpg):</strong> d4 Roll 1 (100-199) | Roll 2 (200-299) | Roll 3 (300-399) | Roll 4 (0-99).</li>
            <li style="list-style:none;"><strong>Transcribed Library Size:</strong> 399 distinct roll destinations completely cataloged across active display panels.</li>
        `;
    }
}

// --- CORE PROCESSING ROLLER ENGINE ---
rollBtn.addEventListener('click', () => {
    if (!activeTable) return;
    rollOutput.style.opacity = 0.4;

    setTimeout(() => {
        if (activeTable.type === "oracle") {
            const rawD20 = Math.floor(Math.random() * 20) + 1; const modifier = parseInt(document.getElementById('oracle-mod-select').value, 10); const total = rawD20 + modifier;
            let finalResult = total <= 2 ? "No, and" : total <= 7 ? "No" : total <= 9 ? "No, but" : total === 10 ? "Maybe (skill check or reroll)" : total <= 12 ? "Yes, but" : total <= 18 ? "Yes" : "Yes, and";
            const modSign = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            rollOutput.innerHTML = `<div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.25rem;">Rolled: d20 (${rawD20}) ${modifier !== 0 ? modSign : ''} = <strong>${total}</strong></div><div style="color: var(--accent); font-weight: bold; font-size: 1.4rem;">🎲 ${finalResult}</div>`;
        } 
        else if (activeTable.type === "hex-grid") {
            const s = document.getElementById('weather-season-select').value; const y = document.getElementById('yesterday-weather-select').value; const sData = activeTable.seasons[s];
            const d1 = Math.floor(Math.random() * 6) + 1; const d2 = Math.floor(Math.random() * 6) + 1; const tot = d1 + d2; let fHex = null; let notes = "";
            if (y === "unknown") { fHex = sData.starts[tot]; notes = "Initialization roll successful."; } 
            else {
                const cHex = parseInt(y, 10); let dIdx = tot === 11 ? 0 : tot === 8 ? 1 : tot === 7 ? 2 : (tot==5||tot==6) ? 3 : (tot==3||tot==4) ? 4 : (tot==2==12) ? 5 : "STAY";
                if (dIdx === "STAY") { fHex = cHex; notes = `Rolled ${tot}: System Loop pattern. Weather remains constant.`; } 
                else { const target = activeTable.topology[cHex].neighbors[dIdx]; if (target === null) { fHex = cHex; notes = `Rolled ${tot}: Boundary barrier wall impacted. Weather repeats.`; } else { fHex = target; notes = `Rolled ${tot}: Moving coordinates vector seamlessly.`; } }
            }
            rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted);">2d6 (${d1}+${d2}) = ${tot} | ${notes}</div><div style="color:var(--accent); font-weight:bold; font-size:1.4rem;">🌤️ ${sData.names[fHex]}</div>`;
            document.getElementById('yesterday-weather-select').value = fHex;
        } 
        else if (activeTable.type === "ranged-d100") {
            const roll = Math.floor(Math.random() * 100) + 1; const match = activeTable.ranges.find(r => roll >= r.min && roll <= r.max);
            let finalOutputString = match.result; let subRollLog = "";
            finalOutputString = finalOutputString.replace(/\[(1d\d+)\]/g, (m, diceExpr) => { const sides = parseInt(diceExpr.split('d')[1], 10); const result = Math.floor(Math.random() * sides) + 1; subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Inline ${diceExpr}: Rolled a <strong>${result}</strong>.</div>`; return `<span style="color:var(--accent); font-weight:bold;">${result}</span>`; });
            if (finalOutputString.includes("**[SUB_BOON_FORTUNATE_FIND]**")) { const subD20 = Math.floor(Math.random() * 20) + 1; let rarityTier = subD20 <= 14 ? "Common" : subD20 <= 18 ? "Uncommon" : subD20 === 19 ? "Rare" : "Very Rare"; subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Magic Item Distribution Check: Rolled d20 (<strong>${subD20}</strong>).</div>`; finalOutputString = finalOutputString.replace("**[SUB_BOON_FORTUNATE_FIND]**", `<span style="color:var(--accent); font-weight:bold;">${rarityTier} Tier</span>`); }
            rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Rolled: d100 (<strong>${roll}</strong>)</div>${subRollLog}<div style="color:var(--accent); font-weight:bold; font-size:1.25rem; line-height:1.4;">🎁 ${finalOutputString}</div>`;
        }
        else if (activeTable.type === "two-part") {
            const r1 = Math.floor(Math.random() * 20); const r2 = Math.floor(Math.random() * 20);
            rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted);">Rolled: 2d20 (P1: ${r1+1} | P2: ${r2+1})</div><div style="color:var(--accent); font-weight:bold; font-size:1.4rem;">🍺 ${activeTable.part1[r1]} ${activeTable.part2[r2]}</div>`;
        }
        else if (activeTable.type === "multi-column-profile") {
            let outputHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">Rolled 5 independent d10 arrays simultaneously:</div><div style="display:grid; gap:0.5rem;">`;
            for (let colName in activeTable.columns) { const roll = Math.floor(Math.random() * 10); outputHTML += `<div style="font-size:1rem;"><strong>${colName}:</strong> <span style="color:var(--accent); font-weight:bold;">${activeTable.columns[colName][roll]}</span> <span style="font-size:0.8rem; color:var(--text-muted);">(d10: ${roll+1})</span></div>`; }
            outputHTML += "</div>"; rollOutput.innerHTML = outputHTML;
        }
        else if (activeTable.type === "chained") {
            const d4Roll = Math.floor(Math.random() * 4) + 1; const matchSubject = activeTable.subjects.find(s => s.roll === d4Roll);
            let displayHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Step 1: Rolled d4 (<strong>${d4Roll}</strong>)</div><div style="font-size:1.2rem; margin-bottom:0.5rem;">Subject: <span style="color:var(--accent); font-weight:bold;">${matchSubject.name}</span></div>`;
            if (matchSubject.name === "Place") { const d12Roll = Math.floor(Math.random() * 12) + 1; let locRawText = activeTable.locations[d12Roll - 1]; if (locRawText.includes("MILES")) { const d4Miles = Math.floor(Math.random() * 4) + 1; locRawText = locRawText.replace("MILES", `<strong>${d4Miles}</strong>`); } displayHTML += `<div style="font-size:0.9rem; color:var(--text-muted); margin-top:0.75rem; margin-bottom:0.25rem;">Step 2: Rolled d12 (<strong>${d12Roll}</strong>)</div><div style="color:var(--accent); font-weight:bold; font-size:1.3rem;">📍 Location: ${locRawText}</div>`; } else { displayHTML += `<div style="color:var(--text-muted); font-size:1rem; font-style:italic;">Next Step: ${matchSubject.notes}</div>`; }
            rollOutput.innerHTML = displayHTML;
        }
        else if (activeTable.type === "environment-matrix") {
            const activeEnv = document.getElementById('env-type-select').value; const selectedEnvArray = activeTable.environments[activeEnv]; const rollD100 = Math.floor(Math.random() * 100) + 1; const matchedRange = selectedEnvArray.find(r => rollD100 >= r.min && rollD100 <= r.max); let finalOutputString = matchedRange.result; let subRollLog = "";
            if (finalOutputString.includes("[SUB_SKILL_1]")) { const subRoll = Math.floor(Math.random() * 10); const selectedSkill = activeTable.subSkills.physicalMental[subRoll]; subRollLog = `<div style="font-size:0.85rem; color:var(--text-muted);">Nested Action Required: Rolled Sub-d10 (<strong>${subRoll + 1}</strong>) to identify property constraints.</div>`; finalOutputString = finalOutputString.replace("[SUB_SKILL_1]", `<span style="color:var(--accent); font-weight:bold;">${selectedSkill}</span>`); } 
            else if (finalOutputString.includes("[SUB_SKILL_2]")) { const subRoll = Math.floor(Math.random() * 10); const selectedSkill = activeTable.subSkills.socialWisdom[subRoll]; subRollLog = `<div style="font-size:0.85rem; color:var(--text-muted);">Nested Action Required: Rolled Sub-d10 (<strong>${subRoll + 1}</strong>) to identify property constraints.</div>`; finalOutputString = finalOutputString.replace("[SUB_SKILL_2]", `<span style="color:var(--accent); font-weight:bold;">${selectedSkill}</span>`); }
            rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Environment: <strong>${activeEnv}</strong> | Primary Roll: d100 (<strong>${rollD100}</strong>)</div>${subRollLog}\n<div style="font-size:1.15rem; line-height:1.5; margin-top:0.5rem;">🗺️ ${finalOutputString}</div>`;
        }
        else if (activeTable.type === "combo-quest") {
            const roll1 = Math.floor(Math.random() * 100) + 1; const roll2 = Math.floor(Math.random() * 100) + 1; const matchedProblem = activeTable.problems.find(p => roll1 >= p.min && roll1 <= p.max); const matchedSource = activeTable.sources.find(s => roll2 >= s.min && roll2 <= s.max);
            rollOutput.innerHTML = `<div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">Rolled Dual Matrix: Problem (d100: <strong>${roll1}</strong>) | Source (d100: <strong>${roll2}</strong>)</div><div style="display:grid; gap:0.75rem; margin-top:0.5rem;"><div><strong>Quest Discovery:</strong> Via <span style="color:var(--accent); font-weight:bold;">${matchedSource.source}</span>.</div><div><strong>The Problem:</strong> ${matchedProblem.problem}.</div><div style="font-size:1.25rem; margin-top:0.25rem; padding-top:0.5rem; border-top:1px dashed var(--border);">📜 <strong>Party Goal:</strong> <span style="color:var(--accent); font-weight:bold;">${matchedProblem.quest}</span></div></div>`;
        }
        else if (activeTable.type === "clue-matrix") {
            const chosenEnv = document.getElementById('clue-env-select').value; const clueArray = activeTable.environments[chosenEnv]; const rollD100 = Math.floor(Math.random() * 100) + 1; let rawClueText = clueArray[rollD100 - 1]; let subLog = "";
            rawClueText = rawClueText.replace(/\[(1d\d+)\]/g, (match, diceExpr) => { const sides = parseInt(diceExpr.split('d')[1], 10); const result = Math.floor(Math.random() * sides) + 1; subLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Inline ${diceExpr}: Rolled a <strong>${result}</strong>.</div>`; return `<span style="color:var(--accent); font-weight:bold;">${result}</span>`; });
            if (rawClueText.includes("**[SUB_D4_ALTERCATION]**")) { const subD4 = Math.floor(Math.random() * 4) + 1; const branchText = subD4 <= 2 ? "They wounded it and were wounded by it." : "They were savaged and fled for their life."; subLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Altercation Result: Rolled Sub-d4 (<strong>${subD4}</strong>).</div>`; rawClueText = rawClueText.replace("**[SUB_D4_ALTERCATION]**", `<br><span style="color:var(--accent); font-style:italic;">Outcome: ${branchText}</span>`); }
            rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Clue Type: <strong>${chosenEnv}</strong> | Primary Roll: d100 (<strong>${rollD100}</strong>)</div>${subLog}<div style="font-size:1.15rem; line-height:1.4; margin-top:0.5rem;">🔍 ${rawClueText}</div>`;
        }
        else if (activeTable.type === "settlement-shop-generator") {
            const chosenSize = document.getElementById('settlement-size-select').value; const chosenMerchant = document.getElementById('merchant-type-select').value; const sizeIdx = activeTable.sizes.indexOf(chosenSize); const existenceDC = activeTable.merchants[chosenMerchant][sizeIdx];
            if (existenceDC === null) { rollOutput.innerHTML = `<div style="color:#f55757; font-weight:bold; font-size:1.2rem;">❌ Institution Unavailable</div><div style="font-size:0.95rem; margin-top:0.25rem; color:var(--text-muted);">A <strong>${chosenMerchant}</strong> does not exist in a settlement of size: <em>${chosenSize}</em>.</div>`; rollOutput.style.opacity = 1; return; }
            const existenceRoll = Math.floor(Math.random() * 20) + 1;
            if (existenceRoll < existenceDC) { rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Shop Existence Check: Rolled d20 (<strong>${existenceRoll}</strong>) vs Target DC: <strong>${existenceDC}</strong></div><div style="color:var(--text-muted); font-weight:bold; font-size:1.2rem;">✖️ Shop Not Found</div><div style="font-size:0.95rem; color:var(--text-muted); margin-top:0.25rem;">This specific establishment could not be located here.</div>`; rollOutput.style.opacity = 1; return; }
            const qualityRoll = Math.floor(Math.random() * 20) + 1; const rangeConfig = activeTable.qualityRanges[chosenSize]; const matchedQualityObject = rangeConfig.find(bracket => qualityRoll <= bracket.max); const qualityLabel = matchedQualityObject.label; const dcProfile = activeTable.itemDCs[qualityLabel];
            rollOutput.innerHTML = `<div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">Existence Roll: d20 (<strong>${existenceRoll}</strong>) vs DC ${existenceDC} (Passed!)<br>Quality Roll: d20 (<strong>${qualityRoll}</strong>) matched <em>${chosenSize}</em> threshold table</div><div style="font-size:1.2rem; margin-bottom:0.5rem;">🏪 Merchant Status: <span style="color:var(--accent); font-weight:bold;">Open for Business</span></div><div style="font-size:1.1rem; margin-bottom:0.75rem;">Shop Quality Tier: <span style="color:var(--accent); font-weight:bold; font-style:italic;">${qualityLabel}</span></div><div style="padding-top:0.5rem; border-top:1px dashed var(--border); display:grid; gap:0.25rem; font-size:0.95rem;"><div style="font-weight:bold; color:var(--text-muted); margin-bottom:0.25rem; text-transform:uppercase; font-size:0.8rem;">Item Availability Search DCs:</div><div>🟢 Common Items: <strong style="color:var(--accent);">DC ${dcProfile.common}</strong></div><div>🔵 Uncommon Items: <strong style="color:var(--accent);">DC ${dcProfile.uncommon}</strong></div><div>🟣 Rare Items: <strong style="color:var(--accent);">DC ${dcProfile.rare}</strong></div><div>🟠 Legendary Items: <strong style="color:var(--accent);">${dcProfile.legendary === "Not Available" ? "Not Available" : "DC " + dcProfile.legendary}</strong></div></div>`;
        }
        else if (activeTable.type === "2d20-list") {
            const d20_1 = Math.floor(Math.random() * 20) + 1; const d20_2 = Math.floor(Math.random() * 20) + 1; const totalSum = d20_1 + d20_2; const creatureName = activeTable.entries[totalSum];
            rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Rolled: 2d20 (${d20_1} + ${d20_2}) = <strong>${totalSum}</strong></div><div style="color:var(--accent); font-weight:bold; font-size:1.4rem;">🐾 Encountered: ${creatureName}</div>`;
        }
        else if (activeTable.type === "situations-verbs") {
            const rollD10 = Math.floor(Math.random() * 10) + 1; const rollD100 = Math.floor(Math.random() * 100) + 1; let baseHundreds = 0;
            if (rollD10 === 3 || rollD10 === 4) baseHundreds = 100; else if (rollD10 === 5 || rollD10 === 6) baseHundreds = 200; else if (rollD10 === 7 || rollD10 === 8) baseHundreds = 300; else if (rollD10 === 9 || rollD10 === 10) baseHundreds = 400;
            const finalIndex = baseHundreds + rollD100; const resolvedIndex = finalIndex > 499 ? 499 : finalIndex; const verbResultText = activeTable.entries[resolvedIndex - 1];
            rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Stage 1 (d10: <strong>${rollD10}</strong>) → Bracket base: ${baseHundreds} | Stage 2 (d100: <strong>${rollD100}</strong>)</div><div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem;">Total Resolved Matrix Index Target: <strong>#${resolvedIndex}</strong></div><div style="color:var(--accent); font-weight:bold; font-size:1.6rem; text-transform: capitalize;">🗣️ Word: ${verbResultText}</div>`;
        }
        else if (activeTable.type === "traps-matrix") {
            const mode = document.getElementById('trap-style-select').value; let finalHTML = "";
            if (mode === "Standard") {
                const rollD100 = Math.floor(Math.random() * 100) + 1; const match = activeTable.standard.find(t => rollD100 >= t.min && rollD100 <= t.max); const pcLevel = parseInt(document.getElementById('trap-pc-level').value || 1, 10); let trapType = match.type; let subLog = "";
                if (trapType.includes("[GLYPH_SUB]")) { const elements = ["Fire", "Cold", "Force", "Lightning"]; const subRoll = Math.floor(Math.random() * 4); subLog = `<div style="font-size:0.85rem; color:var(--text-muted);">Glyph Property Evaluation: Rolled element parameter → <strong>${elements[subRoll]}</strong>.</div>`; trapType = trapType.replace("[GLYPH_SUB]", `(<span style="color:var(--accent); font-weight:bold;">${elements[subRoll]} Spell</span>)`); }
                finalHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">System Mode: Dungeon Trap Matrix | Rolled d100 (<strong>${rollD100}</strong>)</div>${subLog}<div style="font-size:1.3rem; margin-bottom:0.5rem; font-weight:bold;">💥 Trap Triggered: ${trapType}</div><div style="display:grid; gap:0.25rem; font-size:1rem; margin-top:0.5rem; padding-top:0.5rem; border-top:1px dashed var(--border);"><div>👀 Notice Perception DC: <strong style="color:var(--accent);">DC ${match.notice}</strong></div><div>🛡️ Save / Disarm DC: <strong style="color:var(--accent);">DC ${match.save || match.maxSave}</strong></div><div>🎲 Scaling Attack Damage: <strong style="color:var(--accent);">${match.calcDmg(pcLevel)} damage</strong> <span style="font-size:0.85rem; color:var(--text-muted);">(Calculated at PC Level ${pcLevel})</span></div></div>`;
            } else {
                const rollD10 = Math.floor(Math.random() * 10) + 1; const match = activeTable.wilderness.find(t => t.roll === rollD10); const tier = parseInt(document.getElementById('trap-adventure-tier').value || 1, 10); const perceptionDC = match.notice + tier; const saveDC = match.save + tier; const evaluatedDmg = match.dmg(tier); let notesText = match.notes.replace("[ATH_DC]", 13 + tier);
                finalHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">System Mode: Wilderness / Urban Hazard | Rolled d10 (<strong>${rollD10}</strong>)</div><div style="font-size:1.3rem; margin-bottom:0.5rem; font-weight:bold;">🏹 Hazard Encountered: ${match.type}</div><div style="display:grid; gap:0.25rem; font-size:1rem; margin-top:0.5rem; padding-top:0.5rem; border-top:1px dashed var(--border);"><div>👀 Perception Check DC: <strong style="color:var(--accent);">DC ${perceptionDC}</strong> <span style="font-size:0.85rem; color:var(--text-muted);">(Stop here if successful)</span></div><div>🛡️ ${match.saveType} DC: <strong style="color:var(--accent);">DC ${saveDC}</strong></div><div>💔 Scaling Action Damage: <strong style="color:var(--accent);">${evaluatedDmg}</strong></div>${notesText ? `<div style="font-size:0.9rem; color:var(--text-muted); font-style:italic; margin-top:0.25rem; line-height:1.4;">⚠️ Effect Notes: ${notesText}</div>` : ""}</div>`;
            }
            rollOutput.innerHTML = finalHTML;
        }
        else if (activeTable.type === "settlement-builder") {
            const d6Pop = Math.floor(Math.random() * 6); const popObj = activeTable.populations[d6Pop]; const d6Demo = Math.floor(Math.random() * 6); let demoText = activeTable.demographics[d6Demo]; if (d6Demo === 5) { const subPct = Math.floor(Math.random() * 100) + 1; demoText = `Melting Pot: <span style="color:var(--accent); font-weight:bold;">${subPct}%</span> split of minority groups, remaining <span style="color:var(--accent); font-weight:bold;">${100 - subPct}%</span> belongs to a single founding race.`; } const d20Ruler = Math.floor(Math.random() * 20) + 1; const rulerObj = activeTable.rulers.find(r => d20Ruler <= r.max); const disorderMod = rulerObj.mod; const targetCount = popObj.getCount(); let generatedDistricts = [];
            if (popObj.type === "Hamlet") { popObj.fixed.forEach(fName => { let baseDC = fName === "Residential District" ? 14 : activeTable.districtsTable.find(d => d.name === fName).dc; if (fName === "Residential District") { const d4Class = Math.floor(Math.random() * 4) + 1; const classes = ["Poor Class", "Average Class", "Thriving Class", "Wealthy Class"]; fName = `Residential District (${classes[d4Class - 1]})`; baseDC = 12 + d4Class; } generatedDistricts.push({ name: fName, baseDC: baseDC, effectiveDC: baseDC - disorderMod }); }); } else if (targetCount > 0) { let safetyCounter = 0; while (generatedDistricts.length < targetCount && safetyCounter < 150) { safetyCounter++; const rollD100 = Math.floor(Math.random() * 100) + 1; const matchedDistrict = activeTable.districtsTable.find(d => rollD100 >= d.min && rollD100 <= d.max); let districtName = matchedDistrict.name; let baseDC = matchedDistrict.dc; if (districtName === "Residential District") { const d4Class = Math.floor(Math.random() * 4) + 1; const classes = ["Poor Class", "Average Class", "Thriving Class", "Wealthy Class"]; districtName = `Residential District (${classes[d4Class - 1]})`; baseDC = 12 + d4Class; } const isDuplicate = generatedDistricts.some(d => d.name === districtName); if (matchedDistrict.unique && isDuplicate && generatedDistricts.length < activeTable.districtsTable.length) continue; generatedDistricts.push({ name: districtName, baseDC: baseDC, effectiveDC: baseDC - disorderMod }); } }
            let districtsHTML = generatedDistricts.length === 0 ? `<div style="color:var(--text-muted); font-style:italic;">No distinct administrative sectors exist here.</div>` : `<div style="display:grid; grid-template-columns: 1fr; gap: 0.75rem; margin-top: 0.5rem;">`;
            generatedDistricts.forEach((d, index) => { const distCheckRoll = Math.floor(Math.random() * 20) + 1; const incidentOccurred = distCheckRoll >= d.effectiveDC; let hazardHTML = `<span style="color:#2ecc71; font-weight:bold; font-size:0.85rem;">🟢 Operational & Stable</span>`; if (incidentOccurred) { const lookupKey = d.name.split(' (')[0]; const activeSubTable = activeTable.disturbances[lookupKey]; if (activeSubTable) { const rollIndex = Math.floor(Math.random() * activeSubTable.length); const matchedIncident = activeSubTable[rollIndex]; hazardHTML = `<span style="color:#e74c3c; font-weight:bold; font-size:0.85rem;">⚠️ CRISIS ACTIVE (DC ${d.effectiveDC} Failed)</span><div style="margin-top:0.25rem; padding:0.4rem 0.6rem; background:rgba(231,76,60,0.05); border-left:2px solid #e74c3c; font-size:0.85rem; line-height:1.4; color:var(--text-main);"><strong>Incident:</strong> ${matchedIncident.event}<br><span style="color:var(--accent); font-weight:bold;">Hook:</span> ${matchedIncident.seed}</div>`; } } const rawDistrictLookupName = d.name.split(' (')[0]; const merchantProfile = activeTable.merchantTables[rawDistrictLookupName]; let signatureShops = []; if (merchantProfile) { for (let i = 0; i < 2; i++) { const subRoll = Math.floor(Math.random() * merchantProfile.die) + 1; const matchedShop = merchantProfile.ranges.find(r => subRoll >= r.min && subRoll <= r.max); if (matchedShop && !signatureShops.includes(matchedShop.name)) { signatureShops.push(matchedShop.name); } } } const shopsListHTML = signatureShops.length > 0 ? `<div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.35rem; padding-top:0.35rem; border-top:1px dashed rgba(255,255,255,0.03);">🏬 <strong>Notable Establishments:</strong> ${signatureShops.join(' | ')}</div>` : ""; districtsHTML += `<div style="background:var(--bg-input); padding:0.85rem; border-radius:6px; border:1px solid var(--border);"><div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.35rem; margin-bottom:0.4rem;"><span style="font-weight:bold; color:var(--text-main); font-size:1rem;">${index + 1}. ${d.name}</span><span style="font-size:0.8rem; color:var(--text-muted);">DC ${d.effectiveDC}</span></div><div>${hazardHTML}</div>${shopsListHTML}</div>`; }); if (generatedDistricts.length > 0) districtsHTML += `</div>`;
            rollOutput.innerHTML = `
                <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">Rolled Setup Index Blocks: Scale (d6: ${d6Pop + 1}) | Demographics (d6: ${d6Demo + 1}) | Leader (d20: ${d20Ruler})</div>
                <h3 style="margin:0 0 0.25rem 0; color:var(--accent); font-size:1.4rem;">🏡 Settlement Generated: ${popObj.type}</h3>
                <div style="font-size:0.95rem; color:var(--text-muted); margin-bottom:0.75rem;">Scale Density: <strong>${popObj.range}</strong> | Layout: ${popObj.districtsText}</div>
                <div style="margin-top:0.75rem; padding-top:0.5rem; border-top:1px dashed var(--border); font-size:0.95rem; line-height:1.4;"><strong>Demographic Composition:</strong><br>${demoText}</div>
                <div style="margin-top:0.75rem; padding-top:0.5rem; border-top:1px dashed var(--border); font-size:0.95rem; line-height:1.4;"><strong>Civic Profile:</strong> <span style="color:var(--accent); font-weight:bold;">${rulerObj.type} Regime</span> (Disorder Mod: ${disorderMod >= 0 ? '+' + disorderMod : disorderMod})<br><span style="font-size:0.9rem; color:var(--text-muted); font-style:italic;">${rulerObj.law}</span></div>
                <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px solid var(--border);"><strong style="font-size:0.9rem; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em;">District Inventories & Safety Status Profiles (${generatedDistricts.length}):</strong>${districtsHTML}</div>
            `;
        }
        else if (activeTable.type === "narrative-matrix") {
            const chosenEnv = document.getElementById('narrative-env-select').value; const contextArray = activeTable.environments[chosenEnv]; const rollD100 = Math.floor(Math.random() * 100) + 1; const matchedRange = contextArray.find(r => rollD100 >= r.min && rollD100 <= r.max); let rawNarrativeText = matchedRange.result; let innerLog = "";
            rawNarrativeText = rawNarrativeText.replace(/\[(1d\d+\+?\d?)\]/g, (match, diceExpr) => { let rolledVal = 0; if (diceExpr === "1d4+1") { rolledVal = (Math.floor(Math.random() * 4) + 1) + 1; } else { const sides = parseInt(diceExpr.split('d')[1], 10); rolledVal = Math.floor(Math.random() * sides) + 1; } innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Expression ${diceExpr}: Rolled a <strong>${rolledVal}</strong>.</div>`; return `<span style="color:var(--accent); font-weight:bold;">${rolledVal}</span>`; });
            if (rawNarrativeText.includes("**[SUB_D4_CATACLYSM]**")) { const options = ["The air crackles with some unknown energy.", "The ground shakes.", "An ominous peal of thunder resounds in the sky.", "The sun turns a dark shade of red."]; const roll = Math.floor(Math.random() * 4); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Cataclysm Vector: Rolled Sub-d4 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_CATACLYSM]**", `<span style="color:var(--accent); font-style:italic;">[Omen: ${options[roll]}]</span>`); }
            if (rawNarrativeText.includes("**[SUB_D6_TRAP]**")) { const roll = Math.floor(Math.random() * 6) + 1; const trapType = roll <= 2 ? "Rope trap" : roll <= 4 ? "Net trap" : "Pit trap"; innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Ambush Trigger: Rolled Sub-d6 (<strong>${roll}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_TRAP]**", `<span style="color:var(--accent); font-weight:bold;">${trapType}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D6_APPROACH]**")) { const roll = Math.floor(Math.random() * 6) + 1; const choices = roll <= 2 ? "the tread of many feet, as of an army" : roll <= 4 ? "a heavy tread, as of a large creature" : "the patter of many tiny feet, a large group of smaller creatures"; innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Audio Footprint: Rolled Sub-d6 (<strong>${roll}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_APPROACH]**", `<em>“${choices}”</em>`); }
            if (rawNarrativeText.includes("**[SUB_D4_MOON]**")) { const options = ["It is a completely different colour.", "A huge chunk has been blasted off by a comet or something similar, which looks epic but is rather worrying.", "It appears terrifyingly closer than normal.", "It is hanging in a phase that it shouldn't logically be."]; const roll = Math.floor(Math.random() * 4); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Lunar Anomaly: Rolled Sub-d4 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_MOON]**", `<span style="color:var(--accent); font-style:italic;">[Lunar Shift: ${options[roll]}]</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_MINERAL_86]**")) { const mats = ["solid Glass", "polished Steel", "raw Gemstone (too structurally hard to mine)", "an unidentified non-precious mineral"]; const roll = Math.floor(Math.random() * 4); rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_MINERAL_86]**", `<strong style="color:var(--accent);">${mats[roll]}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D4_PORTENT_91]**")) { const portents = ["a streaking Comet", "a dazzling Meteor shower", "a solar Eclipse", "a complete, sudden shift to day or night regardless of the actual time"]; const roll = Math.floor(Math.random() * 4); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Portent Variant: Rolled Sub-d4 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_PORTENT_91]**", `<strong style="color:var(--accent);">${portents[roll]}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D6_CONSTRUCT_92]**")) { const constructs = ["Animated Armour", "Stone Defender", "Shield Guardian", "Clay Golem", "Stone Golem", "Iron Golem"]; const roll = Math.floor(Math.random() * 6); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Garden Sentry Profile: Rolled Sub-d6 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_CONSTRUCT_92]**", `<span style="color:var(--accent); font-weight:bold;">${constructs[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_FESTIVAL_20]**")) { const customs = ["Feeding all passers-by, regardless of religion, until they are so full, they can barely move", "Treating all visitors to the temple like royalty, washing their feet, massaging their shoulders and generally pampering them", "Hurling insults at people passing by the temple", "Allowing the children to order the adults about and treat them like slaves for a day"]; const roll = Math.floor(Math.random() * 4); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Festival Tradition: Rolled Sub-d4 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_FESTIVAL_20]**", `<span style="color:var(--accent); font-weight:bold;">(${roll + 1}) ${customs[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_BUILDING_21]**")) { const blueprints = ["An embassy for the dwarven kingdom of ________", "An urban residence for a dwarven ruler", "A temple to a prominent dwarven god", "A grand tomb, commissioned by the devoted followers of a noted dwarven priest or mage"]; const roll = Math.floor(Math.random() * 4); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Architectural Intent: Rolled Sub-d4 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_BUILDING_21]**", `<span style="color:var(--accent); font-weight:bold;">(${roll + 1}) ${blueprints[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_ANOMALY_50]**")) { const anomalies = ["The building floats", "The building is covered by a dark shroud resembling night-time", "The building is surrounded by light patterns", "The building is partially spectral (transparent) and you can see its interior"]; const roll = Math.floor(Math.random() * 4); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Metaphysical Anomaly: Rolled Sub-d4 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_ANOMALY_50]**", `<span style="color:var(--accent); font-weight:bold;">(${roll + 1}) ${anomalies[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_BOAT_57]**")) { const vessels = ["A royal barge", "A goods freighter", "A pirate or explorer vessel of some description", "A mage's ship. If the city is landlocked, make it an airship instead"]; const roll = Math.floor(Math.random() * 4); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Canal Vessel: Rolled Sub-d4 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_BOAT_57]**", `<span style="color:var(--accent); font-weight:bold;">${vessels[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_ITEM_63]**")) { const drops = ["Mundane Item (Roll on Item table, p.163, until you get something that fits context)", "Weapon", "Gems and money (roll on CR 1 hoard table, DMG or TSAT)", "Common magic item"]; const roll = Math.floor(Math.random() * 4); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Dropped Item Tier: Rolled Sub-d4 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_ITEM_63]**", `<span style="color:var(--accent); font-weight:bold;">[${roll + 1}] ${drops[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D10_CREATURE_68]**")) { const roll = Math.floor(Math.random() * 10) + 1; const cType = roll <= 8 ? "Beast" : roll === 9 ? "Construct" : "Other (Choose an SRD/Monster Manual familiar)"; innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Stalking Entity: Rolled Sub-d10 (<strong>${roll}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D10_CREATURE_68]**", `<span style="color:var(--accent); font-weight:bold;">${cType}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_ROAR_3]**")) { const locations = ["Nearby", "Far away"]; const roll = Math.floor(Math.random() * 4) + 1; const choice = roll <= 2 ? locations[0] : locations[1]; innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Acoustic Direction: Rolled Sub-d4 (<strong>${roll}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_ROAR_3]**", `<strong>${choice}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D6_CORPSE_5]**")) { const contents = ["Note", "Bounty", "Map"]; const roll = Math.floor(Math.random() * 6) + 1; const choice = roll <= 2 ? contents[0] : roll <= 4 ? contents[1] : contents[2]; innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Corpse Inventory: Rolled Sub-d6 (<strong>${roll}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_CORPSE_5]**", `<strong>${choice}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D8_CREATURE_13]**")) { const types = ["aberration", "beast", "elemental", "fiend", "humanoid", "monstrosity", "undead", "dragon"]; const roll = Math.floor(Math.random() * 8); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Entity Taxonomy: Rolled Sub-d8 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D8_CREATURE_13]**", `<span style="color:var(--accent); font-weight:bold;">${types[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D6_ITEM_33]**")) { const implements = ["Ring", "Rod", "Scroll", "Staff", "Wand", "Weapon"]; const roll = Math.floor(Math.random() * 6); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Dropped Implement: Rolled Sub-d6 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_ITEM_33]**", `<strong style="color:var(--accent);">${implements[roll]}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D20_CAPTIVE_35]**")) { const captives = ["Rich Noble", "Charming thief", "Talkative explorer", "Whiny scientist", "Gruff admiral", "Innocent shapeshifter", "Dishevelled navigator", "Greedy priest", "Apathetic immortal", "Ignorant royal", "Distracted artificer", "Impatient engineer", "Xenophobic artist", "Sympathetic monk", "Agitated cultist", "Angry town guard", "Affectionate merchant", "Cursed aberration", "Shrewd judge", "Gloomy assassin"]; const roll = Math.floor(Math.random() * 20); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Cage Captive Profile: Rolled Sub-d20 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D20_CAPTIVE_35]**", `<span style="color:var(--accent); font-weight:bold;">${captives[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D10_STASH_42]**")) { const items = ["Food", "Food", "Alcohol", "Alcohol", "Weapons", "Weapons", "Wood for burning", "Wood for burning", "Random assortment of all of the above", "Random assortment of all of the above"]; const roll = Math.floor(Math.random() * 10); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Room Stash Type: Rolled Sub-d10 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D10_STASH_42]**", `<strong style="color:var(--accent);">${items[roll]}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D6_CLUE_44]**")) { const components = ["Graffiti", "Carved inscription", "Note", "Disembodied Voice", "NPC", "Overheard conversation"]; const roll = Math.floor(Math.random() * 6); rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_CLUE_44]**", `<span style="color:var(--accent); font-weight:bold;">${components[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D6_LEVER_62]**")) { const leverOutcomes = ["Opens a trapdoor", "Releases acid rain into the corridor", "Opens a dimensional portal", "Opens a previously locked door in a nearby part of the dungeon", "Triggers a spear trap", "Opens a secret door nearby"]; const roll = Math.floor(Math.random() * 6); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Pull Consequence: Rolled Sub-d6 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_LEVER_62]**", `<span style="color:var(--accent); font-style:italic;">[Effect: ${leverOutcomes[roll]}]</span>`); }
            if (rawNarrativeText.includes("**[SUB_D6_MEZZANINE_63]**")) { const happenings = ["Gladiatorial battle", "Summoning ritual", "Court trial", "Meeting of cultists or other group around a large table", "Battle between monster factions", "Leader addressing a large group"]; const roll = Math.floor(Math.random() * 6); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Chamber Inquest: Rolled Sub-d6 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_MEZZANINE_63]**", `<strong>${happenings[roll]}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D6_CONSTRUCT_65]**")) { const parts = ["Retriever", "Iron Golem", "d4 Iron Cobras", "Oaken Bolter", "Animated Armour", "Hellfire Engine"]; const roll = Math.floor(Math.random() * 6); rawNarrativeText = rawTransitText.replace("**[SUB_D6_CONSTRUCT_65]**", `<span style="color:var(--accent); font-weight:bold;">${parts[roll]}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D6_RENOVATION_81]**")) { const tasks = ["Clearing an obstruction", "Constructing a trap", "Tunnelling a new passage into the rock", "Decorating this area of the tunnel with a mural or runes", "Mining for minerals", "Forcing slaves to do their work (roll again to determine what that work is)"]; const roll = Math.floor(Math.random() * 6); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Labor Profile: Rolled Sub-d6 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_RENOVATION_81]**", `<em>padding: “${tasks[roll]}”</em>`); }
            if (rawNarrativeText.includes("**[SUB_D4_BRIDGE_88]**")) { const hazards = ["Natural geysers", "Acid pools", "Lava", "Dimensional rift"]; const roll = Math.floor(Math.random() * 4); rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_BRIDGE_88]**", `<strong style="color:#e74c3c;">${hazards[roll]}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D6_WRITING_89]**")) { const glyphs = ["Dwarvish", "Abyssal", "Infernal", "Undercommon", "Whatever language is most relevant to your adventure", "Whatever language is most relevant to your adventure"]; const roll = Math.floor(Math.random() * 6); rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_WRITING_89]**", `<span style="color:var(--accent); font-weight:500;">${glyphs[roll]} script</span>`); }
            if (rawNarrativeText.includes("**[SUB_D6_CART_95]**")) { const freight = ["Junk", "Minerals", "Prisoners", "Military supplies", "Food supplies", "A captive and angry monster"]; const roll = Math.floor(Math.random() * 6); innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Transposed Freight: Rolled Sub-d6 (<strong>${roll + 1}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D6_CART_95]**", `<strong style="color:var(--accent);">${freight[roll]}</strong>`); }
            if (rawNarrativeText.includes("**[SUB_D4_CHALLENGE_26]**")) { const roll = Math.floor(Math.random() * 4) + 1; const path = roll <= 2 ? "Roll on Skill Challenge table (p.139)" : "Level-appropriate easy combat encounter"; innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Operational Pivot: Rolled Sub-d4 (<strong>${roll}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_CHALLENGE_26]**", `<span style="color:var(--accent); font-weight:bold;">${path}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_BOON_51]**")) { const roll = Math.floor(Math.random() * 4) + 1; const res = roll <= 2 ? "Roll on Boon table (p.152)" : "Level-appropriate medium combat encounter"; innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Operational Pivot: Rolled Sub-d4 (<strong>${roll}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_BOON_51]**", `<span style="color:var(--accent); font-weight:bold;">${res}</span>`); }
            if (rawNarrativeText.includes("**[SUB_D4_BANE_76]**")) { const roll = Math.floor(Math.random() * 4) + 1; const path = roll <= 2 ? "Roll on Bane table (p.157)" : "Level-appropriate hard combat encounter"; innerLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Crisis Vector: Rolled Sub-d4 (<strong>${roll}</strong>).</div>`; rawNarrativeText = rawNarrativeText.replace("**[SUB_D4_BANE_76]**", `<span style="color:var(--accent); font-weight:bold;">${path}</span>`); }
            const prefixIcon = chosenEnv.includes("Dungeon") ? "💀" : chosenEnv.includes("Urban") ? "🏢" : "🍃";
            rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Ecosystem context: <strong>${chosenEnv}</strong> | Primary Roll: d100 (<strong>${rollD100}</strong>)</div>${innerLog}<div style="font-size:1.15rem; line-height:1.45; margin-top:0.5rem;">${prefixIcon} ${rawNarrativeText}</div>`;
        }
        else if (activeTable.type === "boons-banes-matrix") {
            const strand = document.getElementById('boon-bane-strand-select').value; const rollD100 = Math.floor(Math.random() * 100) + 1; const match = activeTable[strand].find(r => rollD100 >= r.min && rollD100 <= r.max); let finalOutputString = match.result; let subRollLog = "";
            finalOutputString = finalOutputString.replace(/\[(1d\d+)\]/g, (m, diceExpr) => { const sides = parseInt(diceExpr.split('d')[1], 10); const result = Math.floor(Math.random() * sides) + 1; subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Inline ${diceExpr}: Rolled a <strong>${result}</strong>.</div>`; return `<span style="color:var(--accent); font-weight:bold;">${result}</span>`; });
            if (finalOutputString.includes("**[SUB_BOON_FORTUNATE_FIND]**")) { const subD20 = Math.floor(Math.random() * 20) + 1; const rarityTier = subD20 <= 14 ? "Common" : subD20 <= 18 ? "Uncommon" : subD20 === 19 ? "Rare" : "Very Rare"; subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Magic Item Distribution Check: Rolled d20 (<strong>${subD20}</strong>).</div>`; finalOutputString = finalOutputString.replace("**[SUB_BOON_FORTUNATE_FIND]**", `<span style="color:var(--accent); font-weight:bold;">${rarityTier} Tier</span>`); }
            if (finalOutputString.includes("**[SUB_BANE_FOREBODING]**")) { const targets = ["Aberration", "Beast", "Construct", "Elemental", "Fiend", "Humanoid", "Monstrosity", "Undead"]; const subD8 = Math.floor(Math.random() * 8); subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Premonition Target Check: Rolled Sub-d8 (<strong>${subD8 + 1}</strong>).</div>`; finalOutputString = finalOutputString.replace("**[SUB_BANE_FOREBODING]**", `<strong style="color:var(--accent);">${targets[subD8]}</strong>`); }
            if (finalOutputString.includes("**[SUB_BANE_THIEVING_LOSS]**")) { const subD10 = Math.floor(Math.random() * 10) + 1; const totalLoss = subD10 * 10; subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Thieving Multiplier Check: Rolled Sub-d10 (<strong>${subD10}</strong>) x 10 gp.</div>`; finalOutputString = finalOutputString.replace("**[SUB_BANE_THIEVING_LOSS]**", `<strong style="color:var(--accent);">${totalLoss}</strong>`); }
            if (finalOutputString.includes("**[SUB_BANE_LIGHTS]**")) { const penalties = ["Lose 1 Clue Point", "Lose an Inspiration", "Suffer 2d6 psychic damage"]; const subD3 = Math.floor(Math.random() * 3); finalOutputString = finalOutputString.replace("**[SUB_BANE_LIGHTS]**", `<span style="color:var(--accent); font-weight:500;">${penalties[subD3]}</span>`); }
            if (finalOutputString.includes("**[SUB_BANE_INSOMNIA_DAMAGE]**")) { const subD4 = Math.floor(Math.random() * 4) + 1; subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Insomnia Exhaustion Check: Rolled Sub-d4 (<strong>${subD4}</strong>).</div>`; finalOutputString = finalOutputString.replace("**[SUB_BANE_INSOMNIA_DAMAGE]**", `<span style="color:var(--accent); font-weight:bold;">tier x ${subD4}</span>`); }
            if (finalOutputString.includes("**[SUB_BANE_DICE_MOD]**")) { const subD4 = Math.floor(Math.random() * 4) + 1; finalOutputString = finalOutputString.replace("**[SUB_BANE_DICE_MOD]**", `<span style="color:var(--accent); font-weight:bold;">tier x d4 (${subD4} base)</span>`); }
            if (finalOutputString.includes("**[SUB_BANE_VULNERABILITY]**")) { const profiles = ["Bludgeoning", "Bludgeoning", "Piercing", "Piercing", "Slashing", "Slashing"]; const subD6 = Math.floor(Math.random() * 6); subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Vulnerability Profile Check: Rolled Sub-d6 (<strong>${subD6 + 1}</strong>).</div>`; finalOutputString = finalOutputString.replace("**[SUB_BANE_VULNERABILITY]**", `<strong style="color:#e74c3c;">${profiles[subD6]}</strong>`); }
            if (finalOutputString.includes("**[SUB_BANE_ELEMENTAL]**")) { const elements = ["Fire", "Cold", "Lightning", "Force"]; const subD4 = Math.floor(Math.random() * 4); finalOutputString = finalOutputString.replace("**[SUB_BANE_ELEMENTAL]**", `<strong style="color:#e74c3c;">${elements[subD4]}</strong>`); }
            if (finalOutputString.includes("**[SUB_BANE_WRATH]**")) { const wraths = ["Healing spells are only half as effective until the end of the quest.", "Healing spells are only half as effective until the end of the quest.", "The next character to make a death save does so at disadvantage.", "The next character to make a death save does so at disadvantage.", "The next time you reduce a monster to 0 hp, you reduce it to 1 hp instead.", "The next time you reduce a monster to 0 hp, you reduce it to 1 hp instead."]; const subD6 = Math.floor(Math.random() * 6); subRollLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Kelemvor Decree Check: Rolled Sub-d6 (<strong>${subD6 + 1}</strong>).</div>`; finalOutputString = finalOutputString.replace("**[SUB_BANE_WRATH]**", `<br><span style="color:var(--text-main); font-style:italic;">Enforcement: ${wraths[subD6]}</span>`); }
            const prefixIcon = strand === "boons" ? "🎁" : "💀"; rollOutput.innerHTML = `<div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.25rem;">Strand Target: <strong>${strand === "boons" ? "Divine Boon" : "Cosmic Bane"}</strong> | Primary Roll: d100 (<strong>${rollD100}</strong>)</div>${subRollLog}<div style="color:var(--accent); font-weight:bold; font-size:1.2rem; line-height:1.45;">${prefixIcon} ${finalOutputString}</div>`;
        }
        // --- BRAND NEW TWO-STAGE CALCULATOR NODE: Item Table (d4 Bracket + d100 Unit) ---
        else if (activeTable.type === "items-table") {
            const d4Roll = Math.floor(Math.random() * 4) + 1;
            const d100Roll = Math.floor(Math.random() * 100) + 1;
            
            // Map the d4 onto the hundreds bracket base (image_1aff22.jpg)
            let baseHundreds = 0;
            if (d4Roll === 1) baseHundreds = 100;
            else if (d4Roll === 2) baseHundreds = 200;
            else if (d4Roll === 3) baseHundreds = 300;
            else if (d4Roll === 4) baseHundreds = 0;

            // d100 logic: treats a roll of 100 as 0 to accommodate the 00-99 offset rule
            const tensAndOnesUnit = d100Roll === 100 ? 0 : d100Roll;
            let resolvedIndex = baseHundreds + tensAndOnesUnit;
            
            // Fallback safety cap to verify array index allocation boundary remains inside 1-399
            if (resolvedIndex < 1) resolvedIndex = 100;

            let itemDescriptionText = activeTable.entries[resolvedIndex] || "Scattered rubble & generic dungeon debris.";
            let inlineCalculatedLog = "";

            // QoL Multiplier Parser: Evaluates bracketed dice pools ([1d4], [1d10], etc.)
            itemDescriptionText = itemDescriptionText.replace(/\[(1d\d+)\]/g, (match, diceExpr) => {
                const sides = parseInt(diceExpr.split('d')[1], 10);
                const result = Math.floor(Math.random() * sides) + 1;
                inlineCalculatedLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Inline Count ${diceExpr}: Rolled a value of <strong>${result}</strong>.</div>`;
                return `<span style="color:var(--accent); font-weight:bold;">${result}</span>`;
            });

            // Automated Spellbook Evaluator: Programmatically creates spell matrix lists (image_1afc56.jpg)
            if (itemDescriptionText.includes("**[SUB_ITEM_SPELLBOOK]**")) {
                const quantityD8 = Math.floor(Math.random() * 8) + 1;
                const levelD4 = Math.floor(Math.random() * 4) + 1;
                inlineCalculatedLog += `<div style="font-size:0.85rem; color:var(--text-muted);">Calculated Spellbook Properties: Rolled quantity 1d8 (<strong>${quantityD8}</strong>) x spell level 1d4 (<strong>Level ${levelD4}</strong>).</div>`;
                itemDescriptionText = itemDescriptionText.replace("**[SUB_ITEM_SPELLBOOK]**", `<span style="color:var(--accent); font-weight:bold;">${quantityD8} distinct Level ${levelD4} Spells</span>`);
            }

            rollOutput.innerHTML = `
                <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.25rem;">
                    Stage 1 (d4 Bracket: <strong>${d4Roll}</strong>) → Hundreds Offset: ${baseHundreds}<br>
                    Stage 2 (d100 Selector: <strong>${d100Roll}</strong>) → Unit Alignment Modifier: ${tensAndOnesUnit}
                </div>
                <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0.5rem; padding-bottom:0.25rem; border-bottom:1px dashed var(--border);">
                    Resolved Table Index Blueprint: <strong>#${resolvedIndex}</strong>
                </div>
                ${inlineCalculatedLog}
                <div style="color:var(--accent); font-weight:bold; font-size:1.35rem; line-height:1.4;">
                    📦 Item: ${itemDescriptionText}
                </div>
            `;
        }
        
        rollOutput.style.opacity = 1;
    }, 100);
});

backBtn.addEventListener('click', () => { activeTable = null; tableView.classList.add('hidden'); homeView.classList.remove('hidden'); });
searchInput.addEventListener('input', (e) => { renderDashboard(e.target.value); });
renderDashboard();