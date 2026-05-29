# Inspection

Inspection is a coordinated check of all systems performed by a player with **Inspector rank** or higher, using the **Inspector Tablet**. A successful inspection awards **1000 points total** (500 per unit) and can be done every **30 minutes**. Requires cooperation between both U1, U2 MCR, TCR, and CMCR players.

```note
Inspector is one of the highest-multiplier activities in the game. It doesn't depend on demand and stacks with everything else. If an Inspector is around, coordinate.
```

## How it works

The Inspector walks the plant with the tablet open. Each checklist item requires being in a specific physical location for the tablet to allow ticking it off. Effectively tours the whole plant in order.

**If you tick off a task that isn't actually met** (e.g., checking "no leak from Hotwell U1" with a visible leak): all previously completed tasks reset and you start over. So look before you tap.

## Checklist

| # | Item | Notes |
|---|------|-------|
| 1 | No leak from Hotwell U1 | |
| 2 | No leak from Hotwell U2 | |
| 3 | Reactor 1 running and condition > 95% | Engineer panel reading |
| 4 | Reactor 2 running and condition > 95% | |
| 5 | At least one polisher available at good condition | See criteria below |
| 6 | Deaerator 1 functioning properly | Deaerator leaks don't fail this |
| 7 | Deaerator 2 functioning properly | Deaerator leaks don't fail this |
| 8 | Generator not overheating | Threshold appears to be ≥ 100 °C |
| 9 | Turbine ready for run-up | Standard TCR pre-run-up state |
| 10 | Radioactivity near turbine within limits | After a radiation event, wait 5 min after warning lights go out |
| 11 | At least one filter in good condition | Filter ΔP < 0.8 |

## Polisher criterion (item 5)

Assuming the polishers are calibrated properly:

- At least one polisher with **conductivity < 50 µSm/cm**
- And with **differential pressure < 2.5 bar**
- And **not on bypass**

If you have one polisher meeting all three, that's the one to keep in service during inspection.

## Coordination tips

- **MCR operators:** before the inspector arrives, glance at deaerator status, reactor condition, hotwell, generator temp. Fix anything obvious.
- **TCR operator:** make sure no humidity warning, vibrations are quiet, and the turbine is in a ready-for-run-up state.
- **CMCR operator:** check polisher conductivity/ΔP. If neither polisher passes the criterion, regenerate one quickly before the inspector reaches the polisher check.
- **Inspector:** start at U1, work through systematically. Don't tap a checkbox without a visual confirmation.

```warn
A failed tap resets everything. Spend the extra 5 seconds eyeballing the actual condition.
```
