# Markdown styling reference

Everything the page renderer (`script.js`) supports beyond plain markdown. Each entry shows the
literal syntax (in a code box) and what it does. Standard markdown (headings, **bold**, _italic_,
tables, lists, `inline code`, links) all work as usual.

---

## Callouts: note / warn / crit

```note
Informational aside.
```

```warn
Caution about something.
```

```crit
Critical / danger message.
```

````
```note
Informational aside.
```
```warn
Caution about something.
```
```crit
Critical / danger message.
```
````

Inline markdown inside the callout works (bold, links, etc.). Three styles: `note` (blue),
`warn` (amber), `crit` (red).

---

## Nerd notes

```nerd
Deep physics / background detail. Hidden unless "nerd mode" is on (top bar toggle).
```

````
```nerd
Deep physics / background detail. Hidden unless "nerd mode" is on (top bar toggle).
```
````

Markdown inside is fully parsed. Only visible when nerd mode is enabled.

---

## Limit / setpoint cards

```limits
[
  {"name":"RPV level", "val":"+2", "unit":"m"},
  {"name":"SCRAM", "val":"-4", "unit":"m", "tier":"danger"},
  {"name":"Warn", "val":"120", "unit":"%", "tier":"warn"},
  {"name":"OK band", "val":"40-70", "unit":"mbar", "tier":"ok"}
]
```

````
```limits
[
  {"name":"RPV level", "val":"+2", "unit":"m"},
  {"name":"SCRAM", "val":"-4", "unit":"m", "tier":"danger"},
  {"name":"Warn", "val":"120", "unit":"%", "tier":"warn"},
  {"name":"OK band", "val":"40-70", "unit":"mbar", "tier":"ok"}
]
```
````

A JSON array of cards. `name`, `val`, `unit` are strings. `tier` is optional and one of
`ok` / `warn` / `danger` (colors the card). Invalid JSON shows a parse error in place.

---

## Unit / mode / reactor-type filters

Content that only appears when the matching top-bar toggle is selected.

```u1
Only shown when Unit = U1.
```

````u2
Only shown when Unit = U2.

```simple
Only shown when mode = simple.
```

```realistic
Only shown when mode = realistic.
```
````

```classic
Only shown when reactor type = classic.
```

```stable
Only shown when reactor type = stable.
```

```selfcirc
Only shown when reactor type = self-circ.
```

```rbmk
Only shown when reactor type = RBMK.
```

````
```u1
Only shown when Unit = U1.
```
```u2
Only shown when Unit = U2.
```
```simple
Only shown when mode = simple.
```
```realistic
Only shown when mode = realistic.
```
```classic
Only shown when reactor type = classic.
```
```stable
Only shown when reactor type = stable.
```
```selfcirc
Only shown when reactor type = self-circ.
```
```rbmk
Only shown when reactor type = RBMK.
```
````

Markdown inside each is fully parsed (so you can nest callouts, limits, etc. inside a `u2` block).

---

## Interactive checklists (procedure steps)

Any **numbered list** where at least one item is immediately followed by a blockquote becomes an
interactive checklist (click a step to mark it done; a progress bar appears).

1. Open the inlet valve.

    > Why: suction-side water before the pump spins, otherwise it cavitates.

2. [!] Press the SCRAM button.

    > A critical step. The `[!]` prefix flags it red.

3. Start the pump.

```
1. Open the inlet valve.
   > Why: suction-side water before the pump spins, otherwise it cavitates.

2. [!] Press the SCRAM button.
   > A critical step. The `[!]` prefix flags it red.

3. Start the pump.
```

- The `>` blockquote line under a step is the "why", shown only in **nerd mode**.
- A step whose text starts with `[!]` is marked **critical**.
- Plain numbered lists with no blockquotes stay normal lists (not interactive).

---

## Flow diagram

```flow
Reactor →|steam| Turbine →|exhaust| Condenser → Hotwell
```

````
```flow
Reactor →|steam| Turbine →|exhaust| Condenser → Hotwell
```
````

- Separate nodes with `→` or `->`.
- Optional arrow label: `→|label|` rides the arrow.
- Optional node sub-line: `Node | sub text` (a smaller grey second line in the box).
- Wraps automatically (serpentine) and is theme-aware.

---

## Cropped SVG window (svgview)

```svgview
plant-mimic.svg 137 184 460 470
```

````
```svgview
plant-mimic.svg 137 184 460 470
```
````

Inlines any `.svg` file cropped to a viewBox window. The body is the filename plus four numbers
`x y w h` (the viewBox: top-left x, top-left y, width, height). Links inside the SVG route in-app
and never escape to an external URL (e.g. draw.io's `app.diagrams.net`).

---

## Abbreviations (auto tooltips)

Any term in the abbreviation dictionary (`ABBR` in `script.js`) gets a hover tooltip automatically,
no syntax needed. Add a term to that dictionary and every occurrence across all pages gets the
tooltip. Example terms: RPV, APRM, SCRAM, RCIC, LPCI, MCC, TCR, FWP, CST, EDG, S/IAS.

---

## Cross-page links

[Reactor Control](reactor-control)
[Cooling section](mcc#condensate-storage-tanks)
[By link text]() <!-- resolves by matching the nav title -->

```
[Reactor Control](reactor-control)
[Cooling section](mcc#condensate-storage-tanks)
[By link text]()        <!-- resolves by matching the nav title -->
```

- `[text](slug)` jumps to that page (`slug` = the `.md` filename without extension).
- `[text](slug#heading)` jumps to the page and scrolls to a matching `##`/`###` heading.
- `[text]()` or `[text](#)` resolves by matching the link text to a nav title.
- Real `http(s)://`, `mailto:`, `tel:` links open in a new tab.

---

## Section divider

A horizontal rule (`---`) followed by an `## Heading` styles that heading as an accent section
divider (used for the "Checklist:" sections).
