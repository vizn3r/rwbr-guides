# Auxiliary & Emergency Systems

RCIC, LPCI, RHR, and Emergency Steam Relief. These are the last-resort cooling systems.

## RCIC (Reactor Core Isolation Cooling)

Steam-driven feedwater turbopump. **Requires no electrical power**, driven purely by reactor steam, so it works during full blackouts. Enabling RCIC trips the turbine. The turbopump reaches up to 20,000 RPM and injects up to 2000 kg/s. When little steam remains, switch to RHR + LPCI.

```u1
**U1 RCIC:** 2 valves, Inlet and Steam Relief. **Auto-activates** if RPV level drops below −4 m. Locks the MCC panel (no pumps, no valves) until level returns above −3.9 m. Inlet valve starts at 75% on activation and draws from the suppression pool.
```

```u2
**U2 RCIC:** 1 valve, Inlet only. **Manual activation only.** Draws from the Condensate Storage Tanks. Keep CSTs above 50% or RCIC has nothing to draw from.
```

```note
If you close the RCIC valve while the pump is running, the pump spins down slowly. It doesn't stop instantly.
```

```nerd
RCIC is the BWR's last line of cooling during station blackout. At Fukushima Daiichi in March 2011, Unit 2's RCIC ran for roughly three days on residual steam after the tsunami took out all AC power, before the pump finally failed. (Unit 1 didn't have RCIC at all. The older BWR-3 design used Isolation Condensers, a passive heat exchanger needing no power, but they ended up unavailable due to procedural and instrumentation reasons after the tsunami.) The RCIC pump being purely steam-driven is what makes black-start cooling possible at all.
```

## LPCI (Low Pressure Coolant Injection)

Part of the RHR system. Large injection capacity. **Activation conditions:** reactor pressure ≤ 3000 kPa AND Safety Bus powered.

```u1
**U1 LPCI:** Auto-activates when RPV level is below −4 m AND steam pressure is low enough. Located on the far-left MCR panel.
```

```u2
**U2 LPCI:** Manual only. CST selection valve picks which tank feeds it. **Pump speed cannot be throttled**, so it will overflow if left on. Watch RPV level closely. Located on the far-right outer panel on the Supervisor Desk.
```

```nerd
The 3000 kPa threshold is the pump's physical head limit. Above that pressure the pump cannot inject against the backpressure. In a real plant, LPCI is part of ECCS and uses an Automatic Depressurization System (ADS) to drop RPV pressure quickly before low-pressure injection begins. The unthrottled U2 LPCI pump reflects this: as RPV pressure drops below 3 MPa, injection flow rises rapidly. Monitor level closely or it overflows.
```

## RHR (Residual Heat Removal) / Shutdown Cooling

Two Shutdown Cooling Pumps for the shutdown phase. Bypass the recirc pumps, recirc pumps not required. Use both during active cooling (decay heat strongest right after shutdown). One pump enough once cool.

**Cold shutdown target: 50 °C.** Disable RHR before any reactor run-up.

Powered by Safety Bus. Requires EDGs if offsite power is lost.

## Emergency Steam Relief

Dumps reactor steam directly into the suppression pool. Use if pressure climbs high enough to risk tripping the turbine or reactor. Auto-disables at 1000 kPa.

```u1
**U1:** Located on the turbine control panel in the MCR.
```

```u2
**U2:** Located between the polisher control panel and the ECCS/RHR.
```

```warn
Steam relief drops RPV level as water leaves the coolant loop. Make sure feedwater flow can keep up.
```

## SCRAM

Drops all rods to 0% in under 20 seconds. Triggered automatically by APRM ≥ 125%, period ≤ 20 s, RPV level ≤ −4 m, condenser vacuum out of range, or manually.

```nerd
"SCRAM" supposedly stood for Safety Control Rod Axe Man. The story goes that a man with an axe stood ready to cut a rope holding a control rod on the first Chicago Pile, letting gravity shut down the reaction. Likely apocryphal; the term probably comes from Volney "Bill" Wilson's shutdown circuitry, but the story stuck.
```
