# Startup

```limits
[
  {"name":"Pressure at sync",     "val":"5000-7000","unit":"kPa"},
  {"name":"APRM at sync",         "val":"~10",      "unit":"%"},
  {"name":"Rod/recirc crossover", "val":"30",       "unit":"%"},
  {"name":"Deaerator target",     "val":"108",      "unit":"°C"},
  {"name":"Deaerator P target",   "val":"1.1-1.6",  "unit":"bar"}
]
```

```limits
[
  {"name":"U2 casing before run-up","val":">240","unit":"°C"}
]
```

```flow
Cold Shutdown → Recirc 28% → Pull Rods → Build Pressure → Condenser Vacuum → Turbine Run-up → Sync → Stabilize → Circ Mode
```

```u1
## U1 overview

Simpler unit. Two versions: **Guide Board** (auto-assisted) or **Manual** (max points). Both reach the same end-state.

### Prerequisites
- Reactor in cold shutdown (rods fully inserted, no pressure)
- All trip flags clear
- CST above 50%
- Offsite power on Main Bus A via startup transformer

### SRM / IPR
U1 handles the SRM→IPR detector transition automatically. Step through 6 IPR levels manually. Increment when the indicator reaches around 75% (three-quarters of the scale).

### After sync
Raise APRM to 20-30%, pressure to 7.1 MPa. Set deaerator inlet for 108 °C, outlet ≤1.6 bar. Switch reactor mode to **Circ**; recirculation controls power above 30% APRM.

### Power climb by reactor type
- **Classic:** at ~30% APRM, stop pulling rods and switch to recirculation. Raise recirc flow to hit your power target. Both rods and recirc work well from here.
- **Stable:** keep both recirc pumps running from the start. Pull rods up to ~40% before crossing over to recirc; the reactor has no natural circulation to help you. Above 40%, raise recirc flow to climb to full power. If a recirc pump trips during the climb, stop and assess before continuing, since you may not be able to hold that power level on one pump.
- **Self-Circulating:** pull rods all the way to your power target. Skip the recirc crossover: the reactor self-circulates and recirc barely changes power. Leave recirc at 28% and use rods for everything. The reactor will stabilize on its own after each rod movement, just give it more time than usual.
- **RBMK:** pull rods to power target using rods only. Do NOT increase recirc above 28% to raise power; it will lower power on this type. Once you reach ~700 MW thermal (~58% APRM), stay there or go higher. Do not linger below 700 MW. If you overshoot and need to come down slightly, you can briefly increase recirc flow to lower reactivity, but rods are safer.
```

```u2
## U2 overview

Same reactor as U1 with analog gauges, a dedicated TCR, and a selectable realistic startup mode. Startup requires MCR + TCR coordination.

### Prerequisites
- TCR: oil at 44.8 °C, turning gear engaged, casing pre-heat started
- FWP Bay: pumps pre-heated locally
- Both CSTs above 50%
- Polisher selected (green status)
- Shutdown cooling pumps off
- Offsite power on Main Bus A

### Mode
Select **Simple** (rods can be pulled freely, no RWM or mode transitions, no points bonus) or **Realistic** (RWM pattern + SRM/IPR/Run, 300 pts with auto / 900 pts fully manual including TCR) on the reactor mode panel before pulling rods.

### Turbine sync
Synchroscope required for everyone. Counterclockwise = below 3600, clockwise = above. Wait for needle straight up, then press **Synchronize**.

### After sync
Switch electrical to onsite → Bus A → Bus B. APRM to 20%, pressure to 7.1 MPa. Deaerator inlet for 108 °C, outlet ≤1.6 bar. APRM to 30%, mode to **Circ**.
```

```warn
U2 only: many auto systems don't auto-disable. Never enable condenser auto control before real steam is flowing. It opens to maximum and causes severe under-pressure.
```

---

```u1
## Checklist: U1 Guide Board (auto-assisted)

1. Disable offline cooling pump.
   > RHR off. Interferes with normal flow paths.

2. Reactor Auto Control: select **5% with rods**, enable autocontrol.
   > Auto handles rod pull to 5% APRM.

3. Enable auto balancer at **Fast** on the Main Reactor Panel.
   > Balances rod groups during the climb.

4. Enable both recirculation pumps to **28%**.
   > Circulation before rods move.

5. Monitor SRM until **~1000 counts**.
   > Approaching IPR territory.

6. Increment IPR through **6 levels** as indicator reaches around 75% (three-quarters of scale).
   > Step before it pegs. 6 levels in U1.

7. Enable FW Pump 1 and Condensate Pump 1; enable MCC auto control.
   > Gets the water loop moving.

8. Enable all 3 preheaters and one polisher.
   > Preheaters warm feedwater; polisher keeps chemistry clean.

9. Enable both CAR switches on the Condenser Panel.
   > Pulls condenser to ~0.85 bar before steam exists.

10. Enable **one** SJAE at 100%; enable Circ Pump 1; enable condenser auto.
    > Second SJAE kept off as diagnostic spare.

11. Open deaerator outflow to **50%**; adjust inflow for 1.1-1.6 bar.
    > 108 °C not reachable until after sync.

12. Once vacuum in band, start turbine at ~20% valve; close bypass.
    > Bypass only needed while turbine isn't running.

13. Keep steam pressure **5000-7000 kPa**.
    > Too low stalls run-up; too high risks a trip.

14. Reactor Auto Control: select **10%**.
    > Enough steam for 3600 RPM approach.

15. [!] At 3600 RPM, coast in with valve; press **Breaker 52G1**.
    > Senior Operator+ rank also needs synchroscope at top.

16. Switch to onsite power; enable Bus A then Bus B.
    > Turbine generator now powers both buses.

17. Reactor Auto Control to **30%**; deaerator inlet for **108 °C**.
    > Enough steam to reach temperature now.

18. Switch reactor mode to **Circ**; adjust to meet demand.
    > Above 30% recirculation is the right control.
```

```u1
## Checklist: U1 Manual (max points)

### Reactor critical

1. Both recirculation pumps to **28%**.
   > Circulation before rods move.

2. Gradually pull rods toward **10% APRM**. Watch period, stay above 100 s.
   > U1 auto-handles SRM/IPR detector switching.

3. Wait for reactor temp above **100 °C** and pressure rising.
   > Nuclear heating confirmed.

### Steam and condenser vacuum

1. Open bypass to ~**40%**.
   > SJAE needs steam flow to operate.

2. Enable **one** SJAE at 100%; condenser circulation at ~20%.
   > Second SJAE stays off as spare.

3. Deaerator outlet ≥50%; inlet for 1.1-1.6 bar.
   > Minimum outlet for proper degassing.

### Turbine run-up and sync

1. Once vacuum in band (40-70 mbar), start turbine; crack valve gently.
   > Too fast overshoots 3600.

2. Run toward **3600 RPM** at 5-7 MPa and ~10% APRM.
   > Enough steam without overshoot.

3. Close valve slightly as RPM approaches 3600.
   > Coast in. Sync fails if RPM is still changing.

4. [!] Press **Breaker 52G1** at 3600 RPM.
   > Senior Operator+ rank needs synchroscope at top.

5. Switch to onsite power; enable Bus A then Bus B.

### Stabilization

1. APRM to **20-30%**; pressure to **7.1 MPa**.
2. Deaerator: inlet for **108 °C**, outlet ≤1.6 bar.
3. Switch reactor mode to **Circ**; follow [Normal Operation](operation).
```

```u2
## Checklist: U2 Cooling and condenser prep

1. Disable shutdown cooling pumps.
   > Interfere with normal flow paths.

2. Enable one polisher (green status).
   > Conductivity and filter ΔP in band.

3. Both recirculation pumps to **28%**.
   > Circulation before rods move.

4. Open bypass to **35%**.
   > Generates steam flow once temperature rises.

5. Enable cooling pumps (condenser and feedwater).
   > Gets the water loop ready.

6. Enable both CAR; wait for steam.
   > Head start on vacuum before steam arrives.

7. Once steam flowing, enable condenser circ + **one** SJAE; build vacuum to ~55 mbar.
   > Second SJAE stays off as spare.

8. Deaerator outlet ≥50%; inlet for 1.1-1.6 bar.
   > 108 °C not reachable yet.

9. Build reactor pressure to **>5 MPa**; notify TCR "available".
   > TCR needs steam pressure before run-up.

10. Wait for "Turbine ready for run-up" from TCR.
    > TCR confirms casing >240 °C, oil balanced, sealing set.
```

```realistic
## Checklist: U2 Reactor critical, Realistic mode

1. Set reactor mode to **SRM**; IPR to level **1**.
   > After any SCRAM reset IPR to 1. Forgetting this causes immediate re-SCRAM.

2. Lower SRM detector a few percent into the core.
   > SRM should sit just above rod equivalent depth.

3. Select flashing rod; pull to **20%**; deselect. Next rod flashes.
   > RWM enforces one-at-a-time. Rod block prevents pulling past 20% until all rods are there.

4. As SRM rises, lower SRM to stay just above rod depth.
   > Keep SRM in the active flux region.

5. When SRM hits **half scale**, switch mode to **IPR**.
   > SRM no longer useful above this point.

6. Step IPR levels up as indicator approaches the **blue 90% line**.
   > 8 levels in U2. Step before it pegs. Don't jump ahead; below 10% also SCRAMs.

7. [!] Above **5% APRM**, switch to **Run** mode immediately.
   > Level 8 + staying there = SCRAM. Run is unrestricted between 4-100%.
```

```simple
## Checklist: U2 Reactor critical, Simple mode

1. Pull rods gradually toward **10% APRM**. Watch period, stay above 100 s.
   > No RWM pattern in simple mode; pull all rods freely.

2. Wait for reactor temp above **100 °C** and pressure rising.
   > Nuclear heating confirmed.
```

```u2
## Checklist: U2 Turbine run-up and sync

1. APRM to **10-15%**; reactor pressure **>5 MPa**.
   > Enough steam for run-up without stalling.

2. Open turbine valve; build RPM toward 3600 slowly.
   > U2 trips on high vibration. Use precision valve near 3600.

3. Close valve slightly as RPM approaches 3600.
   > Sync fails if RPM is still changing.

4. Watch synchroscope: counterclockwise below 3600, clockwise above.
   > Let it slow to near-stationary.

5. [!] When needle points **straight up**, press **Synchronize**.
   > Off-phase sync causes hard torque slam.

6. Enable auto pressure hold.
   > Frees attention while you stabilize.

7. Switch electrical to onsite power; enable Bus A then Bus B.
   > Both buses now on turbine generator.

8. TCR: switch oil pumps to **Shaft** once above 1800 RPM.
   > Alarm at 1800 RPM. Leave Aux on past 2000 RPM and it trips on high pressure.

```

---

```u2
## Checklist: U2 Stabilization

1. APRM to **20%**; build pressure to **7.1 MPa**.
   > Operating pressure. Auto pressure hold can manage this now.

2. Deaerator: inlet for **108 °C**, outlet ≤1.6 bar.
   > Enough steam to reach temperature now that the turbine is running.

3. APRM to **30%**; switch reactor mode to **Circ**.
   > Above 30% recirculation is the main control. Watch the Power-to-Flow map on the back wall.

4. Enable auto cooling once flows are stable (optional, costs points).
   > Manual cooling earns more. Use auto if short-handed.
```
