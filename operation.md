# Normal Operation

Steady-state operation once startup is complete. Same demand-following logic on both units.

## Meeting demand

Generator output (after site loads) must be within **±50 MW** of demand.

- Full manual: **1 point/sec** per unit
- Each auto control enabled: +1 second delay per point cycle
- See [Points & Earnings](#) for the full breakdown

## Demand-following

```limits
[
  {"name":"50% APRM",  "val":"~525", "unit":"MW"},
  {"name":"90% APRM",  "val":"~1000","unit":"MW"},
  {"name":"100% APRM", "val":"~1200","unit":"MW"}
]
```

1. Set rough reactor power so output ≈ demand.
   > ~10.5-11 MW per 1% APRM. Use recirculation above 30%, rods below.

2. Hold pressure at **7.1 MPa** with the turbine valve.
   > The valve also sets generator load.

3. Set precise demand with the turbine valve.
   > Match generator output (minus site loads) to demand.

4. Use small reactor-power adjustments for slow corrections.
   > Lag in the system means small changes, don't chase fast.

## Monitoring

Glance every few seconds at: APRM, period (near infinity at steady state), RPV level (target +2 m), main steam pressure (7100 kPa), generator load vs demand, condenser vacuum (40-70 mbar), deaerator temp (108 °C) and pressure (1.1-1.6 bar), engineer panel condition %.

```warn
If the engineer panel drops below 100%, something is degrading. Glance at it routinely. See [Malfunctions](#) for the diagnostic procedure.
```

## Xenon adjustments

After any power change, expect drift:
- **Power increased:** power keeps trying to rise as xenon burns. Be ready to insert rods or lower flow.
- **Power decreased:** power keeps trying to drop as iodine decays into xenon. Be ready to withdraw or raise flow.
- To **burn off** built-up xenon: raise APRM to 75-80% temporarily.

```u1
## U1 specific

No additional unit-specific notes for steady-state U1. Monitor engineer panel, condenser vacuum, and deaerator as usual.
```

```u2
## U2 specific

Additional checks every few minutes:

- **Synchroscope:** still near the top while synced. Drift = grid issue.
- **Vibration gauges:** watch during any power change.
- **Generator cooling:** cold valve 100%, warm valve ≥41% in humid conditions. Above 1000 MW in humidity you may have to drop load.
- **Oil system (TCR):** lube ~6 bar, hydraulic ~12 bar. Yellow zone → close backflow to 70-80% first.
- **Lube oil filter ΔP:** 0.3-0.4 bar normal. Above that, swap to spare.
- **Polishers:** monitor conductivity. Plan regeneration if heading toward bypass.
- **CSTs:** both above 50% always. Refill from external pumps if dropping.

### U2 point bonuses
- Manual TCR: **+1 point per 3 sec**
- Manual FWP: **+0.1 pts/sec**
- Meeting whole-site demand: **+1 extra point per unit every 5 sec**

### U2 demand penalties
- Deaerator temp outside 105-112 °C band: reduced points
- Water level outside limits in any tank: reduced points
- Polisher on bypass: reduced points
- Bypass valve open during islanding: reduced points
```

## Maintenance window

If average condition drops below ~80%, the plant goes down for maintenance. Accept it, **500 points** and time to repair everything.
