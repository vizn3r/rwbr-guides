# How the Plant Works

A BWR boils water directly in the reactor core. Steam drives a turbine, which spins a generator. Everything else supports that cycle.

## The steam cycle

```flow
Reactor → Turbine → Condenser → Hotwell → Condensate Pumps → Deaerator → Feedwater Pumps → Reactor
```

1. **Reactor** boils water. Steam rises through separators and dryers, leaving liquid water behind.
2. **Steam** travels to the turbine (through the turbine inlet valve) or bypasses it directly to the condenser (bypass valve).
3. **Turbine** converts steam energy to shaft rotation at 3600 RPM, driving the generator.
4. **Condenser** cools the exhaust steam back to liquid water using lake-water circulation. The vacuum inside (~55 mbar) pulls steam through the turbine.
5. **Hotwell** collects the condensed water.
6. **Condensate pumps** push water from the hotwell through the deaerator.
7. **Deaerator** strips dissolved oxygen from the water and preheats it to ~108 °C.
8. **Feedwater pumps** pressurize the water and push it back into the reactor.

The reactor water level must stay near 0 m at all times. If it drops to −4 m the reactor SCRAMs and emergency cooling activates. If it reaches −8 m, fuel melts.

## How reactor power is controlled

Two methods, used together:

- **Control rods:** absorb neutrons. Pull out to raise power, insert to lower.
- **Recirculation flow:** two pumps circulate water through the core. Higher flow removes steam voids, raising power; lower flow does the opposite. More precise than rods, used above ~30%.

Below ~30% APRM: rods. Above 30%: recirculation flow.

## How generator load is controlled

The reactor sets available energy. The turbine valve controls how much reaches the generator.

- **Open valve** → more load, pressure drops
- **Raise reactor power** → more steam → pressure recovers → sustained higher load

To increase output: raise power first, then open valve to match. To decrease: close valve, then reduce power.

## The operators and what they do

In a full crew each person owns one part of the cycle:

| Operator | Responsible for |
|----------|----------------|
| Reactor op | Control rods, recirculation, power level |
| Turbine op | Turbine valve, steam pressure, generator sync and load |
| Cooling op | Feedwater/condensate pumps, water levels in hotwell/deaerator/reactor |
| Condenser op | Vacuum, SJAE, condenser circulation pumps |
| Electrical op | Bus transfers, EDGs (monitored by turbine op and supervisor) |
| TCR op | *(U2)* Oil pressures, steam sealing, casing temp, generator cooling |
| FWP op | *(U2)* Feedwater pump temperatures and lubrication |

## The electrical system

Power flows: offsite → startup transformer → Main Bus A → pumps. After the turbine syncs to the grid, both buses switch to the turbine generator.

```flow
Offsite → Startup Transformer → Main Bus A → Pumps
```

If offsite power is lost: turbine trips, pumps stop, SCRAM. Emergency cooling: RCIC (steam-driven, no power needed), then RHR once diesel generators are running.

## Key limits to always know

```limits
[
  {"name":"RPV level target",   "val":"0",    "unit":"m"},
  {"name":"RPV SCRAM",          "val":"−4",   "unit":"m", "tier":"danger"},
  {"name":"Steam pressure op",  "val":"7100", "unit":"kPa"},
  {"name":"APRM normal max",    "val":"100",  "unit":"%"},
  {"name":"APRM SCRAM",         "val":"125",  "unit":"%", "tier":"danger"},
  {"name":"Condenser vacuum",   "val":"40-70","unit":"mbar"},
  {"name":"Deaerator temp",     "val":"108",  "unit":"°C"}
]
```

```nerd
RBWR simulates a direct-cycle BWR: the same water that cools the core becomes the steam that drives the turbine. This means reactor coolant and working fluid are one and the same, so any contamination (fission products, activated corrosion products) circulates through the turbine. Real plants deal with this through careful chemistry control, filtration (polishers), and shielding in the turbine hall. The alternative is a PWR (pressurized water reactor): the primary loop stays under high pressure so it never boils, and a secondary loop produces clean steam for the turbine via a steam generator. More complex, but the turbine stays clean.
```
