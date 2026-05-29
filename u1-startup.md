# U1 Startup

Two versions: the **Guide Board** (auto-assisted, uses the in-room checklist) and **Manual** (max points, no autocontrols). Both produce the same end-state; the Guide Board version just lets the computer handle rods and cooling while you focus on the turbine.

## Prerequisites

- Reactor in cold shutdown: rods fully inserted, no steam pressure
- All trip flags clear
- CST above 50%
- Offsite power available on Main Bus A via the startup transformer

## Phase overview

| Phase | Key action | When |
|-------|-----------|------|
| Condenser | CAR on, SJAE ready | Before steam |
| Reactor critical | Pull rods toward 10% APRM | Watch period |
| Steam buildup | Bypass open, vacuum established | ~5% APRM |
| Turbine run-up | Crack valve, ramp to 3600 RPM | Vacuum in band |
| Sync | Breaker 52G1 at 3600 RPM | RPM stable |
| Stabilization | 20-30%, deaerator at 108 °C | After sync |

## SRM / IPR (U1)

U1 handles the SRM→IPR detector transition automatically. You only need to step through the 6 IPR levels manually:

- IPR starts at level 1
- Increment the level when the indicator reaches around 75% (three-quarters of the scale)
- U1 has **6 levels** total
- APRM takes over naturally above ~1%

## Turbine sync

At ~10% APRM and 5-7 MPa pressure there is enough steam to reach 3600 RPM without overshooting. Use the valve to coast in. Close slightly as RPM approaches target. **Operators+** must have the synchroscope at the top before pressing Breaker 52G1.

After sync: switch to onsite power → enable Bus A → enable Bus B. Both buses are now on the turbine generator.

## After sync: deaerator and circulation

Raise APRM to 20-30% to build pressure to ~7.1 MPa. Now properly set up the deaerator: inlet for 108 °C, outlet for ≤1.6 bar. Above 30% APRM, switch reactor mode to **Circ**. Recirculation is the main control from here. Rods only for emergencies.

```limits
[
  {"name":"Pressure at sync", "val":"5000-7000", "unit":"kPa"},
  {"name":"APRM at sync", "val":"~10", "unit":"%"},
  {"name":"APRM rod/recirc crossover", "val":"30", "unit":"%"},
  {"name":"Deaerator target", "val":"108", "unit":"°C"},
  {"name":"Deaerator P target", "val":"1.1-1.6", "unit":"bar"}
]
```

---

## Checklist: Guide Board (auto-assisted)

1. Disable offline cooling pump.
   > RHR/shutdown cooling pumps off. They interfere with normal flow paths.

2. On the Reactor Automatic Control panel, select **5% with rods** and enable autocontrol.
   > Auto handles rod pull to 5% APRM.

3. On the Main Reactor Panel, enable auto balancer at **Fast**.
   > Balances rod groups during the climb.

4. On the Recirculation Panel, enable both pumps at **28%**.
   > Establishes circulation before rods move.

5. Monitor SRM until **~1000 counts**.
   > SRM nearing IPR territory.

6. Increment IPR through **6 levels** as the indicator reaches around 75% (three-quarters of scale).
   > Step up before it pegs. U1 has 6 levels.

7. On the Cooling Panel, enable FW Pump #1 and Condensate Pump #1, then enable auto control.
   > Gets the water loop moving.

8. Enable all 3 preheaters and one polisher.
   > Preheaters warm feedwater; polisher keeps chemistry clean.

9. On the Condenser Panel, enable both CAR switches.
   > Pulls condenser pressure down to ~0.85 bar before steam exists.

10. Enable **one** SJAE at 100%, enable Circ Pump #1, then enable condenser auto control.
    > Second SJAE kept off as diagnostic spare.

11. Open Deaerator outflow to **50%**; adjust inflow to keep pressure 1.1-1.6 bar.
    > 108 °C not reachable yet. That comes after sync.

12. Once vacuum is in band, start the turbine at around 20% valve; close bypass.
    > Bypass only needed while turbine isn't running.

13. Keep steam pressure **5000-7000 kPa**.
    > Stay inside the band. Too low stalls run-up, too high trips at 9500.

14. On Reactor Auto Control, select **10%**.
    > Enough steam for 3600 RPM approach.

15. [!] At 3600 RPM, close valve slightly to coast in; press **Breaker 52G1**.
    > Operator+ rank also needs synchroscope at top.

16. Switch to onsite power; enable Bus A then Bus B.
    > Turbine generator now powers both buses.

17. On Reactor Auto Control, select **30%**.
    > Builds pressure to operating level.

18. Set up deaerator: inlet for **108 °C**.
    > Enough steam now to reach temperature.

19. Switch Reactor Mode to **Circ**.
    > Above 30%, recirculation is the right control.

20. Adjust power to meet demand.
    > See Normal Operation for demand-following procedure.

---

## Checklist: Manual (max points)

### Reactor critical

1. Both recirculation pumps to **28%**.
   > Circulation before rods move.

2. Gradually pull rods toward **10% APRM**.
   > Watch period. Stay above 100 s. U1 auto-handles SRM/IPR detector switching.

3. Wait for reactor temperature above **100 °C** and pressure rising.
   > Confirms nuclear heating has started.

### Steam and condenser vacuum

1. Open bypass to about **40%** to generate steam flow.
   > SJAE needs steam to operate.

2. Enable **one** SJAE at 100%; condenser circulation at ~20%.
   > Second SJAE kept off as spare.

3. Open deaerator outlet to ≥50%; adjust inlet for 1.1-1.6 bar.
   > Minimum outlet for proper degassing.

### Turbine run-up and sync

1. Once vacuum in band (40-70 mbar), start turbine; crack valve.
   > Open gently. Too fast overshoots 3600.

2. Run toward 3600 RPM at 5-7 MPa and ~10% APRM.
   > Enough steam for smooth run-up without overshoot.

3. Close valve slightly as RPM approaches 3600.
   > Coast in. Sync fails if RPM is changing fast.

4. [!] Press **Breaker 52G1** at 3600 RPM.
   > Operator+ rank needs synchroscope at top.

5. Switch to onsite power; enable Bus A then Bus B.
   > Both buses now on generator.

### Stabilization

1. Raise APRM to **20-30%**; build pressure to **7.1 MPa**.
   > Operating pressure. Can engage auto pressure hold now.

2. Set deaerator: inlet for **108 °C**, outlet ≤1.6 bar.
   > Enough steam to reach target now.

3. Switch reactor mode to **Circ** for further power changes.
   > Recirculation is the precise control above 30%.

4. Demand-follow per [Normal Operation](#).
   > Standard demand-following loop.
