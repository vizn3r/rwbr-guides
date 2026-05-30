# Troubleshooting: Turbine & TCR

Turbine, sync, oil, sealing, generator. Most U2-specific but several apply to U1 too.

## Turbine valve won't open with all parameters green

**Symptoms:** All MCR indicator lights green, but the main turbine valve won't open.

**Likely cause:** Stop actuators tripped (U2 has them physically in the turbine hall).

**Fix:**

1. Walk to the back-right of the turbine hall.
   > Stop actuators sit on top of the yellow machine.

2. Look for a red band on the actuator, that's tripped.
   > Tripped at >3850 RPM, usually from a prior over-speed event.

3. Click the actuator to reset it.
   > The red band clears.

4. Return to MCR and try the turbine valve again.
   > Should open normally now.

## Turbine won't reach 3600 RPM

**Symptoms:** Run-up stalls below 3600. Valve fully open, RPM stuck.

**Likely causes:**

- Not enough steam pressure (low reactor power, or pressure being burned by bypass)
- Bypass valve still open competing for steam
- Stop actuator tripped mid-run-up

**Fix:**

1. Check reactor APRM is at least 10%.
   > Below this you don't have enough steam to reach 3600 RPM.

2. Verify main steam pressure is 5-7 MPa.
   > Below 5 MPa, the valve can't get enough flow.

3. Close the bypass valve.
   > Bypass steals steam from the turbine path.

4. If valve is fully open and RPM still stalled, check stop actuators (see above).
   > Even partially tripped actuators can throttle the flow.

5. Increase reactor power slightly to build pressure.
   > A small APRM bump (+2-3%) is often enough.

## Sync won't latch

**Symptoms:** Pressing Sync at ~3600 RPM does nothing or fails. Generator stays disconnected.

**Likely causes:**

- RPM changing too fast, sync needs stability
- Off-phase, synchroscope not at top (U2, and U1 for Senior Operator+)
- Senior Operator+ rank on U1: synchroscope alignment is required

**Fix:**

1. Use precision valve (U2) to stabilize RPM very close to 3600.
   > Coarse main valve is too aggressive at this stage.

2. Watch synchroscope rotation direction.
   > Counterclockwise = below 3600, clockwise = above 3600. Adjust to slow the rotation.

3. Wait for the needle to point straight up.
   > That's in-phase. Press sync at that moment.

4. If sync still won't latch, RPM is probably still drifting, make smaller valve adjustments.
   > Sub-1 RPM stability is what the latch needs.

## Turbine vibrations climbing (U2)

**Symptoms:** Vibration gauge in yellow / red zone during run-up or operation.

**Likely causes:**

- Acceleration too fast, passing through resonance bands too hard
- Accumulated turbine damage
- Casing not pre-heated above 240 °C before run-up
- Hydraulic pressure unstable

**Fix:**

1. Reduce acceleration immediately, close valve slightly.
   > Gives the rotor time to balance through resonance speeds.

2. Verify casing temp >240 °C.
   > Cold-starting causes uneven thermal expansion and vibration.

3. Check hydraulic and lube oil pressures.
   > Bearing instability shows up as vibration.

4. If vibrations are persistent at steady RPM, the turbine has damage, request maintenance.
   > See [Emergencies](emergencies#turbine-damage).

## Hydraulic pressure dropping (oil leak suspected)

**Symptoms:** Hyd. pressure in yellow zone. Backflow valve has to be closed past 70% to maintain.

**Likely cause:** Oil leak in the main valve path.

**Fix:**

1. First, try closing backflow valve to 70-80% and monitor.
   > A random pressure dip might recover on its own.

2. If backflow valve below 50% is needed to maintain pressure, it's a leak.
   > Don't try to ride it out, call it.

3. Request power reduction from MCR to 15-20% APRM.
   > Reduces stress on the oil system during the trip sequence.

4. Manually trip the turbine after MCR confirms.
   > MCR cuts steam first; TCR finishes the trip.

5. Turn off turning gear.
   > Stops further rotation.

6. Turn off oil pumps (lube and hydraulic).
   > Stops the source of the leak.

7. Wait for turbine to reach 0 RPM, then call **0028** for oil leak check.
   > Maintenance can't inspect a spinning shaft.

8. Don't restart anything until the technician clears the leak.
   > Repressurizing a leaking line makes it worse.

## Sealing pressure low or supply valve won't open

**Symptoms:** Sealing pressure under 0.15 bar. Supply valve won't open even at 100%.

**Likely cause:** Condenser vacuum not established yet.

**Fix:**

1. Confirm condenser vacuum is in band (40-70 mbar).
   > Supply valve is interlocked against the vacuum signal.

2. Open supply valve to 100%.
   > Should now respond.

3. If sealing pressure is still low after sync, decrease leak-off valve.
   > LP steam from the turbine is feeding the glands now.

## Generator overheating

**Symptoms:** Generator temp climbing toward 100 °C+. Humidity warning light may be on.

**Likely causes:**

- High load in humid conditions
- Cold/warm air valves not configured for humidity
- High load above 1000 MW in humid weather

**Fix:**

1. Verify cold air valve is fully open.
   > Default position is 100% cold.

2. In humid conditions, set warm air valve to at least 41%.
   > Mixing warm exhaust with cold intake reduces condensation in the generator windings.

3. If still climbing above 100 °C, request load reduction from MCR.
   > Below 1000 MW the generator can cool faster than it heats.

4. Watch the weather forecast in the Supervisor Room.
   > Humidity windows: early morning 1-9 °C, heavy clouds/light rain 1-9 °C, heavy rain anytime.

## Lube oil filter ΔP climbing

**Symptoms:** Active filter ΔP gauge in yellow or red (>0.4 bar normal, >0.8 trips).

**Fix:**

1. Switch the lever to the spare filter holder.
   > Right-pulled = left filter active; push left = right filter active.

2. Verify new active filter shows low ΔP.
   > Should be back to ~0.3 bar.

3. Replace the dirty filter holder while it's offline.
   > Use the new filter from the "New Filters" box (don't confuse with "New Discs").

4. Always leave the cleaner one in service when changing.
   > Reduces risk of switching to a dirty filter mid-operation.
