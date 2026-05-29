# Points, Events & Inspection

A panel next to the engineer display in each unit shows live points/sec, points/min, and points/hour. Each auto system on the panel shows green ON, manual shows red OFF, and the 300-second (5-minute) delay countdown shows yellow OFF. **Senior Operators and above can disable use of auto controls server-wide.**

## Network demand

Sent-to-network minus network-demand must be within **±50 MW**.

- Full manual + deaerator configured: **1 point/sec per unit** (can go higher than 1, max not yet determined).
- Each enabled auto control adds a penalty (see Penalties below).
- **No network demand points earned while islanding.**

## Site demand

Site demand = combined network demand of both units. Meeting site demand awards **1 point every 5 seconds per unit**, on top of network demand. **Not affected by auto controls.**

Can be met by:
- Both units collectively meeting demand
- One unit alone, if site demand <1300 MW

## Maximum point generation

With Events OFF, Malfunctions ON, dual full manual operation, inspector tablet running, TCR fully manual:

```limits
[
  {"name":"Peak rate", "val":"2.9", "unit":"pts/sec"},
  {"name":"Hourly potential", "val":"10,440", "unit":"pts/hour"}
]
```

## Malfunctions

| Activity | Points |
|----------|--------|
| Correct device repair (yellow tag → red tag → completion) | 100 |
| Incorrect tag | 0 (voids the bonus) |

## Events

| Event | Reward |
|-------|--------|
| Evacuation Drill | 2000 |
| Loss of Off-site Power (LOOP) | 650 |
| Maintenance Shutdown | 500 |
| Water Leak Repair | 500 (per leak) |
| Reactor Safety Test (RST), U2 Chernobyl-style | 500 |
| Oil Leak Repair | 500 |
| Inspection (Inspector rank+) | 1000 (split 500 per unit), every 30 min |

```note
LOOP and RST follow the network computer's on-screen instructions. TCR has the oil-leak repair procedure. While islanding through a LOOP, points are earned at the demand rate. The 650 LOOP bonus is awarded for a *successful* recovery minus what was earned during islanding.
```

## U2 bonuses

| Activity | Bonus |
|----------|-------|
| Manual TCR operations | +1 point per 3 sec |
| FWP manual control | +0.1 pts/sec |
| Realistic startup (with auto) | 300 (one-time) |
| Realistic startup (fully manual incl. TCR) | 900 (one-time) |

## Specific penalties

These apply continuously while the condition is true:

```limits
[
  {"name":"Bypass valve open", "val":"+1 sec delay", "unit":"", "tier":"warn"},
  {"name":"Incorrect deaerator config", "val":"reduced", "unit":""},
  {"name":"2 turbine oil pumps running", "val":"+1 sec delay", "unit":"", "tier":"warn"},
  {"name":"MCC water level < -3 m", "val":"point cycle skips", "unit":"", "tier":"warn"},
  {"name":"EDG auto controls on", "val":"+1 sec delay", "unit":"", "tier":"warn"}
]
```

```warn
U2 only: an open bypass valve causes point loss. To island U2 for full points, hold APRM around 11% and **close** the bypass; pressure decays slowly enough that you only need occasional small APRM bumps to refill it.
```

## Output ranges (per U1 MCR wiki)

| APRM | Approximate output |
|------|--------------------|
| 50%  | ~525 MW |
| 90%  | ~1000 MW |
| 100% | ~1200 MW |
| 110% | overload risk after prolonged operation, main transformer may trip the reactor |
| 120% | hard SCRAM threshold |

```crit
Never attempt to generate more than 1600 MW. The main transformer overloads and the reactor trips automatically.
```

## Auto-control multiplier (legacy book version)

Older docs framed auto controls as a divisor: 1 system on → 1 point per 2 seconds; 2 systems → 1 per 3 seconds; etc. The wiki's specific +1-second-delay penalties (above) are the current model. Same overall effect, more autos = fewer points.

## Strategy notes

- **Solo play:** auto everything you can. You'll earn less but you can actually keep up.
- **Two players:** keep MCC manual and auto the reactor side, or vice versa.
- **Full crew:** manual everything; TCR manual gives a meaningful bonus.
- **Maintenance event:** **always** accept when asked. 500 points beats 20 minutes of perfect demand-following.
- **Inspection:** if an inspector is around, coordinate, 500 pts/unit per 30 min is one of the best multipliers in the game.

---

## Events

Trigger at the end of demand cycles. Can be disabled in Server Config. All event objectives end at **temp < 50 °C, rods at 0%**.

### Shutdown for Maintenance

Triggers when system condition drops below 80%, or by Demand Manager schedule (Supervisor+). Reward: **500 points**.

### Offsite Power Blackout (LOOP)

Offsite power lost. Turbine desynchronizes. If load > 100 MW it trips outright.

- **Bus A & B:** lose power unless on turbine generator (islanding)
- **Safety Bus:** stays up via EDG
- **Emergency Bus:** stays up via battery

**Announced LOOP** (3-10 min warning): prepare for islanding. See [Emergencies](#).
**Surprise LOOP**: SCRAM and shut down if you can't island.

Reward: **650 points** (minus what was earned during islanding).

```warn
Network demand points stop during islanding. Site demand and bonuses continue.
```

### Reactor Safety Test (U2 only)

Chernobyl-style turbine rundown test. Reward: **500 points**. See [Emergencies](#) for the full checklist.

---

## Inspection

Performed by **Inspector rank+** with the Inspector Tablet. Awards **1000 points total** (500 per unit). Can be done every **30 minutes**. Requires cooperation across MCR, TCR, and CMCR.

```note
One of the highest-multiplier activities. Doesn't depend on demand and stacks with everything else.
```

The Inspector walks the plant with the tablet open. Each item requires being in a specific location. **Ticking a task that isn't actually met resets all progress**, look before you tap.

### Checklist items

| # | Item |
|---|------|
| 1 | No leak from Hotwell U1 |
| 2 | No leak from Hotwell U2 |
| 3 | Reactor 1 running, condition > 95% |
| 4 | Reactor 2 running, condition > 95% |
| 5 | At least one polisher at good condition (conductivity < 50 µSm/cm, ΔP < 2.5 bar, not on bypass) |
| 6 | Deaerator 1 functioning properly |
| 7 | Deaerator 2 functioning properly |
| 8 | Generator not overheating (< 100 °C) |
| 9 | Turbine ready for run-up |
| 10 | Radioactivity near turbine within limits (wait 5 min after warning lights clear) |
| 11 | At least one lube oil filter in good condition (ΔP < 0.8 bar) |

```warn
A failed tap resets everything. Spend the extra 5 seconds verifying before you tap.
```
