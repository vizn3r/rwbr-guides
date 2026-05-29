# Troubleshooting: Cooling, Condenser & Chemistry

Hotwell, deaerator, RPV levels. Flow balance issues.

## Hotwell rising, deaerator dropping

**Symptoms:** Hotwell level climbing above 0 m, deaerator level falling below 0 m.

**Likely cause:** Condensate pumps moving water from hotwell to deaerator too slowly.

**Fix:**

1. Increase condensate pump valve setting.
   > Faster transfer from hotwell to deaerator.

2. If you're above 50% flow demand, enable both condensate pumps.
   > One pump tops out around 50%.

3. Continue until both levels stabilize at setpoint.
   > Hotwell at 0 m, deaerator at +2 m.

## Deaerator rising, RPV dropping

**Symptoms:** Deaerator level above +2 m, RPV level falling below +2 m.

**Likely cause:** Feedwater pumps moving water from deaerator to RPV too slowly.

**Fix:**

1. Increase feedwater pump valve setting.
   > Faster transfer from deaerator to RPV.

2. If above 50% flow demand, enable both feedwater pumps.
   > Same constraint as condensate pumps.

3. Re-balance condensate flow to match.
   > "What goes in must come out", keep all three flows equal at steady state.

## RPV level falling fast / approaching -4 m

**Symptoms:** Reactor water level dropping despite feedwater flow.

**Likely causes:**

- Steam flow exceeds feedwater (turbine valve over-open)
- Coolant leak somewhere in the loop
- Emergency steam relief open
- Steam jet ejector pulled water out (rare)

**Fix:**

1. Immediately increase feedwater pump flow.
   > Maximize injection. Both pumps at 100% if needed.

2. Reduce turbine valve / bypass valve to cut steam outflow.
   > Less steam out = less feedwater needed to balance.

3. Verify emergency steam relief is closed.
   > It auto-disables at 1000 kPa but verify.

4. If level reaches -4 m, RCIC auto-activates (U1) or you start it manually (U2).
   > See [Emergencies](emergencies#scram-response).

5. After the immediate crisis, suspect a leak. Plan a cold shutdown for leak check.
   > See [Malfunctions](malfunctions#leakage).

## RPV level rising / approaching +5 m

**Symptoms:** RPV level above setpoint, approaching the auto-drain threshold.

**Likely causes:**

- Feedwater flow exceeds steam flow
- LPCI activated (uncontrolled injection, U2)
- Auto cooling over-correcting

**Fix:**

1. Reduce feedwater pump flow.
   > Stop overfilling.

2. If LPCI is active and over-injecting, stop it once level is acceptable.
   > U2 LPCI can't be throttled, only on/off.

3. Open dump valve briefly to remove excess water from hotwell side.
   > See [Cooling & Water](mcc#makeup-and-drain) for U2 dump-valve mechanics.

4. Above +5 m, water auto-drains and radioactivity spikes in compartment.
   > Avoid getting close to this.

## Deaerator temperature stuck below 108 °C

**Symptoms:** Deaerator water temp won't climb to 108 °C target despite inlet open.

**Likely causes:**

- Reactor power too low to provide hot steam
- Inlet valve not open enough
- Outlet valve too open (steam venting before condensing)

**Fix:**

1. Verify reactor pressure is at least 5 MPa.
   > Below this, the available steam is too cool.

2. Open inlet valve further.
   > More steam in = more heat.

3. Reduce outlet to minimum allowed (50%).
   > Keeps steam inside long enough to heat the water.

4. If after sync it still won't reach 108 °C, raise reactor power.
   > Steam temperature scales with pressure scales with power.

## Deaerator pressure too high (>1.6 bar)

**Symptoms:** Deaerator pressure climbing toward 2 bar (U2 rupture disk threshold).

**Likely causes:**

- Inlet valve too open
- Outlet valve too restricted
- Overfilling water level too fast

**Fix:**

1. Reduce inlet valve immediately.
   > Less steam in = less pressure.

2. Open outlet valve further (must stay above 50%).
   > Vents excess pressure.

3. Reduce feedwater flow if water level is climbing.
   > Less water = less displaced volume = lower pressure.

4. If pressure exceeds 2 bar in U2, the rupture disk pops.
   > See [Emergencies](emergencies#deaerator-rupture-disk) for the rupture disk replacement.

## Deaerator pressure won't reach 1.1 bar

**Symptoms:** Deaerator pressure stuck below 1 bar.

**Likely causes:**

- Inlet valve too closed
- Outlet too open
- Low reactor power = no steam to send

**Fix:**

1. Close outlet to 50% (minimum allowed).
   > Stops venting; pressure builds.

2. Open inlet further.
   > More steam in = more pressure.

3. Check reactor power.
   > Need enough steam to fill the deaerator beyond its outflow.

## Auto cooling losing control / oscillating

**Symptoms:** Auto cooling makes levels oscillate or fall out of band.

**Likely causes:**

- Steam flow / power changed too quickly
- Pumps were not all enabled before pressing START
- Some switch was not in neutral

**Fix:**

1. Stop auto cooling and go manual.
   > Take back direct control.

2. Re-balance levels manually first.
   > Bring everything to setpoint with steady flows.

3. Verify all pumps on, all switches neutral, seven green lights on auto panel.
   > Auto needs the full setup.

4. Press START again on auto.
   > Auto should now hold steady.

5. Don't change reactor power or turbine valve quickly while auto is engaged.
   > Auto only reacts to levels, not flows; fast changes overrun it.

---

## Condenser & Vacuum

Common condenser problems and how to fix them. Most condenser issues are about either not enough or too much vacuum.

## Vacuum won't drop into the 40-70 mbar band at startup

**Symptoms:** Condenser pressure hovering at 200-500 mbar despite running CAR / SJAE. Turbine can't be started because vacuum isn't there.

**Likely causes** (in order):

- No steam flow yet, SJAEs do nothing until bypass or turbine valve is open
- Only CAR running, CAR alone takes you to ~0.85 bar, not 70 mbar
- Circulation pumps off, without lake-water heat exchange, condensation is minimal
- SJAE malfunctioning, backup may be cleaner

**Fix:**

1. Confirm both CAR pumps are running.
   > CAR drops pressure from atmospheric to ~0.85 bar; it's the foundation.

2. Confirm bypass valve is open to about 35-40% (or turbine valve open).
   > SJAE needs steam flow through it to operate. No steam = no ejection.

3. Enable one SJAE at 100%.
   > Don't turn on both, keep the second one as a diagnostic spare.

4. Start condenser circulation pumps at ~10-20%.
   > Lake water through the heat exchanger condenses the steam.

5. If pressure still won't drop after 30 seconds, swap to the other SJAE.
   > The active one may be malfunctioning. The one giving better vacuum is the good one (see [Malfunctions](malfunctions#sjaes)).

6. If still stuck, briefly run BOTH SJAEs together to catch up, then return to one.
   > A heavy initial load sometimes needs both. Don't leave both running long-term.

## Vacuum dropping TOO low (<40 mbar)

**Symptoms:** Condenser pressure approaching or below 40 mbar. Risk of reactor SCRAM and condenser auto-vent.

**Likely causes:**

- Too much circulation flow vs steam flow
- Steam flow dropped suddenly (turbine trip, reactor scram) while circulation pumps still high

**Fix:**

1. Reduce circulation pump speed.
   > Less heat removal = less condensation = pressure climbs back into band.

2. If pressure is still dropping fast, open bypass valve slightly for more steam flow.
   > Adds heat into the condenser to push pressure back up.

3. Disable auto control if it's making it worse.
   > Auto control with no steam flow opens circulation to max. See [Condenser](condenser#operating-notes).

## Vacuum suddenly lost during operation

**Symptoms:** Pressure climbs from ~55 mbar through 70 mbar toward turbine trip.

**Likely causes:**

- Active SJAE malfunctioned
- Circulation pump tripped
- Steam flow suddenly increased (faster than circulation can keep up)
- Air in-leak somewhere

**Fix:**

1. Enable the second SJAE immediately to back up the active one.
   > Buys time while you diagnose.

2. Check that both circulation pumps are still running.
   > If one tripped, restart it or accept reduced capacity.

3. Increase circulation pump speed to match the new steam flow.
   > Vacuum lags behind power changes; you may have to overshoot briefly.

4. If pressure is still climbing, reduce reactor power to cut steam flow.
   > Last resort. Better than losing the turbine on a vacuum trip (>70 mbar).

5. Once stable, switch back to single SJAE.
   > Identify which SJAE was the bad one (the one with worse vacuum is malfunctioning).

## Auto vacuum control opened circulation to maximum

**Symptoms (U2 specifically):** Vacuum dropped to ~0 mbar after enabling auto control with no steam flow. Reactor at risk of SCRAM.

**Cause:** U2 auto controls don't auto-disable. Enabling condenser auto with no steam = it pegs the pumps. See [Condenser](condenser#operating-notes) and [U1 vs U2 Differences](u2-differences).

**Fix:**

1. Disable auto control immediately.
   > Take back manual control.

2. Reduce circulation pump speed to neutral / minimum.
   > Stops further over-condensation.

3. Open bypass valve to get steam flowing.
   > Steam flow back into the condenser pushes vacuum back into band.

4. Re-enable auto only after steam flow is established and vacuum is in band.
   > Auto works fine once it has something to work against.

---

## Polishers, Chemistry & Rupture Disk

Polishers, conductivity, deaerator rupture disk.

## Polisher conductivity rising above 35 µSm/cm

**Symptoms:** Conductivity gauge on the selected polisher climbing past the normal band.

**Likely cause:** Resin exhausted and needs regeneration.

**Fix:**

1. Coordinate with MCR, they need to switch to the other polisher first.
   > Don't bypass a polisher while it's the active one.

2. After MCR confirms, bypass the polisher you're cleaning.
   > Routes condensate around it.

3. Flush water then air (3 minutes each).
   > Empties the polisher.

4. Load fresh resin from a green tank.
   > Tank with green light = ready resin.

5. Run recirc to check conductivity is back to 33-35 µSm/cm.
   > Verify good before returning to service.

6. Disable bypass and tell MCR the polisher is ready.
   > MCR can switch back if they want.

7. Immediately regenerate the dirty tank.
   > 12 minute cycle; start it now so it's ready next time.

```warn
Above 50 µSm/cm conductivity, pumps can trip randomly. Don't run high conductivity for long.
```

## Polisher filter ΔP above 3 bar

**Symptoms:** Filter differential pressure gauge climbing.

**Likely cause:** Filter clogged.

**Fix:**

1. Coordinate with MCR, switch to other polisher.
   > Same as conductivity.

2. Bypass the affected polisher.

3. Change the filter using the maintenance procedure.
   > Follow the in-game prompts.

4. Verify ΔP returns to <2.5 bar before returning to service.
   > Inspector criterion is <2.5 bar (different from the 3 bar trip threshold).

## Both polishers in bypass, pump trips happening

**Symptoms:** FW pumps / RC pumps / Cond pumps tripping randomly with no other apparent cause.

**Likely cause:** Both polishers degraded or bypassed simultaneously. High conductivity damages pumps.

**Fix:**

1. Regenerate one polisher immediately.
   > 9 min flush + 12 min regen = ~20 min to recovery.

2. Reduce reactor power while waiting.
   > Lower flow = lower stress on pumps.

3. Return the regenerated polisher to service ASAP.
   > Single good polisher beats two bad ones.

## Conductivity gauge looks wrong (drifted)

**Symptoms:** Gauge reading doesn't match the conductivity you'd expect.

**Likely cause:** Gauge drift over time. Needs calibration.

**Fix:**

1. Pick an empty beaker from the Conductivity Lab.
   > Found inside the lab.

2. Fill from the polisher's sample tap in the Condenser Hall.
   > Two circular tanks with taps on the side.

3. Install beaker on the conductivity probe.
   > Click onto the holder near the meter.

4. Wait 1-2 minutes for stable reading.
   > Don't read while it's still climbing.

5. Adjust the polisher's conductivity reading to match the measured value.
   > + and − buttons on the polisher panel. Or set to the blue mark (calibration target).

6. If the polisher isn't in use, recirculate water through it to get a reading.
   > Otherwise no flow = no reading.

## Deaerator rupture disk popped (U2)

**Symptoms:** Audible pop. "Rupture disk trouble" on the U2 deaerator monitor screen in the monitoring office. Deaerator pressure dropped, degassing stopped.

**Likely causes:**

- Pressure spiked above ~2 bar (deaerator overfilled too quickly, or feedwater pump pressure too high)
- Pressure transient during a malfunction

**Fix:**

1. Get a new rupture disk from the lockers near the deaerator hall entrance.
   > "New Discs" box, NOT "New Filters".

2. Call U2 MCR. Have them close and tag the deaerator inlet valve.
   > MCR sets inlet to 0, switch to neutral, applies yellow tag.

3. Go behind the U2 deaerator. Find the two valves and bypass pipe.
   > Emergency gas IN (top) and OUT (bottom).

4. Right-click both valves to close them all the way.
   > Each click moves the wheel for several seconds, then stops. Click again until 0%.

5. Click any of the 4 small rods on the rupture disk housing.
   > Rods auto-remove; housing lowers to the ground.

6. Click both small connectors on the top and bottom parts.
   > Loosens the assembly.

7. Press the top part to remove it.
   > If it doesn't come off, you missed a connector, recheck step 6.

8. Click the broken disk to remove it. Click the center to install the new one.
   > Don't drop the broken one yet, you need to dispose of it later.

9. Click the removed top part back on. Click both connectors again.
   > Reassembles the housing.

10. Click the bottom of the housing to lift it back into position.
    > Rods auto-add themselves.

11. Left-click both valves to open them back to 100%.
    > Same wheel mechanics, opposite direction.

12. Verify monitor in the deaerator control office shows no trouble flag.
    > If still flagged, recheck all valves at 100% and all parts in place.

13. Notify U2 MCR to remove the tag.
    > MCR brings inlet back up slowly, cold-starting high inlet steam thermally shocks the new disk.

14. Dispose of the broken disk in the Special Waste room.
    > Right of the stairs leading to TCR.

```warn
If MCR can't remove the tag, double-check every valve is at 100% and every housing part is back in place. The system requires complete reassembly to clear the trouble flag.
```

