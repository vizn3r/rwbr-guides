# Malfunctions & Events

Once you can meet demand reliably, the next challenge is malfunctions. **The plant will not warn you about them.** You detect and deal with them yourself.

## Systems that can malfunction

Feedwater pumps, circulation pumps, condenser pumps, preheaters, condenser circulation pumps, both SJAEs. A malfunctioning system runs at lower efficiency and slowly deteriorates.

```u2
In U2: oil leaks in the turbine oil system, lube oil filter clogging, and the deaerator rupture disk can also malfunction. The turbine itself accumulates damage from incorrect handling (see [Emergencies](emergencies#turbine-damage)). Polisher conductivity and filter ΔP degradation can trip pumps.
```

## Detection

The **engineer's panel** shows the average system condition. Below 100% means something is faulty. Diagnose by comparison (Malfunctions wiki, v1.5.0):

```nerd
"Diagnose by comparison" is how real plant operators find degraded equipment too. In a perfectly balanced plant, identical machines (two feedwater pumps, two SJAEs) should give identical readings at identical settings. Any asymmetry is the signal. The technique is formalized in condition-monitoring maintenance programs: instead of changing components on a calendar schedule, you measure a parameter (differential pressure across a filter, vibration on a pump, etc.) and act when it exceeds threshold. The simulator uses exactly this model. SJAE diagnosis is the hardest case because a partial SJAE degradation barely moves condenser vacuum. This is the source-documented reason these are described in the manual as the most challenging system to diagnose.
```

### Recirculation pumps

Damaged pumps exhibit **sudden** flow changes rather than gradual decreases. A ±1 kg/s difference between the two pumps at identical settings is normal. A damaged pump at 100% may show anywhere from **0 to 495 kg/s** instead of the expected steady ~500 kg/s.

### Preheaters

Standard temperature is **242 °C at 7100 kPa** reactor pressure. Higher pressure → higher preheat temp, lower pressure → lower.

Diagnostic: record baseline temperature with all three preheaters running. Deactivate Preheater 1, record. Restore, deactivate Preheater 2, record. Restore, deactivate Preheater 3, record. The one whose removal produces the smallest drop is the faulty one.

```warn
All three preheaters can malfunction simultaneously. If the temperature delta when removing each is small and roughly equal, all three are likely degraded.
```

### Feedwater pumps

Set both pumps to 75%. Deactivate FWP 1 and measure FWP 2 flow. Restore, deactivate FWP 2 and measure FWP 1 flow. Compare to expected values. Lower-than-expected flow on its own = malfunction.

### Circulation pumps

Observe flow directly, these are the easiest to read.

### Condenser pumps and condenser circulation pumps

Above 50% flow, turn off one pump and note the flow. Repeat with the other. Weaker is faulty.

### SJAEs

Hardest to diagnose because vacuum impact is small.

1. Set condenser to run on SJAE 1 only at 100%. Record condenser pressure.
   > Wait for the reading to settle, vacuum responds slowly.

2. Disable SJAE 1, enable SJAE 2 at 100%. Record pressure.
   > Same flow conditions, only the SJAE swapped. Compare directly.

3. The SJAE that gives the **higher final condenser pressure** is the malfunctioning one (worse vacuum).
   > Higher pressure means it failed to pull vacuum as well.

```warn
Keep steam flow and reactor power constant during the SJAE test. Both SJAEs can malfunction simultaneously. If neither out-performs the other and pressure is high in both cases, suspect both.
```

---

## Checklist: Repair procedure

1. Shut off the faulty device.
   > At high reactor power you may need to lower power first before shutting down a feedwater or condenser pump.

2. Tag the device with a yellow tag from the central desk holders.
   > Only devices prone to breaking can be tagged. Tagging a healthy device gives zero points.

3. Call a technician to investigate.
   > If you're correct, the technician affixes a red tag. Wait for the repair to complete.

**100 points per correct repair.** Wrong tags pay nothing.

## Leakage

If you suspect a leak in the main cooling circuit, shut down the reactor into a cold state (about 50 °C, RHR is enough to get there) and request a leak check from the technician.

### Leak characteristics

- **Variable flow:** leak rate scales with system flow, at full power, leaks lose water fast; at low power, slow.
- **Visual / radiation:** leaked water pools are radioactive. Walk pipes in the condenser hall with a Geiger counter; spikes mean leak nearby.
- **Multiple leaks:** the system can have up to **2 simultaneous leaks** (rare).
- **Leakable points:** between Reactor → Hotwell, Reactor → Deaerator (via feedwater path), and Deaerator → Reactor are all leakable. The path Hotwell → Deaerator (condensate side) and the polishing loop are **not** leakable.

A persistent MCC auto-mode makeup-water draw, with no other explanation, is a strong leak indicator.

---

## Checklist: Leak check procedure

1. Bring the reactor to **cold shutdown** (~50 °C).
   > RHR does this in 30-60 minutes from full operating temp.

2. Call U1 maintenance (**0019**) or U2 maintenance (**0028**) and say **"leak"** then "yes".

3. The technician runs the leak check. **Takes about 5 minutes.**

4. If a leak is found, the **Nuclear Plumber** badge unlocks for repairing the leak. Repair starts automatically once the leak is identified.

```note
Up to 2 simultaneous leaks can exist in the system. The leak check finds both.
```

## Maintenance events

If the plant's average condition drops **below 80%**, the reactor goes down for scheduled maintenance. Maintenance is the best time to repair everything outstanding. You may want to work through minor faults until maintenance arrives, or until you can no longer meet demand.

- **Going down for maintenance when asked: 500 points.**

## Offsite power loss

Either announced or unannounced.

- **Announced:** prepare for islanding mode. See [Emergencies](#).
- **Unannounced:** SCRAM the reactor. Cool initially with RCIC, then RHR powered by EDGs.

If you successfully bring the reactor through an unannounced offsite event: **650 points** (minus what was earned during islanding).

---

## Radioactivity

Accumulates in the **turbine hall only** (as of V1.4). No penalty for contamination currently, subject to change.

Radiation spikes if: hotwell leaks, deaerator leaks, steam leak in turbine hall (sealing pressure below 0.10 bar), or a tank overflows above +5 m.

**Detection:**
- **Handheld Geiger counter:** instant µSv/h. Can be used on other players.
- **Contamination detectors:** in the airlock, scan every entry and exit of the turbine hall.
- **Personal dosimeter:** film-based, measures total cumulative exposure in mSv.
- **Radiation scanner:** also identifies the radiation creature (he's fine).

**Decontamination:** showers outside the airlock reset current body radioactivity. Cannot undo total dosimeter exposure.

After Halon clears or a venting event, wait at least 5 minutes before re-entering, the inspector tablet's radiation check fails otherwise.

```nerd
Real plants track each worker's dose with TLD (thermoluminescent dosimeter) badges read out monthly. US NRC occupational limit: 50 mSv/year (= 5 rem/year). Public limit: 1 mSv/year. The simulator's amplified values aren't realistic but the habit of frequent scanning and tracking is exactly how real radiation protection works.
```
