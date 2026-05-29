# Polishers / CIX (U2)

Demineralize the condensate water. Running with a bad polisher earns a points penalty and can trip pumps.

```nerd
Nuclear-grade water chemistry is controlled to parts-per-billion levels because trace ionic contamination drives stress corrosion cracking (SCC) of stainless steel and zirconium alloy fuel cladding. The polisher (Condensate Ion eXchanger, CIX) uses mixed-bed ion exchange resin: cation resin (in H⁺ form, swaps metal cations for H⁺) and anion resin (in OH⁻ form, swaps anions for OH⁻). When resin exhausts, ions pass through un-swapped and conductivity climbs. Regeneration reverses this. Conductivity in µSm/cm is a bulk measure of ionic content; pure water is ~0.055 µSm/cm at 25 °C. The 33-35 µSm/cm normal band is the in-game operating target; 50 µSm/cm and 3 bar filter ΔP are the game's trip thresholds.
```

## MCR: polisher selector

Only select a polisher with a **green status light**. Red-status (bypassed) polisher = point penalty. Changing the active polisher must be coordinated with the polisher operator.

## Quality limits

```limits
[
  {"name":"Conductivity normal",      "val":"33-35", "unit":"µSm/cm"},
  {"name":"Conductivity usable max",  "val":"50",    "unit":"µSm/cm", "tier":"warn"},
  {"name":"Filter ΔP max",            "val":"3",     "unit":"bar",    "tier":"warn"}
]
```

Above 50 µSm/cm or above 3 bar filter ΔP: random pump trips.

## Polisher status diodes

| Color | Meaning |
|-------|---------|
| Red | Empty |
| Green | Operational |
| Green flashing | Resin being refilled |
| Yellow | Awaiting air flush |
| Yellow flashing | Resin being ejected |

## Tank status diodes (3 tanks)

| Color | Meaning |
|-------|---------|
| Red | Empty |
| Red flashing | Resin being loaded |
| Yellow | Awaiting regeneration |
| Yellow flashing | Regenerating |
| Green | Ready |
| Green flashing | Resin being refilled into polisher |

## Timing

- Water flush: **3 minutes**
- Air flush: **3 minutes**
- Resin refill: **3 minutes**
- Full cleaning cycle: **9 minutes** total
- Tank regeneration: **~12 minutes** (runs in parallel on a different tank)

Start regeneration immediately after a flush, otherwise the next cleaning cycle waits on regen.

```warn
High polisher conductivity (or both polishers in bypass) can trip FW, RC, and Cond pumps. Dangerous at high power.
```

---

## Checklist: Cleaning a polisher

1. Bypass the polisher (coordinate with MCR first).
   > MCR must switch to the other polisher before you bypass.

2. Pick an empty tank; set valves to route to it.
   > One of the three tanks must show red (empty).

3. Initiate water flush (button near the polisher symbol).
   > Takes 3 minutes.

4. Initiate air flush.
   > Another 3 minutes. Polisher should now be empty (red diode).

5. Pick a tank with ready resin (green light); set valves to route from it.
   > Green = ready resin.

6. Press the tank button to transfer new resin into polisher.
   > Polisher diode goes green flashing, then green.

7. Start recirculation to check polisher condition.
   > Read conductivity and ΔP, should be back to normal band.

8. Disable bypass.
   > Routes condensate through the cleaned polisher again.

9. Tell MCR the polisher is ready for service.
   > MCR switches back if needed.

10. **Immediately** regenerate the dirty tank (press the regenerate button on the tank control).
    > 12 minutes, fully automatic. Starts now so it's ready for the next cleaning cycle.

---

## Checklist: Conductivity lab calibration

1. Pick an empty beaker from the Conductivity Lab.
   > Found inside the lab.

2. Fill it with water from the polisher's sample tap in the Condenser Hall.
   > Two circular tanks with taps on the side.

3. Install beaker on the conductivity probe.
   > Slot onto the holder near the meter.

4. Measure conductivity, wait for it to stabilize (1-2 minutes).
   > Don't read while still climbing.

5. Adjust the polisher's conductivity reading to match the measured value.
   > Use the + and − buttons. Or set to the blue calibration mark.

If the polisher is not in use, recirculate water through it to get a reading.
