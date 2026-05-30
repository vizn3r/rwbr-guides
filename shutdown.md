# Shutdown

```flow
Reduce Power → Recirc Walk-down → Rods <30% → Trip Turbine → Insert Rods → RHR → Cold Shutdown 50C
```

```classic
Reduce recirc flow to walk power down above 30%, then switch to rods below 30%. Turbine trip auto-reduces APRM to 10%. Switch electrical to offsite before tripping the turbine.
```

```stable
Reduce recirc flow to walk down above 30%. Turbine trip will NOT auto-reduce power as reliably; watch APRM after the trip and insert rods manually if it stays above 10-15%. If a recirc pump fails mid-shutdown, you may need to SCRAM rather than continue manually.
```

```selfcirc
Use rods to walk down; recirc has no real authority. After tripping the turbine, APRM may not drop as sharply as on Classic since recirc was not carrying the load. Insert rods to bring it down.
```

```rbmk
Use rods to walk down. Push through the 700 MW threshold quickly; do not hold at 700-800 MW for extended time. Once below 700 MW the reactor is in the unstable zone, get to cold shutdown fast. After the turbine trips, insert rods immediately; a power spike is possible as steam voids shift in the core.
```

```u1
## U1 key points

- Above 30% APRM: **recirculation flow** walks power down
- Below 30%: switch to **rods**
- Below ~5%: close turbine valve, trip turbine
- Switch electrical to offsite **before** turbine RPM falls, otherwise buses lose power
- Cold shutdown target: **50 °C**
```

```u2
## U2 key points

Prescribes a **SCRAM-based** shutdown at 20% rather than a manual walk-down. Faster and avoids fighting the xenon transient.

### Breaker refs

| Breaker | Action | Purpose |
|---------|--------|---------|
| 52BA2 | Close | Connects Bus A to startup transformer |
| 52BB1 | Open | Disconnects Bus A from Bus B |

Closing 52BA2 + opening 52BB1 moves Bus A to offsite power before the SCRAM, so pumps stay alive when the turbine trips.

### TCR side
Switch oil pumps to **Aux** before RPM drops below 1800. Engage turning gear once turbine reaches 0 RPM.

### After shutdown
Xenon peaks hours after shutdown from full power, so plan restart windows accordingly. Keep CSTs above 50%. Regenerate degraded polishers during cool-down.
```

---

```u1
## Checklist: U1 shutdown

1. Reduce reactor power by lowering recirculation flow.
   > Above 30% recirc is the main control. Walk pumps toward minimum.

2. Match falling generator load to demand as you go.
   > Don't drop turbine valve below what the load needs. Pressure swings high.

3. Below ~30% APRM, switch to inserting rods.
   > Recirc authority falls at low power.

4. Below ~5% APRM, close turbine valve and trip turbine.
   > No useful steam below this point.

5. Switch electrical to offsite power **before** turbine spins down.
   > If RPM falls first, buses lose power and pumps stop.

6. Insert all rods to 0%.
   > Reactor goes subcritical.

7. Open deaerator inlet to keep ~108 °C; cut as pressure falls below ~1.5 MPa.
   > Below ~1.5 MPa steam isn't hot enough anyway.

8. Enable both RHR pumps.
   > Decay heat strongest right after shutdown. Both pumps for active phase.

9. Cool to **50 °C** using RHR.
   > Cold shutdown target. One pump sufficient once cool.
```

```u2
## Checklist: U2 shutdown

1. Call Grid Control (**5682**), say "disconnect". Inform TCR, CMCR, FWP, EDG bay.
   > Coordinated shutdown. Everyone needs to know.

2. Reduce APRM to **20% or less** via recirculation flow, then rods.
   > Safe manual-operation boundary.

3. Shut off FW Pump 2, Condensate Pump 2, Condenser Circulation Pump 2.
   > At 20% one of each is enough. Close their inlet/outlet valves.

4. Close **Breaker 52BA2**; open **Breaker 52BB1**.
   > Moves Bus A to startup transformer before turbine trips.

5. If using MCC autocontrol, ensure it's enabled.
   > Keeps levels managed through the transient.

6. [!] **SCRAM** the reactor.
   > Turbine trips automatically. Do NOT manually trip it.

7. Enable BOTH RHR pumps in SDC mode.
   > Both for active cool-down. One enough once cool.

8. Monitor MCC flows.
   > Keep water balanced through the transient.

9. Do not use RCIC or LPCI unless level is uncontrollable.
   > Normal cooling pumps are correct here.

10. [!] Do not acknowledge the trip state until SCRAM is complete.
    > Wait for all "full in" lights on FCD and all SCRAM lights out.

11. If using Unit Interlock, inform Unit 1 of the shutdown.
    > They need to know before bus power drops.

12. Once level stable, temp **<50 °C**, condenser steam flow **<5 kg/s**: shut off remaining devices.
    > Cold shutdown reached.
```
