# Troubleshooting: Condenser & Vacuum

Common condenser problems and how to fix them. Most condenser issues are about either not enough or too much vacuum.

## Vacuum won't drop into the 40-70 mbar band at startup

**Symptoms:** Condenser pressure hovering at 200-500 mbar despite running CAR / SJAE. Turbine can't be started because vacuum isn't there.

**Likely causes** (in order):

- No steam flow yet. SJAEs do nothing until bypass or turbine valve is open.
- Only CAR running. CAR alone takes you to ~0.85 bar, not 70 mbar.
- Circulation pumps off. Without lake-water heat exchange, condensation is minimal.
- SJAE malfunctioning. Backup may be cleaner.

**Fix:**

1. Confirm both CAR pumps are running.
   > CAR drops pressure from atmospheric to ~0.85 bar; it's the foundation.

2. Confirm bypass valve is open to about 35-40% (or turbine valve open).
   > SJAE needs steam flow through it to operate. No steam = no ejection.

3. Enable one SJAE at 100%.
   > Don't turn on both. Keep the second one as a diagnostic spare.

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
   > Auto control with no steam flow opens circulation to max. See the warn in [Condenser](condenser#operating-notes).

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
