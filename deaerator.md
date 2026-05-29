# Deaerator

Removes dissolved oxygen from the condensate before it returns to the reactor, and preheats feedwater so less reactor energy is wasted on warming water.

```limits
[
  {"name":"Temperature target", "val":"108", "unit":"°C"},
  {"name":"Pressure target",    "val":"1.1-1.6", "unit":"bar"},
  {"name":"Outlet valve min",   "val":"50", "unit":"%"},
  {"name":"U2 rupture disk threshold", "val":"~2", "unit":"bar", "tier":"danger"}
]
```

## How it works

Holds water at its saturation point (~108 °C at ~1.3 bar). At saturation, dissolved oxygen can't stay in solution and bubbles out through the outlet vent. The inlet valve controls how much steam enters; the outlet vent must stay at least 50% open to ensure degassing.

```nerd
Henry's law: gas solubility in water drops with rising temperature and falling pressure. The deaerator combines both effects: water at 108 °C and ~1.3 bar is exactly at saturation, so any dissolved oxygen comes out of solution and vents away.

Why does dissolved oxygen matter? In a BWR the coolant is under neutron and gamma flux, which creates radiolytic oxygen (H₂O → H₂ + ½O₂). Even a few ppb of dissolved oxygen drives intergranular stress corrosion cracking (IGSCC) of stainless steel welds and sensitized piping, a recognized failure mode in early BWR plants that drove industry-wide pipe replacement and feedwater chemistry programs from the 1970s onward. Deaeration brings feedwater oxygen down to single-digit ppb levels. The preheating function is a bonus: returning 108 °C water instead of cold condensate reduces thermal shock on the RPV nozzles and improves thermodynamic efficiency.
```

## Controls

- **Inlet valve:** admits steam. Use to reach 108 °C target.
- **Outlet valve:** vents gases; sets pressure. Never below 50%.

Pressure depends on steam in, outlet setting, and water level. Temperature mainly tracks inlet steam.

```u2
The deaerator has a breakable rupture disk that pops when pressure spikes above ~2 bar (overfilling too quickly or high FWP pressure). Shows "Rupture disk trouble" on the deaerator monitor in the monitoring office. For the replacement procedure see [Emergencies](emergencies#deaerator-rupture-disk).
```

---

## Checklist: Setup

1. Open outlet valve to at least **50%**.
   > Below 50% means incomplete degassing and oxygen carryover into the feedwater.

2. Adjust inlet valve to reach **108 °C**.
   > Increase gradually; temperature lags behind inlet changes.

3. Use outlet to hold pressure at **1.1-1.6 bar**.
   > Above 1.6 bar approaches U2 rupture disk threshold.
