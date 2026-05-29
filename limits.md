# Limits & Setpoints

Quick reference for every band that matters. "Norm" is the operational target. **A+** is the alarm; **SA+** is the SCRAM / trip line on the high side. **A−** and **SA−** mirror that on the low side.

## Reactor

```limits
[
  {"name":"APRM Norm",   "val":"100", "unit":"%"},
  {"name":"APRM A+",     "val":"120", "unit":"%", "tier":"warn"},
  {"name":"APRM SA+",    "val":"125", "unit":"%", "tier":"danger"},
  {"name":"Period A−",   "val":"30",  "unit":"s", "tier":"warn"},
  {"name":"Period SA−",  "val":"20",  "unit":"s", "tier":"danger"},
  {"name":"Period high power",  "val":"100-500", "unit":"s"}
]
```

## RPV / Pressure / Temperature

```limits
[
  {"name":"RPV temp norm",  "val":"287", "unit":"°C"},
  {"name":"RPV temp A+",    "val":"295", "unit":"°C", "tier":"warn"},
  {"name":"RPV temp SA+",   "val":"330", "unit":"°C", "tier":"danger"},
  {"name":"Main steam P norm", "val":"7100", "unit":"kPa"},
  {"name":"Main steam P A+",   "val":"8000", "unit":"kPa", "tier":"warn"},
  {"name":"Main steam P SA+",  "val":"9500", "unit":"kPa", "tier":"danger"},
  {"name":"RPV level norm",  "val":"+2", "unit":"m"},
  {"name":"RPV SCRAM + RCIC/LPCI", "val":"-4", "unit":"m", "tier":"danger"},
  {"name":"RPV meltdown",   "val":"-8", "unit":"m", "tier":"danger"}
]
```

## Tanks

```limits
[
  {"name":"Hotwell norm", "val":"0", "unit":"m"},
  {"name":"Deaerator norm", "val":"+2", "unit":"m"},
  {"name":"Tank max (auto-drain)", "val":"+5", "unit":"m", "tier":"warn"},
  {"name":"Tank min", "val":"-5", "unit":"m", "tier":"warn"},
  {"name":"CST min (U2 emergency)", "val":"50", "unit":"%", "tier":"warn"}
]
```

## Deaerator

```limits
[
  {"name":"Deaerator T target", "val":"108", "unit":"°C"},
  {"name":"Deaerator P target", "val":"1.1-1.6", "unit":"bar"},
  {"name":"U2 rupture disk", "val":"~2", "unit":"bar", "tier":"danger"},
  {"name":"Outlet valve min", "val":"50", "unit":"%"}
]
```

## Condenser

```limits
[
  {"name":"Vacuum norm", "val":"40-70", "unit":"mbar"},
  {"name":"Vacuum SA− (reactor SCRAM)", "val":"<40", "unit":"mbar", "tier":"danger"},
  {"name":"Vacuum SA+ (turbine trip)", "val":">70", "unit":"mbar", "tier":"warn"},
  {"name":"CAR initial target", "val":"0.85", "unit":"bar"}
]
```

## Turbine / Generator

```limits
[
  {"name":"Turbine RPM norm", "val":"3600", "unit":"RPM"},
  {"name":"Turbine RPM A+",   "val":"3700", "unit":"RPM", "tier":"warn"},
  {"name":"Turbine RPM SA+",  "val":"4000", "unit":"RPM", "tier":"danger"},
  {"name":"Generator load norm", "val":"1200", "unit":"MWe"},
  {"name":"Generator load A+",   "val":"1500", "unit":"MWe", "tier":"warn"},
  {"name":"Generator load SA+",  "val":"1600", "unit":"MWe", "tier":"danger"},
  {"name":"Generator load A−",   "val":"-1",   "unit":"MWe", "tier":"warn"},
  {"name":"Generator load SA−",  "val":"-20",  "unit":"MWe", "tier":"danger"},
  {"name":"Islanding RPM band", "val":"3400-3800", "unit":"RPM"}
]
```

## Recirculation pumps

```limits
[
  {"name":"Optimum", "val":"28", "unit":"%"},
  {"name":"Max (cavitation above)", "val":"30", "unit":"%", "tier":"warn"}
]
```

## TCR (U2)

```limits
[
  {"name":"Lube oil pressure", "val":"6", "unit":"bar"},
  {"name":"Hydraulic pressure", "val":"12", "unit":"bar"},
  {"name":"Oil temperature", "val":"44.8", "unit":"°C"},
  {"name":"Sealing pressure", "val":"0.25", "unit":"bar"},
  {"name":"Sealing leak threshold", "val":"<0.10-0.15", "unit":"bar", "tier":"warn"},
  {"name":"Casing pre-heat target", "val":">240", "unit":"°C"},
  {"name":"Lube filter ΔP norm", "val":"0.3-0.4", "unit":"bar"},
  {"name":"Lube filter ΔP trip", "val":">0.8", "unit":"bar", "tier":"danger"},
  {"name":"Aux pump max RPM", "val":"<2000", "unit":"RPM", "tier":"warn"},
  {"name":"Shaft pump min RPM", "val":">1800", "unit":"RPM"},
  {"name":"Warm air valve (humid)", "val":"≥41", "unit":"%"}
]
```

## Turbine Hall

```limits
[
  {"name":"Stop actuator trip", "val":">3850", "unit":"RPM", "tier":"danger"},
  {"name":"Turbine Smoke threshold", "val":"<60", "unit":"% health", "tier":"warn"},
  {"name":"Oil Spray threshold (30% chance)", "val":"0", "unit":"% health", "tier":"danger"},
  {"name":"Halon countdown", "val":"30", "unit":"s"},
  {"name":"Halon clear time", "val":"5", "unit":"min"}
]
```

## FWP Bay (U2)

```limits
[
  {"name":"Motor temp min", "val":"60", "unit":"°C", "tier":"warn"},
  {"name":"Motor temp max", "val":"105", "unit":"°C", "tier":"danger"}
]
```

## Polishers (U2)

```limits
[
  {"name":"Conductivity norm", "val":"33-35", "unit":"µSm/cm"},
  {"name":"Conductivity max", "val":"50", "unit":"µSm/cm", "tier":"warn"},
  {"name":"Filter ΔP max", "val":"3", "unit":"bar", "tier":"warn"}
]
```

## LPCI activation

```limits
[
  {"name":"Required pressure", "val":"≤3000", "unit":"kPa"},
  {"name":"U1 auto-activate level", "val":"-4", "unit":"m"}
]
```

## Auto-systems triggers and exits

```limits
[
  {"name":"Emergency steam relief auto-close", "val":"1000", "unit":"kPa"},
  {"name":"RCIC auto-activate + SCRAM (U1)", "val":"-4", "unit":"m", "tier":"danger"},
  {"name":"RCIC auto-deactivate (U1)", "val":"-3.9", "unit":"m"},
  {"name":"Fuel melt", "val":"-8", "unit":"m", "tier":"danger"},
  {"name":"Stop actuator trip", "val":">3850", "unit":"RPM", "tier":"danger"},
  {"name":"Generator overheat", "val":">100", "unit":"°C", "tier":"warn"},
  {"name":"Main transformer overload", "val":">1600", "unit":"MW", "tier":"danger"}
]
```
