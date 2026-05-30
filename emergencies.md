# Emergencies

The plant gives no warnings. React when gauges tell you something is wrong.

## SCRAM triggers

APRM ≥ 125%, period ≤ 20 s, RPV level ≤ −4 m, condenser vacuum out of range, or manual. All rods drop to 0% in under 20 seconds.

```limits
[
  {"name":"RPV normal target",        "val":"+2",  "unit":"m"},
  {"name":"SCRAM + auto emergency",   "val":"−4",  "unit":"m", "tier":"danger"},
  {"name":"MCC panel unlocks (U1)",   "val":"−3.9","unit":"m"},
  {"name":"Fuel melt",                "val":"−8",  "unit":"m", "tier":"danger"}
]
```

```u1
## U1 emergency systems

- **RCIC** auto-activates at −4 m. Steam-driven, no power needed. MCC panel locks until level returns to −3.9 m.
- **LPCI** auto-activates at −4 m AND pressure ≤ 3000 kPa. Safety Bus must be powered.
- Fuel melt = local unit damage only.
```

```u2
## U2 emergency systems

- **RCIC** is manual only, one valve (Inlet). You start it yourself.
- **LPCI** is manual only. Pump speed cannot be throttled, so it can overflow. Watch RPV level.
- Both draw from CSTs. Keep above 50% always.
- Fuel melt = server ends for everyone.

### Turbine damage
Accumulates from incorrect handling. Below 60% health: Turbine Smoke can start. At 0% health, 30% chance of Oil Spray / Fire. Halon auto-trips both turbines, starts a 30-second countdown. Call points (TCR, Turbine Hall entrance, DA Hall entrance, FWP bay) to abort (smoke) or confirm (fire).
```

```crit
U2: Once Halon dispenses, Turbine Hall, Condenser Hall, and FWP Bay are unsafe for 5 minutes.
```

```stable
**Turbine trip:** APRM will not drop to 10% as fast as on Classic. Watch it; if it stays above 20% after the trip, insert rods manually. Do not assume the auto-reduction handled it.
```

```selfcirc
**Turbine trip:** power drop is slower since recirc was not carrying the load. Insert rods immediately after any turbine trip rather than waiting for auto-reduction.
```

```rbmk
**Turbine trip:** insert rods the moment the turbine trips. Do not wait. Steam voids in the core shift when turbine steam flow stops, and reactivity can spike briefly. Get rods in fast.

**SCRAM from low power:** if you were below 700 MW when the SCRAM happened, restart is dangerous. Xenon will peak rapidly on a poisoned low-power core. Wait for xenon to decay before attempting restart; attempting to fight a xenon pit on RBMK by pulling rods is what caused Chernobyl.
```

---

## SCRAM response

## Checklist: SCRAM response

```u1
1. Confirm rods at **0%**.
   > If not fully inserted, manually trip again.

2. Verify RPV level.
   > Below −4 m: RCIC auto-activates, LPCI auto-activates on low pressure, MCC locks until −3.9 m.

3. Watch pressure; open emergency steam relief if climbing toward 9500 kPa.
   > Bypass valve also helps. Relief auto-disables at 1000 kPa.

4. Confirm turbine tripped (or trip manually).
   > Turbine still taking steam without load can over-speed.

5. Switch electrical to offsite power; verify Bus A up.

6. Enable RHR shutdown cooling once pressure drops.
```

```u2
1. Confirm rods at **0%**.
   > If not fully inserted, manually trip again.

2. [!] **Reset IPR to level 1.**
   > Forgetting this causes immediate re-SCRAM on next startup.

3. Verify RPV level.
   > Below −4 m: manually start RCIC (does NOT auto-activate in U2). Below −8 m: fuel melts, server ends.

4. Open emergency steam relief if pressure climbs.
   > Valves between polisher panel and ECCS/RHR.

5. Confirm turbine tripped (TCR confirms).

6. Switch electrical to offsite power; verify Bus A up.

7. Enable RHR shutdown cooling once pressure drops.
```

---

## Checklist: Loss of offsite power (unannounced)

```flow
SCRAM → RCIC → DC to Emergency Bus → Start EDGs → Safety Bus → RHR + LPCI → Cold Shutdown
```

```u1
1. [!] SCRAM the reactor immediately.
   > Main pumps are dead. RCIC is your only cooling.

2. Confirm RCIC auto-activated (or activate manually).
   > Steam-driven, no power needed.

3. Connect DC bus to Emergency Bus.
   > Keeps control room lights and diesel ignition alive.

4. Start EDGs from the panel.
   > Once running, they feed the Safety Bus.

5. Once Safety Bus up, switch to RHR + LPCI as steam pressure falls below 3 MPa.

6. Work toward cold shutdown via RHR. Target: **<50 °C**, rods 0%.
```

```u2
1. [!] SCRAM the reactor immediately.

2. Manually activate RCIC (Inlet valve).
   > Manual only. Watch RPV level.

3. Connect DC bus to Emergency Bus; start EDGs.

4. Once Safety Bus up, manually activate LPCI if RPV level needs it.
   > Pump can't be throttled, so it will overfill. Watch level closely.

5. Select CST tank for LPCI via the selection valve.
   > Use the fuller tank first.

6. Work toward cold shutdown via RHR. Target: **<50 °C**, rods 0%.
```

**Successful recovery: 650 points** (minus any earned during islanding).

---

## Islanding

Both units can island. Isolates the unit from the offsite grid: both buses run on the turbine generator, not synced to the network. Turbine speed varies 3400-3800 RPM; site loads drag on it and the operator keeps it in band.

```flow
Match Site Load → Desync → Hold 3400-3800 RPM
```

- If offsite loss is **announced**: prepare for islanding
- If **unannounced**: SCRAM and recover (above)
- If turbine trips during islanding: SCRAM and recover as a standard offsite event. **650 points** minus what was earned during islanding.

```u2
**U2:** open bypass valve causes point loss during islanding. For full points, hold APRM around **11%** and close the bypass. Periodically bump APRM to refill pressure when it droops.
```

No **network demand** points earned while islanding. Site demand points still count.

```nerd
When synced, RPM is locked to grid frequency, so load changes appear as current changes, not speed. Islanding breaks that lock. RPM is now set by the balance between turbine input and site electrical demand. The 3400-3800 band corresponds to ~56.7-63.3 Hz, narrow enough that plant induction motors continue operating. Matching site load before desync is critical: any mismatch appears instantly as RPM deviation instead of current deviation.
```

---

## Checklist: Islanding (automatic)

1. Set APR auto-control setpoint to **15-20%**.
   > Enough to power site loads without exporting.

2. Set turbine auto-RPM setpoint to **3600 RPM**.
   > Auto-RPM holds the band once disconnected.

3. De-synchronize from the grid; **immediately** activate turbine auto-RPM.
   > Any gap before auto takes over → RPM drifts.

---

## Checklist: Islanding (manual)

1. Reduce reactor power so generator load drops below **100 MW**.
   > Use recirculation flow. Aim for site's own consumption.

2. Match generator load to site power usage, net export = 0.
   > Net zero export means the turbine sees only site drag.

3. Desynchronize the turbine.
   > If load matched, turbine stays near 3600 RPM with minimal correction.

4. If load wasn't matched, correct immediately with the turbine valve (U2: use precision valve).
   > Spun up → close valve. Spun down → open valve.

5. Maintain RPM in **3400-3800** with the turbine valve (U2: precision valve).

---

## Checklist: Exiting islanding

1. Bring turbine load and frequency close to grid (RPM ~3600, synchroscope alignment).
2. Re-synchronize the turbine.
3. Restore normal demand-following.

---

## Checklist: Unit Interlock (restore power from other unit)

1. From Supervisor Room, engage **Unit Interlock** to feed your Bus A from the other unit's Bus A.
   > Requires Senior Supervisor rank. Donor must be on turbine (not startup transformer). Receiver's A bus must be unpowered.

2. With Bus A back up, restart reactor and transition to islanding.

3. Once offsite returns, re-sync and exit islanding.

---

```u2
## Deaerator rupture disk

Pops when deaerator pressure exceeds ~2 bar (overfilling too fast or high FWP pressure). Shows "Rupture disk trouble" on the deaerator monitor in the monitoring office.

### Checklist: Rupture disk replacement

1. Set deaerator inlet to **0%**, switch to **neutral**.
   > Stops steam before isolating.

2. Tag the inlet switch with a yellow tag.
   > Prevents anyone re-opening it during the repair.

3. Go to the deaerator in the turbine hall. Manually close **both valves** on the pipe assembly.

4. Click the pipe assembly to lower it to the ground.

5. Click the **two clips**, then click the **upper part**.

6. Click the **disk** to remove it. Dispose in the airlock area and pick up a new one.

7. Reassemble in reverse: upper part → clips → assembly → open valves → remove yellow tag.
```

---

```u2
## Reactor Safety Test (RST), Chernobyl-style

A turbine-rundown test proving the spinning turbine keeps pumps alive long enough for diesels to take over. **500 points.** On **RBMK** reactor type, also awards the **"Turbine Rundown Success!"** badge.

Conditions (from Guide Board):
- Do NOT use RCIC or startup transformer, either auto-cancels
- APRM at **25% recommended**
- Both buses on the **turbine generator** (not startup transformer)
- EDG **fully stopped** before starting
```

```crit
This test deliberately disables protections. One mistake and you lose the unit.
```

## Checklist: Reactor Safety Test

1. Reduce power to **~25%** and stabilize.

2. Confirm Bus A and Bus B on the turbine generator.

3. Confirm EDG is fully stopped (cold).

4. [!] Disable **Rolldown Main BUS Protection** (far left of electrical panel).
   > Holds bus breakers closed when turbine trips. Turbine trips immediately on this action.

5. SCRAM the reactor.

6. Enable offline cooling (RHR shutdown cooling pumps).

7. Start the diesel generator.

8. Maintain cooling with main pumps; build high reactor water level for later.
   > Main pumps lose power as turbine RPM falls. Extra water buys time before LPCI is needed.

9. Do NOT use bypass to maintain pressure.

10. Reduce non-essential load on the generator.

11. When diesel is online, connect **Safety Bus** to the diesel.

12. When turbine drops below **300 RPM**, main buses lose power.

13. LPCI maintains water level; RHR maintains cooling, both on Safety Bus / diesel.

14. Cool to **<50 °C**, rods at 0%.

```warn
If RPV level becomes uncontrollable, abort with RCIC + LPCI. Using RCIC cancels the test and forfeits the points, but saves the unit.
```

Cancelling without the SC gamepass: enable RCIC, activate the startup transformer, or re-engage Rolldown Main BUS Protection.

```nerd
The real Chernobyl-4 test on April 25-26, 1986 was a rundown test of exactly this kind: prove that the spinning turbine could power the emergency coolant pumps long enough to bridge the diesel-start delay. The test had been postponed by hours, xenon was rising, and when power dropped lower than intended during the reduction, the operators withdrew most control rods rather than waiting for xenon to decay, leaving the Operational Reactivity Margin far below the Soviet minimum. At 01:23:04, SCRAM was initiated. The RBMK control rods had graphite displacer sections below the boron absorber. As rods inserted from above, the graphite entered the lower core first, displacing neutron-absorbing water before the absorber arrived: a brief positive reactivity insertion. Combined with the positive void coefficient at low power, this caused a runaway excursion in ~3 seconds, an order-of-magnitude or more above design power. Steam explosions destroyed the reactor and blew the ~1,000-tonne upper biological shield off the building. The BWR U2 safety test cannot produce this: a BWR has negative void coefficient, so any power excursion self-limits.
```

---

```u2
## Checklist: Turbine Smoke (health <60%)

1. Abort Halon countdown using any call point.
   > TCR, Turbine Hall entrance, DA Hall entrance, or FWP bay.

2. Trip turbine via the call point.

3. Wait until smoke ceases before re-entering.

---

## Checklist: Oil Spray / Fire (health 0%, 30% chance)

1. [!] Turn off Hydraulic and Oil Pumps.
   > Stops oil supply feeding the spray.

2. Trip turbine via the call point.

3. Close in order: **Backflow valve → Main oil valve → Aux oil valve → Emergency oil valve**.
   > Isolate from main supply last.

4. [!] If fire erupts, evacuate Turbine Hall immediately.
   > Halon may dispense. Hall becomes lethal for 5 minutes.
```
