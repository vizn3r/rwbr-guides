# U2 Startup

U2 has two startup modes selectable on the reactor panel: **Simple** (mirrors U1, no bonus) and **Realistic** (RWM pattern + SRM/IPR/Run transitions, 300 pts with auto, 900 pts fully manual including TCR).

Both modes use the same turbine, condenser, and water-loop procedures. The reactor portion differs.

## Coordination

Startup requires **MCR + TCR** working together. TCR must pre-heat the turbine and confirm ready before MCR can run up. FWP Bay operator should preheat FW pumps locally before MCR starts.

## Prerequisites

- TCR: oil warmed to 44.8 °C, turning gear engaged, casing pre-heat started
- FWP Bay: pumps pre-heated locally
- CSTs above 50%
- Polisher selected (green status)
- Shutdown cooling pumps off
- Offsite power on Main Bus A
- Hydraulic accumulators filled (realistic mode only)

```u2
## CRD system (before any rod movement, realistic mode only)

Two Control Rod Drive Pumps power the hydraulic system that moves rods. The hydraulic accumulators must be filled before startup or after any SCRAM. Rod movement fails without them.
```

```realistic
## SRM / IPR / Run mode

U2 requires manual mode transitions during startup:

| Mode | When | Exit condition |
|------|------|----------------|
| SRM  | startup, low flux | Switch to IPR at half-scale |
| IPR  | startup, mid flux | Switch to Run above 5% APRM |
| Run  | normal operation | SCRAM if below 4% |

**After any SCRAM: reset IPR back to level 1 before restarting.** Forgetting this immediately re-SCRAMs on the next startup because APRM starts at 0% and IPR level is wrong.

IPR has **8 levels** in U2. Step up when the indicator approaches the blue 90% line. Don't jump ahead too early; below the 10% red line also SCRAMs.
```

## Turbine sync (U2)

U2 requires synchroscope alignment for everyone. Synchroscope rotates counterclockwise below 3600 RPM, clockwise above. Let it slow to near-stationary, wait for needle to point **straight up**, then press **Synchronize**.

Off-phase sync causes a hard torque slam. Don't press until the needle is at the top.

```limits
[
  {"name":"Pressure for run-up", "val":">5", "unit":"MPa"},
  {"name":"APRM for run-up", "val":"10-15", "unit":"%"},
  {"name":"Casing temp before run-up", "val":">240", "unit":"°C"},
  {"name":"Deaerator target", "val":"108", "unit":"°C"},
  {"name":"Deaerator P target", "val":"1.1-1.6", "unit":"bar"},
  {"name":"APRM realistic → Run mode", "val":">5", "unit":"%"}
]
```

```warn
Many U2 auto systems don't auto-disable. Don't enable condenser auto control before there is real steam flow. It opens flow to maximum and causes severe under-pressure.
```

---

## Checklist: Cooling and condenser prep

1. Disable shutdown cooling pumps.
   > Would interfere with normal flow paths.

2. Enable one polisher (green status).
   > Conductivity and filter ΔP must be in band.

3. Enable both recirculation pumps to **28%**.
   > Circulation before rods move.

4. Open bypass to **35%**.
   > Generates steam flow once temperature rises.

5. Enable cooling pumps (condenser and feedwater).
   > Gets the water loop ready.

6. Enable both CAR; wait for steam.
   > CAR gets vacuum head start before steam arrives.

7. Once steam is flowing, enable condenser circ + one SJAE; build vacuum to ~55 mbar.
   > Keep second SJAE off as spare.

8. Deaerator outlet at ≥50%; inlet to keep pressure 1.1-1.6 bar.
   > 108 °C not reachable yet.

9. Build reactor pressure to **>5 MPa**; notify TCR "available".
   > TCR can't begin run-up without steam pressure.

10. Wait for "Turbine ready for run-up" from TCR.
    > TCR confirms casing >240 °C, oil temps balanced, sealing pressure set.

---

```realistic
## Checklist: Reactor critical (realistic mode)

1. Set reactor mode to **SRM**; IPR to level 1.
   > SRM monitors low-flux startup; IPR must start at 1.

2. Lower SRM detector a few percent into the core.
   > SRM should sit just above rod equivalent depth.

3. Select flashing rod; pull to **20%**; deselect. Next rod begins flashing.
   > RWM enforces one-rod-at-a-time. Rod block prevents pulling past limit.

4. As SRM rises, lower SRM to stay just above rod depth.
   > Keep SRM in active flux region.

5. When SRM reaches **half scale**, switch mode to **IPR**.
   > SRM no longer useful above this point.

6. Step IPR levels up as indicator approaches the blue 90% line.
   > 8 levels in U2. Step before it pegs, not after.

7. [!] Above **5% APRM**, switch to **Run** mode immediately.
   > Level 8 + staying there = SCRAM. Run mode is unrestricted 4-100%.
```

```simple
## Checklist: Reactor critical (simple mode)

1. Pull rods gradually toward **10% APRM**.
   > Same procedure as U1. Watch period; stay above 100 s.

2. Wait for reactor temp above **100 °C** and pressure rising.
   > Confirms nuclear heating started.
```

---

## Checklist: Turbine run-up and sync

1. APRM to **10-15%**; reactor pressure **>5 MPa**.
   > Enough steam for run-up without stalling.

2. Open turbine valve and build RPM toward 3600 slowly.
   > Watch vibrations. U2 trips on high vibration. Use precision valve near 3600.

3. As RPM approaches 3600, close valve slightly to coast in.
   > Prevents overshoot. Sync fails if RPM is changing fast.

4. Watch synchroscope: counterclockwise = below 3600, clockwise = above.
   > Get near 3600 and let it slow to near-stationary.

5. [!] When needle points straight up, press **Synchronize**.
   > Off-phase sync causes hard torque slam.

6. Enable auto pressure hold.
   > Frees attention while you stabilize the rest.

7. Switch electrical to onsite power; enable Bus A then Bus B.
   > Both buses now on turbine generator.

8. TCR: switch oil pumps to **Shaft** once above 1800 RPM.
   > High-pitched alarm at 1800 RPM signals this. Above 2000 RPM Aux pump trips on high pressure if left on.

---

## Checklist: Stabilization

1. APRM to **20%**; build pressure to **7.1 MPa**.
   > Operating pressure. Auto pressure hold can manage this.

2. Deaerator: inlet for **108 °C**, outlet for ≤1.6 bar.
   > Now enough steam to reach temperature.

3. APRM to **30%**.
   > Upper rod-block limit. Switch to recirc for all further power changes.

4. Switch reactor mode to **Circ**; future raises via recirculation pumps.
   > Above 30% APRM, recirc is the main control. Watch the Power-to-Flow map (back wall).

5. Enable auto cooling once flows are stable (optional, costs points).
   > Manual cooling earns more. Use auto if short-handed.
