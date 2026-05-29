# Troubleshooting: Reactor

Rod control, IPR/SRM, criticality, period, and xenon problems.

## Reactor won't go critical / power won't rise

**Symptoms:** Pulling rods, but APRM stays at zero. SRM not climbing.

**Likely causes:**

- Xenon poisoning from a recent SCRAM at high power
- Rods not pulled far enough yet, patience
- SRM detector not lowered into core (U2 realistic mode)

**Fix:**

1. Check Xe-135 level. If high (>20% with no power), you're in the xenon pit.
   > See [Xenon & Iodine](xenon#operational-consequences). Wait for xenon to decay, could be hours.

2. Verify SRM detector is lowered to just above rod equivalent depth (U2 realistic).
   > SRM has to be in the active flux region to read anything.

3. Verify recirculation pumps are at 28%.
   > Without circulation, neutrons don't moderate well.

4. Pull rods further, slowly, watching the period meter.
   > Don't chase, small steps until SRM responds.

## SCRAM on restart attempt (U2)

**Symptoms:** Just restarted the reactor and it immediately SCRAMs.

**Likely cause:** IPR mode left at high level from before the previous SCRAM. With APRM at 0%, IPR shows out-of-range → instant SCRAM.

**Fix:**

1. Reset IPR mode to level 1 on the reactor mode panel.
   > Mandatory after any SCRAM.

2. Verify reactor mode is set to SRM (not IPR or Run).
   > Run mode SCRAMs below 4%, which is anywhere at startup.

3. Try restart.
   > Should now climb normally.

## Period too short / period alarm

**Symptoms:** Period alarm at 30s. Risk of SCRAM at 20s.

**Likely cause:** Pulling rods too fast at low power.

**Fix:**

1. Stop pulling rods immediately.
   > Period responds within seconds.

2. Wait for the period to lengthen back above 100s.
   > Negative feedback (Doppler) will catch up.

3. If period continues shortening, insert rods slightly.
   > Reverses the reactivity addition.

4. Resume pulling much more slowly.
   > S (slow) speed below 10% APRM.

## Can't pull rod past 20% (U2 realistic mode)

**Symptoms:** Rod block prevents withdrawal beyond 20%.

**Likely cause:** RWM (Rod Worth Minimizer) is enforcing the one-at-a-time pull pattern.

**Fix:**

1. Find the flashing rod on the diagram.
   > RWM tells you which one to pull next.

2. Select and pull that rod to 20%.
   > Once at 20%, next rod begins flashing.

3. Continue until ALL rods are at 20%, then the limit becomes 40%.
   > Then 60%, then 80%, then 100%, in the same pattern.

4. Above 5% APRM, switch reactor mode to Run.
   > RWM only applies in SRM/IPR. Run mode removes the limit.

## Power oscillating / hard to hold steady

**Symptoms:** APRM swinging up and down without operator input.

**Likely causes:**

- Xenon transient after recent power change
- DWO (density wave oscillations), outside the P-F operating corridor
- Recirculation flow at limit

**Fix:**

1. Check Iodine vs APRM. If iodine is climbing into APRM, you're in xenon burnout.
   > Be ready to insert rods or reduce recirc as xenon decays.

2. Verify you're inside the Power-to-Flow corridor (back wall of U2 MCR).
   > High power + low flow = forbidden region with density wave oscillations.

3. If recirc is pegged at minimum or maximum, you've lost flow authority.
   > Move to rod control for further adjustments.

4. Make small adjustments and wait. Big adjustments make oscillation worse.
   > Wait 30-60 seconds between any reactor power changes.

## IPR SCRAM during startup

**Symptoms:** Reactor SCRAMs while climbing through IPR levels.

**Likely cause:** Indicator hit the blue (90%) line at the current IPR level without stepping up first. OR jumped to a high IPR level before power was high enough (below 10% red line).

**Fix:**

1. Reset IPR to level 1.
   > Mandatory after the SCRAM.

2. Restart the reactor critical sequence.

3. Watch the IPR indication carefully, step up before it reaches the blue line.
   > Stepping up too late = SCRAM at top. Stepping up too early = SCRAM at bottom of next level.

4. At level 8 with APRM >5%, switch to Run mode immediately.
   > Don't let level 8 peg out.

## Group out of balance (one group much hotter than others)

**Symptoms:** Core monitor shows one group at much higher % power (or fuel temp on U2) than its neighbors.

**Likely causes:**

- Recirculation flow imbalance pushing more flow through that section
- Asymmetric rod position
- Fuel content variation

**Fix:**

1. Enable autobalancer (U1) at Fast speed.
   > Auto-balancer trims rod positions to flatten the distribution.

2. Or manually pull rods in the colder groups using selective control.
   > See [Reactor Control](reactor-control#selective-core-groups).

3. Balance the two recirculation pump flows.
   > Flow 1 = upper core, Flow 2 = lower core.

4. Don't let one group climb to ~200% local power without intervention.
   > That's the CPR safety limit territory.
