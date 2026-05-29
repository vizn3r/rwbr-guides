# U2 Reactor (CRD, SRM/IPR/Run)

Everything specific to the U2 reactor side: the CRD system, the RWM rod-pull pattern, and SRM/IPR/Run mode transitions.

## CRD system

U2 has an explicit Control Rod Drive system that U1 hides:

- **2 Control Rod Drive Pumps (CRDPs):** drive the hydraulics that move rods.
- **Drive Water Flow valve:** sets drive water pressure.
- **Hydraulic Accumulators:** must be filled before startup or after any SCRAM.

```crit
After every SCRAM, the hydraulic accumulators are empty. Refill them via the CRD panel before attempting restart, or rod movement will fail.
```

These controls apply in realistic startup mode. Simple startup mirrors U1's procedure.

## Three reactor modes

The reactor can be operated in three modes: **SRM**, **IPR**, and **Run**.

| Mode | Range | Notes |
|------|-------|-------|
| SRM | startup, low flux | Lower into core as rods rise. Switch to IPR at half scale. |
| IPR | startup, mid flux | 8 levels in U2. SCRAMs out of range (below 10% or above 90%). |
| Run | normal op | Above 5% APRM only. SCRAMs below 4%. |

```crit
After any SCRAM, reset IPR to level 1 before attempting restart. Otherwise the restart attempt immediately SCRAMs because power starts at 0%.
```

## RWM (Rod Worth Minimizer)

RWM enforces a one-rod-at-a-time pull pattern below 5% APRM:

- Only one rod can be pulled at a time, following a predefined pattern.
- The next rod becomes available when the previous rod reaches 20%.
- When **all** rods are at 20%, the limit becomes 40%, and so on.
- Autocontrol and autobalancer are not available during this phase.

The rod block prevents pulling past the current limit; another rod begins flashing to indicate the next in sequence.

```nerd
RWM exists in real BWRs because they are unstable at low powers: no negative void coefficient yet, no temperature feedback. A wrong rod pull pattern can create a localized hot spot before any signal reaches the operator. The flashing-rod sequence is a coded "approved" startup pattern that has been pre-validated as flux-stable.

The specific hazard being prevented is a "control rod drop accident" (CRDA): if a single rod is fully withdrawn while others are mostly inserted, that rod's fuel bundle sees a large local flux peak because all the neighboring neutrons are now moderated but the only withdrawn path is through that bundle. The most catastrophic historical example was the SL-1 accident in January 1961: a single control rod was withdrawn far beyond its permitted travel during maintenance, producing a prompt-critical reactivity excursion that flashed coolant to steam and destroyed the small experimental reactor, killing all three operators. RWM-style hardware in modern BWRs physically blocks the withdrawal of rods outside the approved low-power startup sequence. The simulator's per-rod 20% pull limit and the flashing-rod sequence model this protection.
```

## SRM management

During startup:

- Lower SRM by a few percent into the core
- As rods rise, lower SRM to stay just above the equivalent rod depth
- Watch for "SRM Block" alarm under RUN in the mode viewer
- Once SRM reaches half scale, switch mode to IPR

SRM management is only required during **realistic startup mode**.

## IPR management

- 8 levels in U2 (vs 6 in U1)
- Step IPR up when the indication nears the blue (90%) line
- Don't jump to a high level too early; below the red (10%) line also SCRAMs
- At level 8, switch to **Run** before reaching the top to avoid IPR-out-of-range SCRAM

## Selecting Run mode

Above 5% APRM, switch from IPR to Run. Run mode is unrestricted between 4% and 100%. Below 4% in Run mode, the reactor SCRAMs.

## Core monitor in U2

Shows **fuel temperatures** per group (where U1 shows powers). Use the same way: keep groups balanced so no group runs much hotter than its neighbors. Vertical-power slice view is available the same way as in U1.

## Selective control

Same physics as U1. See [Selective / Core Groups](#) for the position effects and balancing technique. U2 makes selective pulls faster than U1 since fewer-rods-selected gives quicker movement.
