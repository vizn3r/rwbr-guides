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
        const nodes = code
            .split(/→|->/)
            .map((s) => s.trim())
            .filter(Boolean);
        if (!nodes.length) return "";
        const PER_ROW = 4,
            NH = 40,
            AW = 30,
            PAD = 20,
            ROW_GAP = 50;
        const NW = Math.max(130, Math.max(...nodes.map((n) => n.length)) * 7 + 24);
        const cols = Math.min(PER_ROW, nodes.length);
        const rows = Math.ceil(nodes.length / cols);
        const W = cols * NW + (cols - 1) * AW + PAD * 2;
        const H = rows * NH + (rows - 1) * ROW_GAP + PAD * 2;
        const uid = "fc" + Math.random().toString(36).slice(2, 6);
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="display:block;width:100%;max-width:${W}px;margin:0 auto">
<defs><marker id="${uid}" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0,6 3,0 6" fill="var(--tx)"/></marker></defs>`;
        const MK = `marker-end="url(#${uid})"`;
        for (let i = 0; i < nodes.length; i++) {
            const r = Math.floor(i / PER_ROW),
                c = i % PER_ROW;
            const x = PAD + c * (NW + AW),
                y = PAD + r * (NH + ROW_GAP);
            svg += `<rect x="${x}" y="${y}" width="${NW}" height="${NH}" rx="4" fill="var(--bg-panel)" stroke="var(--tx)" stroke-width="2"/>`;
            svg += `<text x="${x + NW / 2}" y="${y + NH / 2}" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="11" fill="var(--tx)" font-weight="600">${escapeHtml(nodes[i])}</text>`;
            if (i < nodes.length - 1) {
                const nr = Math.floor((i + 1) / PER_ROW),
                    nc = (i + 1) % PER_ROW;
                const nx = PAD + nc * (NW + AW),
                    ny = PAD + nr * (NH + ROW_GAP);
                const cy = y + NH / 2,
                    ncy = ny + NH / 2;
                if (nr === r) {
                    svg += `<line x1="${x + NW}" y1="${cy}" x2="${nx - 2}" y2="${cy}" stroke="var(--tx)" stroke-width="2" ${MK}/>`;
                } else {
                    const midY = y + NH + ROW_GAP * 0.65;
                    svg += `<path d="M${x + NW / 2},${y + NH} L${x + NW / 2},${midY} L4,${midY} L4,${ncy} L${nx - 2},${ncy}" fill="none" stroke="var(--tx)" stroke-width="2" ${MK}/>`;
                }
            }
        }
        svg += "</svg>";
        return `<div style="background:var(--bg-soft);border:1px solid var(--br);border-radius:10px;padding:20px;margin:16px 0">${svg}</div>`;
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
        if (!res.ok) return "";
        const text = await res.text();
        const plain = text
            .replace(/[#*`\[\]()!>]/g, " ")
            .replace(/\s+/g, " ")
            .toLowerCase();
        searchCache[page] = plain;
        return plain;
    } catch (e) {
        return "";
    }
}

async function buildSearchIndex() {
    const pages = [...document.querySelectorAll(".nav-item")].map((btn) => btn.dataset.page).filter(Boolean);
    for (let page of pages) {
        const content = await loadPageContent(page);
        const title = document.querySelector(`.nav-item[data-page="${page}"]`)?.textContent.trim() || page;
        searchIndex[page] = { title: title.toLowerCase(), content };
    }
}

function search(query) {
    if (!query.trim()) return [];
    query = query.toLowerCase();
    const results = [];
    for (let [page, idx] of Object.entries(searchIndex)) {
        let score = 0,
            snippet = "";
        if (idx.title.includes(query)) score += 10;
        if (idx.content.includes(query)) {
            score += 5;
            const pos = idx.content.indexOf(query);
            const start = Math.max(0, pos - 60);
            const end = Math.min(idx.content.length, pos + 120);
            let raw = idx.content.substring(start, end);
            if (start > 0) raw = "..." + raw;
            if (end < idx.content.length) raw = raw + "...";
            snippet = raw.replace(new RegExp(`(${query})`, "gi"), "<strong>$1</strong>");
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
                <div class="search-result-item" data-page="${r.page}">
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
        loadPage(item.dataset.page);
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
async function loadPage(name, anchor, pushState = true) {
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
        // Scroll to anchor if provided
        if (anchor) {
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

// Determine initial page from the current URL path
const path = window.location.pathname.replace(/\/+$/, "");
const initialPage = path === "" || path === "/" ? "intro" : path.replace(/^\//, "");
loadPage(initialPage, null, false);

buildSearchIndex();
