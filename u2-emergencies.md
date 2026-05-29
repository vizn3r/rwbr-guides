# U2 Emergencies

Same physics as U1 but responses are manual. Emergency systems live on the Supervisor Desk and draw from the **Condensate Storage Tanks**. Keep CSTs above 50% always.

```crit
If fuel melts in U2, the server shuts down for everyone.
```

## Key U2 differences vs U1

| System | U1 | U2 |
|--------|----|----|
| RCIC activation | Auto at −4 m | Manual only |
| LPCI activation | Auto at −4 m + low pressure | Manual only |
| LPCI speed | Throttleable | Fixed, can overflow, watch level |
| Fuel melt | Local damage | Server ends for all |

## Turbine damage (V1.7.5+)

Accumulated from incorrect handling. Carries between runs until repaired.

- Below **60% health**: Turbine Smoke can start
- At **0% health**, 30% chance of Oil Spray / Fire

```limits
[
  {"name":"Turbine Smoke starts", "val":"<60", "unit":"% health", "tier":"warn"},
  {"name":"Oil Spray / Fire chance", "val":"0", "unit":"% health", "tier":"danger"},
  {"name":"Halon countdown", "val":"30", "unit":"s"},
  {"name":"Halon clear time", "val":"5", "unit":"min"}
]
```

## Halon fire system

A turbine emergency auto-trips both U1 and U2 turbines and starts a 30-second countdown. Call points (TCR, Turbine Hall entrance, DA Hall entrance, FWP bay) can **confirm** (fire, let Halon dispense) or **abort** (smoke only, abort it).

```crit
Once Halon dispenses: Turbine Hall, Condenser Hall, FWP Bay unsafe for 5 minutes.
```

## Deaerator rupture disk

Pops when pressure spikes (overfill too fast, or FWP pressure too high). Audible pop; "Rupture disk trouble" on the U2 deaerator monitor. Only on U2. See full replacement procedure below.

---

## Checklist: SCRAM response

1. Confirm rods at **0%**.
   > If not fully inserted, manually trip again.

2. [!] **Reset IPR to level 1.**
   > Easy to forget. Without this, restart immediately SCRAMs.

3. Verify RPV water level.
   > Below −4 m: start RCIC manually (U2 does NOT auto-activate). Below −8 m: fuel melts, server ends.

4. Open emergency steam relief if pressure climbs.
   > Valves between polisher control panel and ECCS/RHR in U2.

5. Trip turbine if it hasn't tripped already.
   > TCR confirms.

6. Switch electrical to offsite power; verify Bus A is up.
   > Pumps need power.

7. Enable RHR shutdown cooling once pressure drops.
   > Both pumps for active cool-down.

---

## Checklist: Loss of offsite power (unannounced)

1. [!] SCRAM reactor immediately.
   > Main pumps are dead without offsite power.

2. Manually activate RCIC.
   > U2 RCIC has one valve (Inlet). Manual start only. Watch RPV level.

3. Connect DC bus to Emergency Bus; start EDGs.
   > Keeps ignition alive and spins up diesel power.

4. Once Safety Bus up, manually activate LPCI if RPV level needs it.
   > U2 LPCI is manual only. Pump speed can't be throttled, so it will overfill. Watch level closely.

5. Select CST tank for LPCI via the selection valve.
   > Use the fuller tank first.

6. Work toward cold shutdown via RHR.
   > Target: temp **<50 °C**, rods 0%.

**Successful recovery: 650 points** (minus what was earned during islanding).

---

## Checklist: Turbine Smoke (health <60%)

1. Abort Halon agent countdown if started.
   > Use any call point: TCR, Turbine Hall entrance, DA Hall entrance, or FWP bay.

2. Trip turbine via the call point.
   > Removes steam and mechanical load.

3. Wait until smoke ceases.
   > Don't re-enter or restart until clear.

---

## Checklist: Oil Spray / Fire (health 0%, 30% chance)

1. [!] Turn off Hydraulic and Oil Pumps.
   > Stops the oil supply feeding the spray.

2. Trip turbine via the call point.
   > Removes rotation and steam.

3. Close in order: Backflow valve → Main oil valve → Aux oil valve → Emergency oil valve.
   > Order matters. Isolate from main supply last.

4. [!] If fire erupts, evacuate Turbine Hall immediately.
   > Halon may dispense. Hall becomes lethal.

---

## Checklist: Deaerator rupture disk replacement

1. Identify the trouble.
   > Audible pop, or "Rupture disk trouble" on the deaerator monitor in the monitoring office.

2. Get new rupture disk from lockers near the deaerator hall entrance.
   > "New Discs" box, NOT "New Filters".

3. Call U2 MCR. Have them close and tag the deaerator steam **inlet** valve.
   > MCR sets inlet to 0, switch to neutral, applies yellow tag.

4. Go behind the U2 deaerator. Find the two valves and bypass pipe.
   > Emergency gas IN (top) and OUT (bottom).

5. Close **emergency gas OUT** valve (bottom): right-click wheel until 0%.
   > Clicks multiple times; wheel auto-moves each click.

6. Close **emergency gas IN** valve (top) the same way.
   > Both valves fully closed before touching the housing.

7. Click any of the 4 small rods on the rupture disk housing.
   > Rods auto-remove; housing lowers to ground.

8. Click both small connectors on the top and bottom housing parts.
   > Loosens the assembly for disassembly.

9. Press the top part to remove it.
   > If it doesn't come off, you missed a connector. Go back to step 8.

10. Click broken disk to remove it. Click center to install new one.
    > New disk from step 2.

11. Click removed top part back on. Click both connectors again.
    > Reassembles housing.

12. Click bottom of housing to lift it back into position.
    > Rods auto-add themselves.

13. Left-click both valves to open them back to **100%**.
    > Opposite direction from closing.

14. Check deaerator monitor in the control office. No trouble flag = fixed.
    > If still flagged, recheck all valves at 100% and all housing parts in place.

15. Notify U2 MCR to remove the tag.
    > MCR brings inlet up slowly. Cold-starting with high inlet steam risks repeat rupture.

16. Dispose of broken disk in special waste room.
    > Right of the stairs leading to TCR.
