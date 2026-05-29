# U1 Normal Operation

Steady-state operation of Unit 1 once startup is complete and the reactor is online.

## Meeting demand

Site demand is shown on the supervisor desk and the main monitors. Your job is to keep generator output (after subtracting site power use) within **±50 MW** of demand.

- 1 second within band = 1 point.
- Auto systems reduce the rate (1 point per 2/3/4 seconds depending on how many are enabled).
- See [Points & Earnings](#) for the full multiplier table.

## Demand-following procedure

Rough output mapping (per U1 MCR wiki):

| APRM | ≈ Output |
|------|----------|
| 50% | 525 MW |
| 90% | 1000 MW |
| 100% | 1200 MW |

Plan as **~10.5-11 MW per 1% APRM**. The procedure is:

1. Set rough reactor power so output ≈ demand.
   > 525 MW demand → ~50% APRM. Use recirculation flow above 30% APRM, rods below. Above 30%, switch reactor's APRM mode to RECIRC.

2. Hold pressure at 7.1 MPa with the turbine valve.
   > The valve sets generator load while the governor holds RPM.

3. Set the precise demand with the turbine valve.
   > Match generator output to demand (including site loads).

4. Use small reactor-power adjustments for the slow corrections.
   > If load drops, raise power. If load rises, reduce power. There's lag, so don't chase fast.

The ideal steady-state: power sent to network matches demand, with reactor period approaching infinity.

```warn
If a "recirc pumps out of range" alarm starts beeping, switch back to **rods mode** for further APRM increases. Pumps have hit their limit.
```

```crit
Never run above 110% APRM for extended periods. The main transformer overloads and trips the reactor. Never attempt to generate >1600 MW; same outcome, hard trip.
```

## Monitoring

Glance every few seconds at:

- APRM (% reactor power)
- Period (should be near infinity in steady state)
- RPV level (target around 2 m, never below -4)
- Main steam pressure (target 7100 kPa)
- Generator load vs demand
- Condenser vacuum (40-70 mbar)
- Deaerator temp (108 °C) and pressure (1.1-1.6 bar)
- Engineer panel for average system condition (drops below 100% mean malfunctions)

```note
The engineer panel is the only indicator that a malfunction is brewing. Glance at it routinely. Below 100% means something is degrading. See [Malfunctions](#) for the diagnostic procedure.
```

## Xenon adjustments

After any power change, expect drift over the following hour:

- Increased power: power keeps trying to rise as xenon burns out. Be ready to insert rods or lower flow.
- Decreased power: power keeps trying to drop as iodine decays into xenon. Be ready to withdraw rods or raise flow.

To deliberately **burn off** built-up xenon: raise APRM to **75-80%** for a while. High flux destroys Xe-135 faster than it forms.

To deliberately **suppress** further xenon buildup: lower APRM below **20%** during off-peak hours so iodine decays slowly.

See [Xenon & Iodine](#) for the full picture.

## Maintenance window

If average condition drops below ~80%, the plant goes down for maintenance. **500 points** for accepting the maintenance call. Repair everything outstanding during the window, then restart.

## When something goes wrong

The plant won't tell you. The first symptom of a malfunction is usually a flow that's off, a temperature that's odd, or the engineer panel below 100%. Diagnose by comparison. See [Malfunctions](#).
