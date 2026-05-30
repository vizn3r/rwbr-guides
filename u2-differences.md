# Unit 1 vs Unit 2 Differences

Unit 2 runs the same reactor model as Unit 1, so the underlying operations are similar. U2 is still under development and is more realistic and more demanding. U1 MCR was built in 1963; U2 MCR was built in 1983 but never upgraded. Its instruments are intentionally less readable.

| Area | U1 | U2 |
|------|----|----|
| Instruments | Digital displays | Analog gauges and dials, harder to read but more diagnostic |
| Rod control | Single lever, Group or All | Rods Movement switch with Group/All. Fewer rods selected = faster movement |
| Startup modes | Pull rods freely | SRM / IPR / Run. RWM enforces a one-rod-at-a-time pull pattern below 5% APRM |
| IPR levels | 6 | 8 |
| Core monitor | Group powers (%) | Fuel temperatures per group |
| Turbine control | Single panel | Dedicated [Turbine Control Room](u2-tcr) with a separate operator |
| Synchronization | Breaker 52G1 | Synchroscope alignment required for everyone, plus a precision valve |
| Polishers | Two small levers | Full polisher control room with regeneration, conductivity lab, and the [FWP Bay](u2-fwp) |
| CRD system | Implicit | [2 CRDPs + Drive Water Flow + Hydraulic Accumulators](reactor-control#crd-system) that must be filled before startup or after a SCRAM |
| Emergency systems | Far-left MCR panel | On the Supervisor Desk. Draw from [Condensate Storage](mcc#condensate-storage-tanks) tanks |
| RCIC valves | 2 (Steam Relief + Inlet) | 1 (Inlet only) |
| LPCI | Auto-activates at -4 m + low pressure | Manual only. CST selection valve. Pump speed cannot be throttled, can overflow |
| Deaerator | No rupture disk | Breakable rupture disk that requires manual replacement |
| Bus protection | Always on | Main Bus Breaker Protection can be disabled (Chernobyl-style safety test) |
| Fuel melt | Local damage | Server shuts down for everyone |
| Cooling control | One drain valve, drains hotwell directly | Two selectable CST tanks. Dump valve bypasses the deaerator via the condenser pump |

```warn
Many U2 automatic systems can be enabled at any time and won't auto-disable. Enabling condenser auto control with no steam flow opens flow to maximum and causes severe under-pressure. Always check that the auto system makes sense for the current regime.
```

## Service / Instrument Air System (S/IAS)

Work in progress. A mechanical worker in the U2 MCR is "fixing" the S/IAS panel; functions have been temporarily replaced by an outside air generator.
