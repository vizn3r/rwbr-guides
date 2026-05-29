# U2 Normal Operation

Steady-state operation of Unit 2 once startup is complete. Same demand-following logic as U1, but with several U2-specific items to keep an eye on.

## Meeting demand

Same scoring rules as U1: generator output (after site loads) within ±50 MW of demand earns 1 point/second. Automatic controls reduce the rate. *In U2 some other penalties may apply, like a wrongly set up deaerator or water levels outside limits.* See [Points & Earnings](#).

**U2 bonus:** manual TCR operations give an additional **+1 point per 3 seconds**. Meeting site-wide demand gives **+1 extra point per unit every 5 seconds**.

## Routine checks

Same checks as U1, plus:

- **Synchroscope:** stays still near the top while synced. Drift means something is wrong with the grid.
- **Vibration/differential expansion gauges:** vibrations especially. Resonance bands can spike during power changes.
- **Generator cooling air:** open cold valve and (in humid conditions) the warm valve. Above 1000 MW load in humid weather, you may have to lower below demand. See [Turbine Control Room](#).
- **Oil pumps:** lube ~6 bar, hydraulic ~12 bar. Watch hydraulic gauge for the yellow zone; first response is to close the backflow valve toward 70-80%.
- **Lube oil filter ΔP:** 0.3-0.4 bar typical. Above that, swap to the spare filter holder.
- **Polishers:** monitor conductivity. Plan a regeneration if any polisher is heading to bypass.
- **CST levels:** both above 50% at all times. Refill via the external pumps if they drop.

## Demand-following

Same as U1:

1. Set rough reactor power to demand / 110 using recirculation flow.
   > Each 1% APRM produces roughly 10.5-11 MW. Above 30% APRM use recirc, below use rods.

2. Pressure at 7.1 MPa with the turbine valve.
   > Standard operating pressure. The valve also sets generator load.

3. Precise generator load with the turbine valve and precision valve.
   > Fine adjustment closes the gap between output and demand.

4. Reactor power adjustments for slow corrections.
   > Lag in the system means small reactor changes. Don't chase fast.

## When something needs maintenance during operation

- **Lube oil filter clogged** (ΔP > 0.4 bar): switch the lever to the spare filter, replace the dirty one
- **Polisher conductivity above 35 µSm/cm:** plan to take it out of service. Coordinate the active polisher swap with the polisher operator. Above 50 µSm/cm, pumps can trip.
- **Polisher ΔP above 3 bar:** filter is clogged, change it. Above this can also trip pumps.
- **Polisher in bypass:** points penalty applies. Regenerate the resin while still operating with the working polisher.

## U2 demand penalties

- Deaerator temperature outside the 105-112 °C band: points reduced
- Water level outside limits in any tank: points reduced
- Polisher running in bypass: points reduced
- Conductivity / ΔP red on the polisher panel: random pump trips possible
- Humid conditions at high load: lower demand or face cooling failure

## Routine TCR housekeeping

Even with the TCR operator handling the turbine, the MCR should sanity-check the TCR readouts on the analog instrumentation panel. Sealing pressure ~0.25 bar (use leak-off valve mainly post-sync, supply valve at low power). Casing temperature controlled by pressure and the pre-heat valve. Generator temperature managed by hot/cool air valves.

```note
The MCR can call the TCR at 0028 for maintenance and oil-leak checks. See [Phone Numbers](#) for the full list.
```
