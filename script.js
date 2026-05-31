/* ==================================================================
   ABBREVIATIONS DICT
   Add an entry here and any occurrence in any MD file gets a tooltip.
   ================================================================== */
const ABBR = {
    RBWR: "Realistic Boiling Water Reactor",
    BWR: "Boiling Water Reactor",
    PWR: "Pressurized Water Reactor",
    RBMK: "Reaktor Bolshoy Moshchnosti Kanalnyy (Soviet graphite-moderated reactor)",
    RPV: "Reactor Pressure Vessel",
    APRM: "Average Power Range Monitor",
    LPRM: "Local Power Range Monitor",
    SRM: "Source Range Monitor",
    IPR: "Intermediate Power Range",
    CRD: "Control Rod Drive",
    CRDP: "Control Rod Drive Pump",
    RWM: "Rod Worth Minimizer",
    RCIC: "Reactor Core Isolation Cooling",
    LPCI: "Low Pressure Coolant Injection",
    RHR: "Residual Heat Removal",
    MCR: "Main Control Room",
    TCR: "Turbine Control Room",
    FWP: "Feedwater Pump",
    SJAE: "Steam Jet Air Ejector",
    CAR: "Condenser Air Removal",
    MCC: "Main Cooling Control",
    CST: "Condensate Storage Tank",
    EDG: "Emergency Diesel Generator",
    CIX: "Condensate Ion eXchange",
    ECCS: "Emergency Core Cooling System",
    POAH: "Point Of Adding Heat",
    APR: "Average Power Reactor",
    HPFH: "High Pressure Feedwater Heater",
    SCRAM: "Safety Control Rod Axe Man (rapid shutdown)",
    "S/IAS": "Service / Instrument Air System",
};

/* ==================================================================
   NERD MODE TOGGLE (persisted)
   ================================================================== */
function applyNerd(on) {
    document.body.classList.toggle("nerd", on);
    const nerdToggle = document.getElementById("nerd-toggle");
    if (nerdToggle) nerdToggle.classList.toggle("active", on);
    localStorage.setItem("rbwr-nerd", on ? "1" : "0");
}
function toggleNerd() {
    applyNerd(!document.body.classList.contains("nerd"));
}
applyNerd(localStorage.getItem("rbwr-nerd") === "1");

/* ==================================================================
   MARKDOWN RENDERER WITH CUSTOM BLOCKS
   ================================================================== */

/* Custom marked renderer:
   - Code blocks with language `checklist` → interactive checklist HTML
   - Code blocks with language `limits`    → limits-grid HTML
   - Code blocks with language `note|warn|crit` → callout HTML
*/
const renderer = new marked.Renderer();
const origCode = renderer.code.bind(renderer);

renderer.code = function (code, lang) {
    if (lang === "limits") {
        try {
            return renderLimits(JSON.parse(code));
        } catch (e) {
            return `<pre><code>limits parse error: ${e.message}\n\n${code}</code></pre>`;
        }
    }
    if (lang === "svgview") {
        // body: an .svg filename plus four numbers "x y w h" defining the viewBox window
        const parts = (code || "").trim().split(/\s+/);
        const src = (parts.find((p) => /\.svg$/i.test(p)) || "").replace(/[^-\w./]/g, "");
        const nums = parts.filter((p) => /^-?\d+(\.\d+)?$/.test(p)).slice(0, 4);
        const vb = nums.length === 4 ? nums.join(" ") : "";
        return `<div class="svgview" data-src="${src}" data-vb="${vb}"></div>`;
    }
    if (lang === "note" || lang === "warn" || lang === "crit") {
        const labels = { note: "note", warn: "warning", crit: "critical" };
        return `<div class="callout ${lang}"><span class="callout-label">${labels[lang]}</span>${marked.parseInline(code)}</div>`;
    }
    if (lang === "plant-diagram") {
        const W = 680,
            H = 450,
            uid = "pd" + Math.random().toString(36).slice(2, 6);
        const MK = `marker-end="url(#${uid})"`;
        /* Aligned pairs:
       Reactor (x=20,w=150) ↕ FW Pumps (x=20,w=150)  → same center x=95
       Turbine (x=240,w=150) ↕ Condenser (x=240,w=150) → same center x=315
       Electrical (x=510,w=150) → detached, right side
    */
        const nodes = [
            { label: "Reactor", sub: "control rods & recirc", page: "reactor-control", x: 20, y: 50, w: 150, h: 70 },
            { label: "Turbine", sub: "steam → shaft", page: "startup", x: 240, y: 50, w: 150, h: 70 },
            { label: "Electrical", sub: "buses & EDGs", page: "electrical", x: 510, y: 50, w: 150, h: 70 },
            { label: "Condenser", sub: "vacuum & cooling", page: "condenser", x: 240, y: 205, w: 150, h: 70 },
            { label: "Hotwell", sub: "collects condensate", page: "mcc", x: 530, y: 360, w: 130, h: 70 },
            { label: "Cond. Pumps", sub: "hotwell → deaerator", page: "mcc", x: 360, y: 360, w: 135, h: 70 },
            { label: "Deaerator", sub: "O₂ removal", page: "condenser", x: 200, y: 360, w: 130, h: 70 },
            { label: "FW Pumps", sub: "deaerator → reactor", page: "mcc", x: 20, y: 360, w: 150, h: 70 },
        ];
        const arrows = [
            { d: `M170,85 L240,85`, label: "steam", lx: 205, ly: 77 },
            { d: `M390,85 L510,85`, label: "shaft", lx: 450, ly: 77 },
            { d: `M315,120 L315,205`, label: "", lx: 0, ly: 0 },
            { d: `M315,275 L315,315 L595,315 L595,360`, label: "", lx: 0, ly: 0 },
            { d: `M530,395 L495,395`, label: "", lx: 0, ly: 0 },
            { d: `M360,395 L330,395`, label: "", lx: 0, ly: 0 },
            { d: `M200,395 L170,395`, label: "", lx: 0, ly: 0 },
            { d: `M95,360 L95,120`, label: "", lx: 0, ly: 0 },
        ];
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="display:block;width:100%;max-width:${W}px;margin:0 auto">
<defs><marker id="${uid}" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,7 3,0 6" fill="var(--tx)"/></marker></defs>`;
        arrows.forEach((a) => {
            svg += `<path d="${a.d}" fill="none" stroke="var(--tx)" stroke-width="2" ${MK}/>`;
            if (a.label)
                svg += `<text x="${a.lx}" y="${a.ly}" font-size="10" fill="var(--tx)" font-family="monospace" text-anchor="middle" opacity="0.5">${escapeHtml(a.label)}</text>`;
        });
        nodes.forEach((n) => {
            const cx = n.x + n.w / 2,
                cy = n.y + n.h / 2;
            svg += `<g onclick="loadPage('${n.page}')" style="cursor:pointer">
<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6"
  fill="var(--bg-panel)" stroke="var(--tx)" stroke-width="2"
  onmouseenter="this.setAttribute('fill','var(--bg-soft)')"
  onmouseleave="this.setAttribute('fill','var(--bg-panel)')"/>
<text x="${cx}" y="${cy - 9}" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="13" fill="var(--tx)" font-weight="700" pointer-events="none">${escapeHtml(n.label)}</text>
<text x="${cx}" y="${cy + 10}" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="10" fill="var(--tx)" opacity="0.6" pointer-events="none">${escapeHtml(n.sub)}</text>
</g>`;
        });
        svg += "</svg>";
        return `<div style="background:var(--bg-soft);border:1px solid var(--br);border-radius:12px;padding:24px;margin:16px 0">${svg}</div>`;
    }
    if (lang === "flow") {
        // Syntax: "A ->|label| B -> C". The optional |label| rides the arrow.
        const re = /\s*(?:→|->)\s*(?:\|([^|]*)\|)?\s*/g;
        const nodes = [];
        const labels = [];
        let last = 0,
            m;
        while ((m = re.exec(code)) !== null) {
            nodes.push(code.slice(last, m.index).trim());
            labels.push((m[1] || "").trim());
            last = re.lastIndex;
        }
        nodes.push(code.slice(last).trim());
        if (!nodes[0]) return "";
        const PAD = 8,
            NH = 46,
            GAP_Y = 46,
            MAXW = 740;
        const longest = Math.max(...nodes.map((n) => n.length));
        const NW = Math.max(140, Math.round(longest * 7.2 + 30));
        const labMax = labels.reduce((a, l) => Math.max(a, l.length), 0);
        const GAP_X = Math.max(44, labMax * 6 + 24);
        const cols = Math.max(1, Math.min(nodes.length, Math.floor((MAXW + GAP_X) / (NW + GAP_X))));
        const rows = Math.ceil(nodes.length / cols);
        const W = cols * NW + (cols - 1) * GAP_X + PAD * 2;
        const H = rows * NH + (rows - 1) * GAP_Y + PAD * 2;
        const uid = "fc" + Math.random().toString(36).slice(2, 6);
        // serpentine position: rows alternate direction so connectors stay adjacent
        const pos = (i) => {
            const r = Math.floor(i / cols);
            const p = i % cols;
            const col = r % 2 === 0 ? p : cols - 1 - p;
            return { r, col, x: PAD + col * (NW + GAP_X), y: PAD + r * (NH + GAP_Y) };
        };
        let svg = `<svg class="flow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;margin:0 auto"><defs><marker id="${uid}" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto"><polygon points="0 0,7 3,0 6" fill="var(--tx)"/></marker></defs>`;
        for (let i = 0; i < nodes.length - 1; i++) {
            const a = pos(i),
                b = pos(i + 1);
            const acy = a.y + NH / 2;
            let d,
                lx,
                ly,
                anchor = "middle";
            if (a.r === b.r) {
                if (b.x > a.x) {
                    d = `M${a.x + NW} ${acy} H${b.x}`;
                    lx = (a.x + NW + b.x) / 2;
                } else {
                    d = `M${a.x} ${acy} H${b.x + NW}`;
                    lx = (a.x + b.x + NW) / 2;
                }
                ly = acy - 8;
            } else {
                const cx = a.x + NW / 2;
                d = `M${cx} ${a.y + NH} V${b.y}`;
                ly = (a.y + NH + b.y) / 2 + 3;
                lx = a.col === 0 ? cx + 9 : cx - 9;
                anchor = a.col === 0 ? "start" : "end";
            }
            svg += `<path d="${d}" fill="none" stroke="var(--tx)" stroke-width="2" marker-end="url(#${uid})"/>`;
            if (labels[i]) svg += `<text class="flow-elabel" x="${lx}" y="${ly}" text-anchor="${anchor}">${escapeHtml(labels[i])}</text>`;
        }
        nodes.forEach((n, i) => {
            const { x, y } = pos(i);
            svg += `<g class="flow-box"><rect x="${x}" y="${y}" width="${NW}" height="${NH}" rx="6"/><text x="${x + NW / 2}" y="${y + NH / 2}" dominant-baseline="central" text-anchor="middle">${escapeHtml(n)}</text></g>`;
        });
        svg += "</svg>";
        return `<div class="flow">${svg}</div>`;
    }
    const opts = { renderer };
    if (lang === "nerd") {
        return `<div class="nerd-block">${marked.parse(code, opts)}</div>`;
    }
    if (lang === "u2") return `<div class="u2-only">${marked.parse(code, opts)}</div>`;
    if (lang === "u1") return `<div class="u1-only">${marked.parse(code, opts)}</div>`;
    if (lang === "realistic") return `<div class="realistic-only">${marked.parse(code, opts)}</div>`;
    if (lang === "simple") return `<div class="simple-only">${marked.parse(code, opts)}</div>`;
    if (lang === "rbmk") return `<div class="rbmk-only">${marked.parse(code, opts)}</div>`;
    if (lang === "stable") return `<div class="stable-only">${marked.parse(code, opts)}</div>`;
    if (lang === "selfcirc") return `<div class="selfcirc-only">${marked.parse(code, opts)}</div>`;
    if (lang === "classic") return `<div class="classic-only">${marked.parse(code, opts)}</div>`;
    return origCode(code, lang);
};

/* ------------------------------------------------------------------
   Cross-page link resolution

   Build a title → slug map by reading the sidebar nav. That way the
   map is always in sync with what's actually navigable.

   Three cases the link renderer handles:
     1. href is a known page slug (e.g. `[Foo](u1-startup)`) - explicit
        override, useful when link text is ambiguous.
     2. href is `#` or empty - look up the link text in the map.
     3. Anything else (http, mailto, real anchors) - pass through.

   First occurrence wins for duplicate titles (so the U1 entries beat
   the U2 entries for plain "Startup" etc.; use the explicit form for
   the others).
   ------------------------------------------------------------------ */
const PAGE_SLUGS = new Set();
const PAGE_TITLE_TO_SLUG = {};
function normalizeTitle(s) {
    return s.toLowerCase().replace(/\s+/g, " ").trim();
}
function buildPageMap() {
    document.querySelectorAll(".nav-item").forEach((btn) => {
        const page = btn.dataset.page;
        if (page) {
            PAGE_SLUGS.add(page);
            const key = normalizeTitle(btn.textContent);
            if (!(key in PAGE_TITLE_TO_SLUG)) PAGE_TITLE_TO_SLUG[key] = page;
        }
    });
}
buildPageMap();

/* Decode HTML entities (marked passes link text with entities already
   escaped, so we need this for the lookup key). */
const _decoder = document.createElement("textarea");
function decodeEntities(s) {
    _decoder.innerHTML = s;
    return _decoder.value;
}

renderer.link = function (href, title, text) {
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";

    // Real external / protocol links - open in a new tab, pass through.
    if (/^(https?:|mailto:|tel:)/i.test(href)) {
        return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`;
    }

    // Try to resolve to a known page slug, with optional #anchor.
    let slug = null;
    let anchor = "";

    if (href) {
        // Strip leading # for pure-anchor links, handle page#anchor format
        const noHash = href.replace(/^#/, "");
        const hashIdx = noHash.indexOf("#");
        const pagePart = hashIdx >= 0 ? noHash.slice(0, hashIdx) : noHash;
        anchor = hashIdx >= 0 ? noHash.slice(hashIdx + 1) : "";
        const candidate = pagePart.replace(/\.md$/, "");
        if (candidate && PAGE_SLUGS.has(candidate)) slug = candidate;
    }

    // Empty href - look up by link text
    if (!slug && (!href || href === "#" || href === "")) {
        const plain = decodeEntities(text.replace(/<[^>]+>/g, ""));
        slug = PAGE_TITLE_TO_SLUG[normalizeTitle(plain)] || null;
    }

    if (slug) {
        const anchorAttr = anchor ? ` data-anchor="${escapeHtml(anchor)}"` : "";
        return `<a href="#${escapeHtml(slug)}" class="pagelink" data-page="${escapeHtml(slug)}"${anchorAttr}${titleAttr}>${text}</a>`;
    }

    // Couldn't resolve - leave a normal anchor
    return `<a href="${escapeHtml(href || "#")}"${titleAttr}>${text}</a>`;
};

/* Markdown convention for procedure steps:
   A plain ordered list with an optional blockquote immediately after each
   item. The blockquote becomes the "why" (gated behind nerd mode). The
   presence of at least one blockquote makes the whole list interactive.
*/

function renderLimits(spec) {
    // spec is array: [{ name, val, unit, tier }] where tier is "ok"|"warn"|"danger" or omitted
    let html = '<div class="limits-grid">';
    spec.forEach((l) => {
        const tier = l.tier ? ` ${l.tier}` : "";
        html += `<div class="limit-card${tier}">
      <div class="limit-name">${escapeHtml(l.name)}</div>
      <div class="limit-val">${escapeHtml(String(l.val))}<span class="limit-unit">${escapeHtml(l.unit || "")}</span></div>
    </div>`;
    });
    html += "</div>";
    return html;
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

/* Auto-wrap abbreviations after render. Walks text nodes only.
   Excludes nodes inside <code>, <pre>, <abbr> and a few others. */
function wireAbbreviations(root) {
    const skip = new Set(["CODE", "PRE", "ABBR", "SCRIPT", "STYLE", "BUTTON"]);
    // Build a regex that matches any abbreviation as a whole word.
    const keys = Object.keys(ABBR).sort((a, b) => b.length - a.length);
    const escaped = keys.map((k) => k.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&"));
    const re = new RegExp("\\b(" + escaped.join("|") + ")\\b", "g");

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            let p = node.parentElement;
            while (p && p !== root) {
                if (skip.has(p.tagName)) return NodeFilter.FILTER_REJECT;
                p = p.parentElement;
            }
            re.lastIndex = 0;
            return re.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });

    const targets = [];
    let n;
    while ((n = walker.nextNode())) targets.push(n);

    targets.forEach((textNode) => {
        const text = textNode.nodeValue;
        re.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let last = 0,
            m;
        while ((m = re.exec(text)) !== null) {
            if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
            const abbr = document.createElement("abbr");
            abbr.setAttribute("data-tip", ABBR[m[1]]);
            abbr.textContent = m[1];
            frag.appendChild(abbr);
            last = m.index + m[1].length;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        textNode.parentNode.replaceChild(frag, textNode);
    });
}

/* Post-process: any ordered list followed by blockquotes inside its <li>
   gets the steps class, and the blockquote becomes a step-why div.
   We mark a list as "steps" only if it has the class `steps` already
   OR if at least one direct <li> contains a <blockquote> as a child. */
function wireSteps(root) {
    const lists = root.querySelectorAll("ol");
    lists.forEach((ol) => {
        let hasWhy = false;
        ol.querySelectorAll(":scope > li > blockquote").forEach((bq) => {
            hasWhy = true;
            const div = document.createElement("div");
            div.className = "step-why";
            div.innerHTML = bq.innerHTML;
            bq.replaceWith(div);
        });
        // Mark crit items: any <li> whose first paragraph starts with [!]
        ol.querySelectorAll(":scope > li").forEach((li) => {
            const firstText =
                li.firstChild && li.firstChild.nodeType === 3 ? li.firstChild.nodeValue : li.querySelector(":scope > p")?.textContent || "";
            if (/^\s*\[!\]/.test(firstText)) {
                li.classList.add("crit");
                const p = li.querySelector(":scope > p");
                if (p) p.innerHTML = p.innerHTML.replace(/^\s*\[!\]\s*/, "");
                else if (li.firstChild && li.firstChild.nodeType === 3) li.firstChild.nodeValue = li.firstChild.nodeValue.replace(/^\s*\[!\]\s*/, "");
            }
        });
        if (hasWhy) ol.classList.add("steps");
    });
}

/* ==================================================================
   STEPS: interactive checking + progress + persistence
   ================================================================== */
let _stepsPageName = "";

function wireStepsInteractive(root, pageName) {
    _stepsPageName = pageName;
    const allSteps = [...root.querySelectorAll(".md ol.steps > li")];
    if (allSteps.length === 0) return;

    // Assign a stable index to each step in document order
    allSteps.forEach((li, idx) => {
        li.setAttribute("data-step", idx);
        li.addEventListener("click", (e) => {
            // Let links inside steps still work
            if (e.target.closest("a")) return;
            li.classList.toggle("done");
            saveStepsState();
            updateStepsProgress();
        });
    });

    // Restore saved done state for this page
    try {
        const saved = JSON.parse(localStorage.getItem("rbwr-steps-" + pageName) || "[]");
        saved.forEach((idx) => {
            if (allSteps[idx]) allSteps[idx].classList.add("done");
        });
    } catch (e) {
        /* ignore */
    }

    // Append a single progress bar at the very end of the page
    const progress = document.createElement("div");
    progress.className = "steps-progress";
    progress.innerHTML = `
    <div class="steps-progress-bar"><div class="steps-progress-fill" id="steps-fill" style="width:0%"></div></div>
    <div class="steps-progress-label" id="steps-label">0 / ${allSteps.length}</div>
    <button class="steps-progress-reset" onclick="resetSteps()">reset</button>
  `;
    root.appendChild(progress);

    updateStepsProgress();
}

function updateStepsProgress() {
    const steps = document.querySelectorAll(".md ol.steps > li");
    const done = document.querySelectorAll(".md ol.steps > li.done").length;
    const fill = document.getElementById("steps-fill");
    const label = document.getElementById("steps-label");
    if (fill) fill.style.width = (steps.length ? (100 * done) / steps.length : 0) + "%";
    if (label) label.textContent = done + " / " + steps.length;
}

function saveStepsState() {
    if (!_stepsPageName) return;
    const done = [...document.querySelectorAll(".md ol.steps > li.done")]
        .map((el) => parseInt(el.getAttribute("data-step")))
        .filter((n) => !isNaN(n));
    localStorage.setItem("rbwr-steps-" + _stepsPageName, JSON.stringify(done));
}

function resetSteps() {
    document.querySelectorAll(".md ol.steps > li.done").forEach((li) => li.classList.remove("done"));
    saveStepsState();
    updateStepsProgress();
}

/* ==================================================================
   FILTER TOGGLES (unit / mode / reactor)
   ================================================================== */
const FILTERS = { unit: "u1", mode: "simple", reactor: "classic" };

function setFilter(type, val) {
    FILTERS[type] = val;
    applyFilters();
    saveFilters();
    // Update active states for this group's buttons
    document.querySelectorAll(`[id^="fb-${type}-"]`).forEach((btn) => {
        btn.classList.toggle("active", btn.id === `fb-${type}-${val}`);
    });
}

function applyFilters() {
    const b = document.body;
    ["unit-u1", "unit-u2", "mode-simple", "mode-realistic", "reactor-classic", "reactor-stable", "reactor-selfcirc", "reactor-rbmk"].forEach((c) =>
        b.classList.remove(c),
    );
    b.classList.add("unit-" + FILTERS.unit);
    b.classList.add("mode-" + FILTERS.mode);
    b.classList.add("reactor-" + FILTERS.reactor);
}

function saveFilters() {
    localStorage.setItem("rbwr-filters", JSON.stringify(FILTERS));
}

function loadFilters() {
    const VALID = {
        unit: ["u1", "u2"],
        mode: ["simple", "realistic"],
        reactor: ["classic", "stable", "selfcirc", "rbmk"],
    };
    try {
        const saved = JSON.parse(localStorage.getItem("rbwr-filters") || "{}");
        Object.keys(VALID).forEach((k) => {
            if (VALID[k].includes(saved[k])) FILTERS[k] = saved[k];
        });
    } catch (e) {}
    applyFilters();
    Object.entries(FILTERS).forEach(([type, val]) => {
        document.querySelectorAll(`[id^="fb-${type}-"]`).forEach((btn) => {
            btn.classList.toggle("active", btn.id === `fb-${type}-${val}`);
        });
    });
}

/* ==================================================================
   SEARCH FUNCTIONALITY
   ================================================================== */
let searchIndex = {};
let searchCache = {};

async function loadPageContent(page) {
    if (searchCache[page]) return searchCache[page];
    try {
        const res = await fetch(`${page}.md`);
        if (!res.ok) return { display: "", lower: "" };
        const text = await res.text();
        const display = text
            .replace(/```[\s\S]*?```/g, " ") // drop fenced code/diagram/limit blocks
            .replace(/[#*`\[\]()!>|→]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        const out = { display, lower: display.toLowerCase() };
        searchCache[page] = out;
        return out;
    } catch (e) {
        return { display: "", lower: "" };
    }
}

async function buildSearchIndex() {
    const pages = [...document.querySelectorAll(".nav-item")].map((btn) => btn.dataset.page).filter(Boolean);
    for (let page of pages) {
        const { display, lower } = await loadPageContent(page);
        const title = document.querySelector(`.nav-item[data-page="${page}"]`)?.textContent.trim() || page;
        searchIndex[page] = { title: title.toLowerCase(), display, content: lower };
    }
}

function search(query) {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const results = [];
    for (let [page, idx] of Object.entries(searchIndex)) {
        let score = 0,
            snippet = "";
        if (idx.title.includes(q)) score += 10;
        const pos = idx.content.indexOf(q);
        if (pos !== -1) {
            score += 5;
            // widen to word boundaries around the match, using the original-case text
            let s = Math.max(0, pos - 50);
            while (s > 0 && idx.display[s - 1] !== " ") s--;
            let end = Math.min(idx.display.length, pos + q.length + 90);
            while (end < idx.display.length && idx.display[end] !== " ") end++;
            const rel = pos - s;
            const seg = idx.display.slice(s, end);
            // escape each part, then wrap only the match in <strong>
            let raw =
                escapeHtml(seg.slice(0, rel)) +
                "<strong>" +
                escapeHtml(seg.slice(rel, rel + q.length)) +
                "</strong>" +
                escapeHtml(seg.slice(rel + q.length));
            if (s > 0) raw = "… " + raw;
            if (end < idx.display.length) raw = raw + " …";
            snippet = raw;
        }
        if (score > 0) {
            const titleFull = document.querySelector(`.nav-item[data-page="${page}"]`)?.textContent.trim() || page;
            results.push({ page, title: titleFull, snippet: snippet || `Match in ${titleFull}`, score });
        }
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 12);
}

const searchInput = document.getElementById("searchInput");
const searchResultsDiv = document.getElementById("searchResults");
let searchDebounce;

searchInput.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(async () => {
        const query = searchInput.value.trim();
        if (!query) {
            searchResultsDiv.classList.remove("show");
            return;
        }
        if (Object.keys(searchIndex).length === 0) await buildSearchIndex();
        const results = search(query);
        if (results.length === 0) {
            searchResultsDiv.innerHTML = '<div class="search-result-item">No results</div>';
        } else {
            searchResultsDiv.innerHTML = results
                .map(
                    (r) => `
                <div class="search-result-item" data-page="${r.page}" data-q="${escapeHtml(query)}">
                    <div class="search-result-title">${escapeHtml(r.title)}</div>
                    <div class="search-result-snippet">${r.snippet}</div>
                </div>
            `,
                )
                .join("");
        }
        searchResultsDiv.classList.add("show");
    }, 200);
});

searchResultsDiv.addEventListener("click", (e) => {
    const item = e.target.closest(".search-result-item");
    if (item && item.dataset.page) {
        loadPage(item.dataset.page, null, true, item.dataset.q || "");
        searchResultsDiv.classList.remove("show");
        searchInput.value = "";
    }
});
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResultsDiv.contains(e.target)) {
        searchResultsDiv.classList.remove("show");
    }
});

/* ==================================================================
   PAGE LOADER WITH BROWSER HISTORY
   ================================================================== */
function flashEl(el) {
    if (!el) return;
    el.classList.remove("flash-hit");
    void el.offsetWidth;
    el.classList.add("flash-hit");
    setTimeout(() => el.classList.remove("flash-hit"), 1300);
}

/* Find the first visible text match for `text`, scroll to it, and flash it.
   Falls back to the first heading / top (e.g. if the match is in a hidden unit block). */
function jumpToText(root, text) {
    const q = (text || "").trim().toLowerCase();
    if (!q) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
            const p = n.parentElement;
            if (!p || p.tagName === "SCRIPT" || p.tagName === "STYLE") return NodeFilter.FILTER_REJECT;
            if (p.offsetParent === null) return NodeFilter.FILTER_REJECT;
            return n.nodeValue.toLowerCase().includes(q) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });
    const hit = walker.nextNode();
    const target = hit ? hit.parentElement : root.querySelector("h1, h2, h3");
    if (target)
        setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            flashEl(target);
        }, 60);
}

/* Click handler for links inside an inlined SVG (map / svgview). ALWAYS cancels the
   link's own navigation (draw.io writes absolute hrefs that would jump to app.diagrams.net),
   then routes in-app if the target resolves to a known page. */
function svgLinkRoute(e) {
    const a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    const href = a.getAttribute("xlink:href") || a.getAttribute("href") || "";
    const slug = href
        .replace(/[#?].*$/, "")
        .replace(/\/+$/, "")
        .replace(/^.*\//, "")
        .replace(/\.md$/i, "");
    if (!slug) return;
    if (PAGE_SLUGS.has(slug)) {
        loadPage(slug);
        return;
    }
    const key = normalizeTitle(slug.replace(/[-_]+/g, " "));
    if (PAGE_TITLE_TO_SLUG[key]) loadPage(PAGE_TITLE_TO_SLUG[key]);
}

/* Generic inline-SVG loader (cached per file). */
const _svgCache = {};
function loadSvgFile(src) {
    if (!_svgCache[src]) {
        _svgCache[src] = fetch(src)
            .then((r) => r.text())
            .then((t) => {
                const m = t.match(/<svg[\s\S]*<\/svg>/i);
                return m ? m[0] : "";
            })
            .catch(() => "");
    }
    return _svgCache[src];
}
async function wireSvgView(root) {
    const slots = [...root.querySelectorAll(".svgview")];
    for (const slot of slots) {
        const src = slot.getAttribute("data-src");
        if (!src) continue;
        const txt = await loadSvgFile(src);
        if (!txt) {
            slot.innerHTML = `<div class="status">SVG not found: ${src}</div>`;
            continue;
        }
        slot.innerHTML = txt;
        const svg = slot.querySelector("svg");
        if (!svg) continue;
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.style.width = "100%";
        svg.style.height = "auto";
        svg.style.display = "block";
        const vb = slot.getAttribute("data-vb");
        if (vb) svg.setAttribute("viewBox", vb);
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.addEventListener("click", svgLinkRoute);
    }
}

async function loadPage(name, anchor, pushState = true, findText) {
    if (!name) name = "intro";
    if (pushState) {
        const newUrl = `/${name}`;
        if (window.location.pathname !== newUrl) history.pushState({ page: name }, "", newUrl);
    }
    const c = document.getElementById("content");
    c.innerHTML = '<div class="status">Loading…</div>';
    document.querySelectorAll(".nav-item").forEach((b) => b.classList.remove("active"));
    const activeBtn = document.querySelector(`.nav-item[data-page="${name}"]`);
    if (activeBtn) activeBtn.classList.add("active");
    // Close mobile sidebar on navigation
    document.getElementById("sidebar").classList.remove("open");

    try {
        const res = await fetch(`${name}.md`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const md = await res.text();
        const html = marked.parse(md, { renderer });
        c.innerHTML = html;
        wireSteps(c);
        wireAbbreviations(c);
        wireStepsInteractive(c, name);
        wireSvgView(c);
        // Jump to a searched term, else an anchor, else top
        if (findText) {
            jumpToText(c, findText);
        } else if (anchor) {
            const target = [...c.querySelectorAll("h2,h3")].find((h) =>
                h.textContent
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .includes(anchor.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
            );
            if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        } else {
            c.closest(".content").scrollTop = 0;
        }
    } catch (e) {
        c.innerHTML = `<div class="status">Failed to load <code>${name}.md</code><br><br>${e.message}<br><br><em>Run <code>python3 -m http.server</code> in this folder, then open http://localhost:8000/</em></div>`;
    }
}

// Popstate event for browser back/forward
window.addEventListener("popstate", (e) => {
    const page = e.state?.page || window.location.pathname.slice(1) || "intro";
    loadPage(page, null, false);
});

/* Delegated click handler for in-document cross-page links.
   The step click handler already bails out when the click target is
   inside an <a>, so this composes cleanly with checklist items. */
document.getElementById("content").addEventListener("click", (e) => {
    const link = e.target.closest("a.pagelink");
    if (!link) return;
    e.preventDefault();
    const page = link.getAttribute("data-page");
    const anchor = link.getAttribute("data-anchor") || "";
    if (page) loadPage(page, anchor);
});

/* Sidebar toggle - mobile: drawer, desktop: collapse */
function toggleSidebar() {
    if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.toggle("open");
    } else {
        const hidden = document.body.classList.toggle("sidebar-hidden");
        localStorage.setItem("rbwr-sidebar-hidden", hidden ? "1" : "0");
    }
}
(function () {
    if (localStorage.getItem("rbwr-sidebar-hidden") === "1") {
        document.body.classList.add("sidebar-hidden");
    }
})();
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && !e.target.closest(".menu-btn")) {
        sidebar.classList.remove("open");
    }
});

/* Boot */
loadFilters();

// Determine initial page from the current URL path (404.html injects index.html in place,
// so the deep-link URL is preserved here).
const _path = window.location.pathname.replace(/\/+$/, "");
const initialPage = _path === "" || _path === "/" ? "intro" : _path.replace(/^\//, "");
loadPage(initialPage, null, false);

buildSearchIndex();

/* ==================================================================
   GLOBAL PLANT MAP (collapsible drawer, pan / zoom / click-to-navigate)
   ================================================================== */
const PM = { svg: null, vb: null, base: null, drag: null };
function pmApply() {
    if (PM.svg && PM.vb) PM.svg.setAttribute("viewBox", PM.vb.join(" "));
}
function plantMapZoom(factor) {
    if (!PM.vb) return;
    let nw = PM.vb[2] / factor;
    nw = Math.max(160, Math.min(PM.base[2], nw));
    const nh = (nw * PM.base[3]) / PM.base[2];
    PM.vb[0] += (PM.vb[2] - nw) / 2;
    PM.vb[1] += (PM.vb[3] - nh) / 2;
    PM.vb[2] = nw;
    PM.vb[3] = nh;
    pmApply();
}
function plantMapReset() {
    if (PM.base) PM.vb = PM.base.slice();
    pmApply();
}
function wirePlantMapHandle() {
    const wrap = document.getElementById("plantmap");
    const handle = document.getElementById("plantmapHandle");
    const body = document.querySelector(".plantmap-body");
    if (!wrap || !handle || !body) return;
    const closedY = () => body.offsetHeight; // slide down by the map's fixed height to hide it
    const setY = (y) => (wrap.style.transform = "translateY(" + y + "px)");
    let cur;
    requestAnimationFrame(() => {
        const saved = parseInt(localStorage.getItem("rbwr-map-y"), 10);
        cur = isNaN(saved) ? closedY() : Math.max(0, Math.min(closedY(), saved));
        setY(cur);
    });
    let drag = null;
    handle.addEventListener("pointerdown", (e) => {
        drag = { y: e.clientY, start: cur };
        handle.setPointerCapture(e.pointerId);
        e.preventDefault();
    });
    handle.addEventListener("pointermove", (e) => {
        if (!drag) return;
        cur = Math.max(0, Math.min(closedY(), drag.start + (e.clientY - drag.y)));
        setY(cur);
    });
    const end = () => {
        if (!drag) return;
        drag = null;
        const cy = closedY();
        if (cur > cy - 90) {
            // released near the bottom -> snap shut
            wrap.style.transition = "transform 0.18s ease";
            cur = cy;
            setY(cur);
            setTimeout(() => (wrap.style.transition = "none"), 200);
        }
        localStorage.setItem("rbwr-map-y", Math.round(cur));
    };
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
}
function initPlantMap() {
    const vp = document.getElementById("plantmapViewport");
    if (!vp) return;
    loadSvgFile("plant-mimic.svg").then((txt) => {
        if (!txt) return;
        vp.innerHTML = txt;
        const svg = vp.querySelector("svg");
        if (!svg) return;
        PM.svg = svg;
        const vb = (svg.getAttribute("viewBox") || "0 0 1835 958").split(/\s+/).map(Number);
        PM.base = vb.slice();
        PM.vb = vb.slice();
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.display = "block";
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        pmApply();
        svg.addEventListener("mousedown", (e) => {
            PM.drag = { x: e.clientX, y: e.clientY, vb: PM.vb.slice(), moved: false };
        });
        window.addEventListener("mousemove", (e) => {
            if (!PM.drag) return;
            const r = svg.getBoundingClientRect();
            const sx = PM.vb[2] / r.width,
                sy = PM.vb[3] / r.height;
            if (Math.abs(e.clientX - PM.drag.x) + Math.abs(e.clientY - PM.drag.y) > 4) PM.drag.moved = true;
            PM.vb[0] = PM.drag.vb[0] - (e.clientX - PM.drag.x) * sx;
            PM.vb[1] = PM.drag.vb[1] - (e.clientY - PM.drag.y) * sy;
            pmApply();
        });
        window.addEventListener("mouseup", () => {
            if (PM.drag) setTimeout(() => (PM.drag = null), 0);
        });
        svg.addEventListener("wheel", (e) => {
            e.preventDefault();
            const r = svg.getBoundingClientRect();
            const mx = (e.clientX - r.left) / r.width,
                my = (e.clientY - r.top) / r.height;
            let nw = PM.vb[2] * (e.deltaY < 0 ? 0.85 : 1.18);
            nw = Math.max(160, Math.min(PM.base[2], nw));
            const nh = (nw * PM.base[3]) / PM.base[2];
            PM.vb[0] += (PM.vb[2] - nw) * mx;
            PM.vb[1] += (PM.vb[3] - nh) * my;
            PM.vb[2] = nw;
            PM.vb[3] = nh;
            pmApply();
        }, { passive: false });
        svg.addEventListener("click", (e) => {
            if (PM.drag && PM.drag.moved) return;
            svgLinkRoute(e);
        });
    });
}
(function () {
    wirePlantMapHandle();
    initPlantMap();
})();
