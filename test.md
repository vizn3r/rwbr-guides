# Render Test Page

*This page exists to verify every element type renders correctly before I convert the rest of the manual. If any of this looks broken or ugly, tell me and I fix.*

This is plain prose. The point here is to see baseline body text at default size with reasonable line height. The MCR sits in front of the reactor, the TCR is a separate room in U2, and the FWP Bay handles feedwater. Abbreviations like APRM, SRM, IPR, RCIC, LPCI, RHR, CRD, RWM, CST, SJAE, EDG should all show a tooltip on hover.

## Section heading (h2)

Inline elements: **bold**, *italic*, and `inline code`. Body keeps reading naturally.

### Subsection heading (h3)

Bullet list with strong-text emphasis pattern:

- **Recirculation pumps:** drive water through the core. Below 30% no real authority.
- **Steam separators:** sit above the core, peel steam off the two-phase mixture.
- **Feedwater pumps:** return condensate to the RPV.

Plain numbered list (no "why" blockquotes, stays non-interactive):

1. Open the bypass valve to 40%.
2. Set both SJAEs to 100%.
3. Wait for vacuum to fall below 70 mbar.

## Tables

| Mode | Range | Notes |
|------|-------|-------|
| SRM  | startup, low flux | Lower into core, watch the count rate |
| IPR  | startup, mid flux | 8 levels in U2, 6 in U1, SCRAMs out of range |
| Run  | normal operation | Above 5% APRM only, SCRAMs below 4% |

## Limits grid

```limits
[
  {"name":"APRM normal", "val":"100", "unit":"%"},
  {"name":"APRM alarm",  "val":"120", "unit":"%",   "tier":"warn"},
  {"name":"APRM SCRAM",  "val":"125", "unit":"%",   "tier":"danger"},
  {"name":"Steam pressure", "val":"7100", "unit":"kPa"},
  {"name":"Pressure alarm", "val":"8000", "unit":"kPa", "tier":"warn"},
  {"name":"Pressure SCRAM", "val":"9500", "unit":"kPa", "tier":"danger"},
  {"name":"Turbine RPM", "val":"3600", "unit":"RPM"},
  {"name":"RPV level SCRAM", "val":"-4", "unit":"m", "tier":"danger"}
]
```

## Callouts

```note
Italics or U2-tagged text refers to Unit 2 operations and can be skipped at first.
```

```warn
Many U2 automatic systems can be enabled at all times and won't auto-disable. Always check that the auto system can operate in the current regime.
```

```crit
After any SCRAM, reset IPR to level 1 before attempting restart. Otherwise the restart attempt immediately SCRAMs because reactor power starts at 0%.
```

## Procedure (this is the checklist)

The presence of at least one `> why` blockquote turns a numbered list into an interactive checklist. Click any row to mark it done. The combined progress for all procedures on the page shows at the bottom. State persists across reloads.

### Pre-start

1. Disable all offline/shutdown cooling pumps.
   > Shutdown cooling pumps must be off before startup or they interfere with normal cooling flow paths.

2. Enable one polisher and all preheaters (HPFH).
   > Polisher keeps water chemistry clean. Preheaters warm incoming feedwater to reduce thermal shock on the RPV.

3. Enable feedwater pumps and condenser pumps on the MCC panel.
   > Gets the return side of the water loop moving before the reactor produces steam.

4. Start CAR on the condenser panel.
   > CAR pulls condenser pressure down to about 0.85 bar before any steam exists, giving a vacuum head start.

### Reactor critical

1. Both recirculation pumps to 28%.
   > Establishes water flow through the core before rods move. Moderation is in place as neutron levels rise.

2. Select the flashing rod, pull to 20%, deselect, next rod begins flashing.
   > RWM enforces a pull pattern to prevent localized power spikes at low flux.

3. [!] APRM above 5%: switch to Run mode immediately.
   > IPR has 8 levels in U2. Switch to Run before reaching level 8 or the reactor SCRAMs from IPR out of range. After any SCRAM, reset IPR to level 1.

### Turbine sync

1. Open main turbine valve slightly, target 3600 RPM.
   > At 10% power and 5-7 MPa there is enough steam to reach 3600 RPM without overshoot. Open too much at once and the turbine spins up uncontrollably.

2. As RPM approaches 3600, close the valve slightly to coast in.
   > Prevents overshoot. The precision valve gives fine control near 3600.

3. [!] When the synchroscope needle points straight up, press Sync.
   > U2 synchroscope rotates counterclockwise below 3600 RPM and clockwise above it. Sync only at the top. Off-phase connection causes a hard torque slam that can damage the shaft.

4. Switch electrical panel to onsite power, enable Bus A then Bus B.
   > Bus B carries the other half of the major pumps. Order matters because each bus draws current as it comes online.

## Nerd-only block

This is a regular paragraph that everyone reads.

```nerd
The reactor operates near 7100 kPa because saturation temperature at that pressure is about 287 degrees C. That puts the steam-water mixture in the RPV at a sweet spot between thermal efficiency (higher pressure means hotter steam means more work extracted in the turbine) and the material limits of the pressure vessel.
```

And another regular paragraph after it. With nerd mode off, the block above vanishes and the two paragraphs sit next to each other.
