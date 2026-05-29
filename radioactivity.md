# Radioactivity

Radioactivity (V1.3+) accumulates in certain areas and on the player's body. There is currently **no penalty for contamination**, though this may change in future updates.

## Where radiation accumulates

As of V1.4, the **turbine hall is the only area** where radiation builds up in the facility:

- Elevated levels next to the turbine
- Turbine hall airlock + showers area

Radiation can spike if:

- The condenser **hotwell** leaks
- The **deaerator** leaks
- There's a **steam leak** in the turbine hall (sealing pressure below 0.10-0.15 bar)
- A tank overflows above +5 m (auto-drain dumps into the compartment)

## Detection devices

- **Personal Geiger counter (handheld):** instant µSv/h reading in your vicinity. Can be used on other players to check for contamination.
- **Contamination detectors:** placed in the airlock. Scan every time you enter or exit the turbine hall.
- **Personal dosimeter:** film-based device that darkens with absorbed radiation. Measures **total** exposure in millisieverts. The displayed effect is exaggerated for gameplay.
- **Radiation scanner:** also can identify the radiation creature (he's fine, trust him).

## Decontamination

- **Showers** outside the turbine hall airlock reset **current** radioactivity on your body.
- Showers cannot undo total exposure on the dosimeter.

## Habits

- Scan in and out of the turbine hall every time
- Glance at the dosimeter. Total exposure is cumulative across the shift.
- After Halon clears or after a venting event, wait at least 5 minutes before re-entering for inspection checks (the inspector tablet's radiation check fails otherwise)

```nerd
A real plant tracks each worker's individual dose with TLD (thermoluminescent dosimeter) badges that are read out monthly. The US NRC occupational limit is 50 mSv/year (= 5 rem/year, same number in different units; 1 Sv = 100 rem). The public limit is 1 mSv/year. The simulator's amplified values are nowhere near realistic, but the *habit* of frequent scanning and exposure tracking is exactly how real radiation protection works.
```
