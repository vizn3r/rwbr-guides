# Troubleshooting: Polishers, Chemistry & Rupture Disk

Polishers, conductivity, deaerator rupture disk.

## Polisher conductivity rising above 35 µSm/cm

**Symptoms:** Conductivity gauge on the selected polisher climbing past the normal band.

**Likely cause:** Resin exhausted and needs regeneration.

**Fix:**

1. Coordinate with MCR. They need to switch to the other polisher first.
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

1. Coordinate with MCR; switch to the other polisher first.
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
   > If it doesn't come off, you missed a connector. Recheck step 6.

8. Click the broken disk to remove it. Click the center to install the new one.
   > Don't drop the broken one yet. You need to dispose of it later.

9. Click the removed top part back on. Click both connectors again.
   > Reassembles the housing.

10. Click the bottom of the housing to lift it back into position.
    > Rods auto-add themselves.

11. Left-click both valves to open them back to 100%.
    > Same wheel mechanics, opposite direction.

12. Verify monitor in the deaerator control office shows no trouble flag.
    > If still flagged, recheck all valves at 100% and all parts in place.

13. Notify U2 MCR to remove the tag.
    > MCR brings inlet back up slowly. Cold-starting with high inlet steam thermally shocks the new disk.

14. Dispose of the broken disk in the Special Waste room.
    > Right of the stairs leading to TCR.

```warn
If MCR can't remove the tag, double-check every valve is at 100% and every housing part is back in place. The system requires complete reassembly to clear the trouble flag.
```
