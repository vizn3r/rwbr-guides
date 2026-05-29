# Islanding & Chernobyl

Islanding mode isolates the reactor unit from the offsite grid: both main buses (and all pumps) are powered directly from the turbine generator, but the generator is not synchronized to the outside network. Turbine speed can vary between **3400-3800 RPM**, site loads drag on the turbine and the operator keeps it inside the band.

```note
Islanding was introduced in v1.3.2 for U2 and v1.4 for U1. The general procedure below applies to both units; the Chernobyl-style safety test (U2 only) is at the end.
```

## Two ways to maintain it

- **Manual control:** operators adjust the turbine valve (and precision valve in U2) to hold ~3600 RPM.
- **Automatic control:** operators enable auto-control systems that hold ~3600 RPM automatically.

```nerd
When synchronized to the grid, the generator's RPM is locked to grid frequency (3600 RPM = 60 Hz on a 2-pole machine). The grid is so massive that the generator can't change its speed; load changes appear as changes in generator current, not speed. Islanding breaks that lock. Now RPM is determined solely by the balance between turbine mechanical input and site electrical demand. Too much steam in → RPM rises. Too little → RPM falls. The 3400-3800 RPM band corresponds to about 56.7-63.3 Hz, an off-nominal frequency range narrow enough that the large induction motors running the plant pumps continue to operate. Frequency excursions outside this band degrade motor torque and increase current draw, both bad for motor temperature and bus stability. Matching site load before desynchronizing is critical because any mismatch appears instantly as an RPM deviation: you're no longer absorbing the error into grid current, you're absorbing it into turbine speed.
```

---

## Checklist: Automatic islanding entry

1. Set the APR auto-control setpoint to **15-20%**.
   > Power that keeps site loads fed without exporting to the grid.

2. Set the turbine auto-RPM setpoint to **3600 RPM**.
   > Auto-RPM will hold the turbine inside the band once you're disconnected.

3. De-synchronize from the grid and **immediately** activate turbine auto-RPM.
   > The "immediately" matters, any gap before auto takes over and the RPM drifts.

That keeps the unit at the required power output with minimal operator input, leaving you free to prep for reconnection.

## When to island

If offsite power loss is **announced**, prepare for islanding. If it's unannounced, you SCRAM and recover (see [Emergencies](emergencies#loss-of-offsite-power)).

---

## Checklist: Manual islanding entry

1. Reduce reactor power so generator load drops below 100 MW.
   > Use recirculation flow. Aim for the site's own consumption needs.

2. Match generator load to site power usage, net export to network = 0.
   > Watch the demand monitor. Net zero export means the turbine sees only site drag.

3. Desynchronize the turbine.
   > If you matched site loads correctly, the turbine stays around 3600 RPM with minimal correction.

4. If load wasn't matched, immediately use the precision valve to correct.
   > Above site load: turbine spins up → reduce turbine valve.
   > Below site load: turbine spins down → open turbine valve.

5. Maintain RPM in 3400-3800 with the precision valve.
   > That window keeps bus voltage close enough for the pumps to behave.

## Bypass valve and point loss

```warn
**In U2, an open bypass valve causes point loss during islanding.** For full points: hold APRM around **11%** and **close the bypass**. This keeps turbine RPM in band while reactor pressure decays slowly; periodically bump APRM to refill pressure when it droops. (In U1, open bypass during islanding is fine, no point penalty. Practice U1 first.)
```

While islanding, no **network demand** points are earned (you're not exporting). Site demand points still count.

## Exiting islanding

---

## Checklist: Exiting islanding

1. Bring turbine load and frequency close to grid.
   > Same as a fresh sync: turbine RPM at 3600 with synchroscope alignment.

2. Re-synchronize the turbine.
   > Once synced, the grid locks RPM and you stop having to manage it manually.

3. Restore normal demand-following.
   > Back to the standard demand-meeting loop.

## If the turbine trips during islanding

You can't maintain power. SCRAM the reactor and cool down as in a classical offsite-power-loss event. **650 points** awarded minus what was already earned during the islanding window.

---

## Checklist: Restoring power after offsite blackout (Unit Interlock)

1. Engage **Unit Interlock** from the Supervisor Room to feed your Bus A from the other unit's Bus A.
   > Requires senior supervisor rank. The donor unit must be powering its A bus from its turbine (not the startup transformer). Receiver's A bus must be unpowered.

2. With Bus A back up, restart the reactor and transition to islanding.

3. Once offsite returns, re-sync and exit islanding.

## Reactor Safety Test, Chernobyl-style (U2 only)

A turbine-rundown test demonstrating that the spinning turbine can keep pumps alive long enough for diesels to take over. **500 points** for a successful test. On the **RBMK** reactor type, success also awards the **"Turbine Rundown Success!"** badge (formerly "Better than Chernobyl"). Use the in-room U2 MCR RST checklist.

```crit
This test deliberately disables protections. One mistake and you lose the unit.
```

### Conditions (from the Guide Board)

- **Do not use RCIC or the startup transformer**, either auto-cancels the test
- Maintain desired power, **25% recommended**
- Both main buses connected to the **turbine generator** (not the startup transformer)
- Diesel generator **fully stopped** before starting (it gets manually started during the test)

---

## Checklist: Reactor Safety Test (RST)

1. Reduce power to ~25% and stabilize.

2. Confirm Bus A and Bus B are on the turbine generator.

3. Confirm the EDG is fully stopped (cold).

4. [!] Disable **Rolldown Main BUS Protection** on the far left of the electrical panel.
   > Holds the bus breakers closed when the turbine trips. The turbine trips immediately on this action.

5. SCRAM the reactor.

6. Enable offline cooling (RHR shutdown cooling pumps).

7. Start the diesel generator.

8. Maintain normal reactor cooling with the main pumps; build a high reactor water level for later use.
   > The main pumps will lose power as turbine RPM falls. The extra water buys time before LPCI is required.

9. **Do not use the bypass** to maintain pressure.

10. Reduce non-important load on the generator.

11. When the diesel is online, connect the **Safety Bus** to the diesel to keep offline cooling and LPCI ready.

12. When the turbine drops below **300 RPM**, power to the main buses is lost.

13. From here LPCI maintains water level; RHR maintains cooling, both on Safety Bus / diesel.

14. Cool to the standard event objective: temperature **<50 °C**, rods at 0%.

```warn
If at any point reactor level becomes uncontrollable, stop the test and use RCIC + LPCI. Using RCIC cancels the test (and forfeits the points) but saves the unit.
```

### Cancelling the test

Any of these will cancel without requiring the SC gamepass:
- Enable RCIC
- Activate the startup transformer
- Re-engage Rolldown Main BUS Protection

```nerd
The real Chernobyl-4 test on April 25-26, 1986 was a rundown test of exactly this kind: prove that the spinning turbine could power the emergency coolant pumps long enough to bridge the diesel-start delay (roughly a minute). The test had already been postponed by hours due to Kiev grid demand, meaning the reactor had been running at partial power longer than planned. Xenon was rising. When the operators tried to reduce power for the test, the power dropped much lower than intended (down toward zero). Instead of waiting for xenon to decay, they withdrew most of the control rods to drag power back up to about 200 MW thermal (the test plan called for 700 MW). This left the Operational Reactivity Margin far below the Soviet safe-operating minimum.

At 01:23:04, the SCRAM was initiated. The RBMK control rods had a graphite "displacer" section attached below the boron absorber, separated by a water-filled gap. When a rod started inserting from above, the graphite displacer entered the lower core first and pushed out neutron-absorbing water before the absorber section arrived, causing a brief *positive* reactivity insertion rather than a negative one. Combined with the positive void coefficient at low power, this caused a runaway power excursion in about three seconds, an estimated order-of-magnitude or more above design power. Steam explosions destroyed the reactor and blew the upper biological shield (about 1,000 tonnes) off the building.

The BWR's U2 safety test cannot produce this accident: a BWR has negative void coefficient, so any power excursion reduces reactivity automatically. Running the test on the RBMK reactor type in-game exposes you to the positive void coefficient physics. The sim models this: pulling rods out too fast on RBMK causes power to accelerate rather than stabilize.
```
