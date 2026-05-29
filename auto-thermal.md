# Automatic Thermal Power Control

Lets the computer move rods and adjust recirculation flow to hit a desired power setpoint. **Earns fewer points** than manual operation.

## POAH

~**1% APRM**. Below POAH, fission energy is too low to measurably raise temperature. Above it the reactor produces useful heat and temperature climbs.

## Setpoints

| APR | Meaning |
|-----|---------|
| 1% | POAH, initial warmup |
| 5% | Enough power to start the turbine |
| 10% | Enough to sync the turbine (only after pressure hits 7100 kPa) |
| 20% | Build pressure to 7100 kPa, then enable auto pressure hold |
| 30% | Upper rod-block safety limit |

## Operational modes

```u1
Two modes on the U1 regulator:

- **Absorber movement mode** (left button): auto controls rod insertion/withdrawal to lengthen or shorten period.
- **Recirculation mode**: auto controls the two recirc pumps to change flow and power.
```

```u2
Three modes on the U2 auto control:

- **Circulation mode**: auto controls recirc pump speed.
- **Rods mode**: auto controls all rod movement.
- **Group mode**: same as Rods but only selected rod groups can move. Useful for manual balancing: let Group auto hold total power while you manually trim selected groups.
```

## Reactor type behavior

```classic
**Classic:** normal two-regime operation. Both absorber and recirc regimes work as described below.
```

```stable
**Stable:** recirc regime is even more important. No natural circulation means pumps do all the work. Stay in absorber regime longer before switching; recirc response may be sluggish at low power.
```

```selfcirc
**Self-Circulating:** recirc regime has minimal effect. Recirculation barely changes power. Use absorber mode throughout most of the range. The Power-to-Flow map effectively becomes a flat line.
```

```rbmk
**RBMK:** recirc has inverse effect. Increasing flow removes voids and *lowers* power. The auto recirc mode works backwards. Use absorber mode only. Do not use recirculation regime at all on RBMK.
```

## Two operating regimes (both units)

- **Absorber regime** (below ~40% APR): thermal power controlled by absorbers only. Both recirc pumps stay at minimum (28%). Trip setpoint: 40% APR, reaching it triggers changeover to recirculation.
- **Recirculation regime** (above ~40% APR): recirc-flow control has proven unstable during testing. Recommended: set APR setpoint to desired level and ramp recirc pumps manually to the percentage from the Power-to-Flow map.

```warn
Ramping power too fast destabilizes the plant. Increase setpoints in small steps.
```

## Behavior

The controller tries to smoothly reach and hold the setpoint. Oscillations can occur from the negative temperature coefficient or xenon transients. If xenon burnoff drives recirc flow close to 0%, insert rods manually to give the circulation system more margin. If the circulation system hits its limit (alarm sounds), switch to absorber mode.

## Power-to-Flow map

```u2
On the back wall of U2 MCR. Describes the allowed operating region between reactor power and recirculation flow.

- **Low flow + high power:** forbidden. Density wave oscillations.
- **High flow + low power:** wasteful but safe
- **Diagonal corridor:** normal operating line, raise power and flow together

Stay inside the corridor. Auto thermal follows it; manual operators must respect it too.
```

```nerd
The forbidden low-flow/high-power region triggers density wave oscillations (DWO): a perturbation in flow creates a pressure wave, which changes void fraction, which changes density, which changes flow. If conditions are right, the feedback reinforces itself and the oscillation grows. Real BWRs enforce a strict P-F operating boundary because sustained DWO causes cyclic mechanical stress on fuel rods.
```
