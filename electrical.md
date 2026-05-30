# Electrical Panel

Four AC buses plus DC backup. Electricity flows top to bottom: offsite → startup transformer → buses → pumps.

| Bus | Powered from | Loads |
|-----|--------------|-------|
| **Main Bus A** | Startup transformer initially, then turbine generator | Half the major pumps; both recirc pumps |
| **Main Bus B** | Turbine generator (after sync) | Other half of the major pumps |
| **Safety Bus** | Main Bus A or EDGs | LPCI, RHR, instrument power |
| **Emergency Bus** | Batteries (trickle-charged from Safety Bus) | Emergency lights, panel controls |
| **DC Bus** | Safety Bus normally, Emergency Bus on failure | Control room lights, ventilation, diesel ignition |

```nerd
f = (N/60) × (poles/2). At 3600 RPM with 1 pole pair: 3600/60 × 1 = 60 Hz exactly. That is why 3600 is the sync target for a US grid turbine. A 4-pole machine runs at 1800 RPM, 6-pole at 1200 RPM. Off-phase connection forces the generator to instantly jump to grid phase. The torque pulse is proportional to the phase difference and can shear coupling bolts in a real plant even at 30° off.
```

## Startup

Both buses start on the startup transformer. Only one pump per pair is available (others are on Bus B, except both recirc pumps, which are on Bus A). After sync, both buses transfer to the turbine generator.

```u1
Bus selector switches are at the **bottom of the vertical panel**.
```

```u2
Bus selector switches are on the **left side of the panel**.
```

## Synchronization

Synchroscope rotates counterclockwise below 3600 RPM, clockwise above. Wait for the needle to point **straight up** before pressing sync.

```u1
Press **Breaker 52G1**. Senior Operator+ rank must have the synchroscope aligned for the breaker to function. Below Senior Operator, you can press the breaker without alignment. After sync: switch to onsite power → Bus A → Bus B.
```

```u2
Press **Synchronize**. Synchroscope alignment required for everyone regardless of rank. After sync: switch to onsite power → Bus A → Bus B.
```

```crit
Off-phase sync causes a hard torque slam on the turbine shaft. Don't press sync until the needle points straight up.
```

## Transient responses

- **Turbine trip:** switch back to offsite power (top-right switch). Reactor auto-reduces to 10%. If the startup transformer can't sustain the load, SCRAM and cool via RCIC.
- **Loss of offsite power:** turbine trips. SCRAM and cool via RCIC. Connect DC bus to Emergency Bus. Start EDGs from ignition on DC bus, then feed Safety Bus from EDGs.

## Bus protection

```u2
**Rolldown Main BUS Protection** switch (far-left of electrical panel). Disabling it trips the turbine but holds bus breakers closed. Required for the Chernobyl-style safety test. Buses stay alive until turbine RPM drops below ~300 RPM.
```

## Shutdown breakers

```u2
| Breaker | Action during shutdown |
|---------|----------------------|
| 52BA2 | **Close**: connects Bus A to startup transformer |
| 52BB1 | **Open**: disconnects Bus A from Bus B |

Close 52BA2 + open 52BB1 before SCRAM to move Bus A to offsite power. Pumps stay alive when the turbine trips.
```

## Emergency Diesel Generators

EDG Building contains 4 generators, 3 operational (1 for U1, 2 for U2). Auto-start on loss of offsite power; also hand-startable.

```u1
U1's EDG has no controls inside the EDG building. It is enabled remotely from the U1 electrical panel.
```

```u2
U2's two EDGs can be started from U2 MCR or manually from the EDG control panels in the bay. U2 MCR also has a request-start button. **Do not run both U2 EDGs simultaneously. It causes damage.**
```

### EDG Standby Panel

Three subsystems that must be running before the EDG can start: **Compressor** (start air), **Water heater** (keeps oil warm), **Auxiliary oil pump** (circulates warm oil). Without preheating, the EDG cannot start and an MCR alarm sounds.

---

## Checklist: EDG refueling

1. Fully open the **Main Valve** (opposite corner from the control room).
   > Opens the path from main storage tank to the EDG feed lines.

2. Fully open the valve of the EDG to refuel, **one at a time only**.
   > Multiple open valves misroutes the flow.

3. Turn on the fuel pump from the Diesel Distribution Panel.
   > Pushes fuel into the selected EDG tank.

4. When done, turn off the pump, then switch valves to the next EDG.
   > Pump off before changing valve route.

5. Once all refueling finished, turn off pump and close all valves.

```crit
Do NOT refuel an EDG while it is running. Fire risk.
```

To refill the **main storage tank**, call **0027** and say "refuel".

## DC battery

Critical control and indicator power during full blackout. Limited duration. Reactor must reach safe shutdown on steam-powered RCIC during this window.
