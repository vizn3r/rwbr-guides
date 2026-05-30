# Condenser Panel

Maintains the vacuum that pulls steam out of the turbine and lets it condense by heat exchange with lake-water circulation.

```limits
[
  {"name":"Vacuum SA− (SCRAM)", "val":"<40", "unit":"mbar", "tier":"danger"},
  {"name":"Normal vacuum",     "val":"40-70", "unit":"mbar"},
  {"name":"Vacuum SA+ (turbine trip)", "val":">70", "unit":"mbar", "tier":"warn"},
  {"name":"CAR initial target","val":"~0.85", "unit":"bar"},
  {"name":"Operating target",  "val":"~55", "unit":"mbar"}
]
```

## Elements

- **Condenser Air Removal (CAR):** electric pumps. Pull condenser to ~0.85 bar before any steam exists.
- **Steam Jet Air Ejectors (SJAE):** steam-driven. Remove non-condensable gases. Need steam flow to operate. Run one continuously; second is backup/diagnostic.
- **Circulation pumps:** lake water through the heat exchanger. Condensation volume collapse creates most of the vacuum. Adjust continuously to track steam flow.

```nerd
When steam condenses to water the volume shrinks by a factor of roughly 25,000:1 at condenser pressure (~5.5 kPa). That collapse is the main source of vacuum, not the air ejectors. SJAEs only remove non-condensables (air in-leakage, dissolved gases) that would blanket the heat exchanger and degrade vacuum. The SJAE works by a steam jet venturi: high-pressure steam through a nozzle creates a high-velocity jet that entrains and compresses non-condensable gas and pushes it out. Steam tables at 5.5 kPa: specific volume ~25 m³/kg for steam vs. ~0.001 m³/kg for water.
```

## Operating notes

- Target vacuum ~55 mbar, well inside the 40-70 safe band
- Adjust circulation pumps **before** you change reactor power, not after. Reacting to a vacuum drop is already too late
- If vacuum spikes (too strong), reduce circulation pump speed or briefly open bypass to add steam flow
- Only run **one** SJAE continuously, keep the second off so you have a clean spare for diagnostics (and to back up if the active one degrades)

```note
The source book says "set both SJAE to 100%" during startup. The U1 MCR wiki revises this to one at a time: if the active SJAE turns out to be the malfunctioning one, you need a clean spare. Follow the one-at-a-time approach.
```

---

## Checklist: Run-up

1. Start CAR to initially decrease condenser pressure.
   > Brings condenser to ~0.85 bar so SJAEs have something to work with once steam appears.

2. At ~5% reactor power with steam flowing, open bypass valve; enable **one** SJAE at 100%.
   > Keep inlet valve below 40% near 200 mbar pressure. Second SJAE stays off as spare.

3. Set condenser circulation pumps to ~20%.
   > Real effect kicks in once steam flow is higher.

4. Once vacuum reaches ~70 mbar, enable auto control (target ~55 mbar).
   > Auto: both pumps on, valve in neutral, press START. Auto earns fewer points.

5. Start turbine; close bypass valve.
   > Bypass only needed while turbine isn't running.

6. As steam flow changes, adjust circulation pumps to hold vacuum 40-70 mbar.
   > Anticipate, adjust as you change reactor power, not after the vacuum drops.
