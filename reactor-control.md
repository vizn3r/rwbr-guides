# Reactor Control

Control rods are the primary control. Rods Control lever (U1) or Rods Movement switch (U2), Group Control (only selected rods move) or All Control (all move equally). Speed: S / M / F. In Group Control, fewer rods selected = faster movement.

## Reactor period

Time in seconds for power to multiply by *e* (~2.718). Infinite period = stable. Negative period = power dropping.

```limits
[
  {"name":"High power target", "val":"100-500", "unit":"s"},
  {"name":"Period alarm",  "val":"30", "unit":"s", "tier":"warn"},
  {"name":"Period SCRAM",  "val":"20", "unit":"s", "tier":"danger"}
]
```

Pulling rods too fast at low power produces dangerously short periods. Slow down or stop withdrawal if period drops below 100 s.

```nerd
P(t) = P0 · exp(t / T). A 20-second period doubles power in about 14 seconds. A 100-second period doubles in about 69 seconds. Period shortens as you add more positive reactivity. Pull rods slowly.
```

## Neutron detectors: SRM, IPR, APRM

- **SRM:** counts neutrons at very low power before criticality. Not a power reading.
- **IPR:** bridge between source and power range. Multiple levels stepped through as power rises.
- **APRM:** main power meter from ~1% to 125%.

```limits
[
  {"name":"APRM normal", "val":"100", "unit":"%"},
  {"name":"APRM alarm",  "val":"120", "unit":"%", "tier":"warn"},
  {"name":"APRM SCRAM",  "val":"125", "unit":"%", "tier":"danger"}
]
```

```u1
**SRM/IPR:** the SRM→IPR detector transition is automatic. Manually step through **6 IPR levels** as power climbs. Increment when the indicator reaches around 75% (three-quarters of the scale).
```

```u2
**SRM/IPR/Run:** three reactor modes with fully manual transitions.

| Mode | Range | Notes |
|------|-------|-------|
| SRM | startup, low flux | Lower into core as rods rise. Switch to IPR at half scale. |
| IPR | startup, mid flux | 8 levels. SCRAMs if out of range (below 10% or above 90%). |
| Run | normal op | Above 5% APRM only. SCRAMs below 4%. |
```

```crit
U2: After any SCRAM, reset IPR to level 1 before attempting restart. Otherwise it immediately SCRAMs because power starts at 0%.
```

## Core monitor

```u1
Shows percentage of rods pulled and percentage of maximum group power per group.
```

```u2
Shows **fuel temperatures** per group instead of power percentages. Keep groups balanced: no group should run much hotter than its neighbors. Uneven fuel temperature indicates a rod imbalance or recirculation flow asymmetry that must be corrected.
```

## CRD system

```u2
U2 has an explicit Control Rod Drive system:

- **2 Control Rod Drive Pumps (CRDPs):** drive the hydraulics that move rods
- **Drive Water Flow valve:** sets drive water pressure
- **Hydraulic Accumulators:** must be filled before startup or after any SCRAM

Applies in realistic mode only. In simple startup mode, rods can be pulled freely without the hydraulic accumulator requirement.
```

```crit
U2: After every SCRAM the hydraulic accumulators are empty. Refill via the CRD panel before attempting restart or rod movement will fail.
```

## RWM (Rod Worth Minimizer)

```u2
Enforces a one-rod-at-a-time pull pattern below 5% APRM:

- Only one rod can be pulled at a time, following a predefined pattern
- Next rod available when previous rod reaches 20%
- When all rods are at 20% the limit becomes 40%, then 60%, then 80%
- Autocontrol and autobalancer not available during this phase

The flashing rod on the diagram shows which one to pull next. Rod block prevents pulling past the current limit.
```

```nerd
RWM exists because BWRs are unstable at low powers. No negative void coefficient yet, no temperature feedback. A wrong pull pattern creates a localized hot spot before any signal reaches the operator. The specific hazard is a control rod drop accident (CRDA): one fully-withdrawn rod while others are inserted creates a large local flux peak in that bundle. The most catastrophic example was the SL-1 accident in January 1961, where a single rod withdrawn far beyond its permitted travel produced a prompt-critical excursion that destroyed the reactor and killed all three operators. RWM hardware in modern BWRs physically blocks withdrawal outside the approved sequence. The 20% pull limit and flashing-rod sequence in the sim model this.
```

## IPR management

```u2
- Step IPR up when indication nears the **blue 90% line**
- Don't jump ahead too early; below the red 10% line also SCRAMs
- At level 8, switch to **Run** before reaching the top
- SRM management only in realistic startup: lower SRM to stay just above the equivalent rod depth; switch to IPR when SRM hits half scale
```

## Switch from rods to recirculation at 20-30%

Once thermal power reaches ~20-30%, stop pulling rods and shift to recirculation flows. More precise, safer, loss of power kills circulation and power drops automatically. Don't touch rods again unless in an emergency.

```classic
**Classic (default):** standard BWR with moderate natural circulation. Both rods and forced recirc are effective. APR responds quickly to turbine trips. Most accurate representation of real BWR physics.
```

```stable
**Stable:** no natural circulation, so recirc pumps are essential to reach high power. Rods alone will not get you there. APR response to turbine trips is slower, and a trip can cascade into a reactor trip if recirc is also affected. Heavier pump dependence than Classic.
```

```selfcirc
**Self-Circulating:** no negative void coefficient. Natural circulation moderates without forced flow. Recirc has minimal power effect, only useful for fine adjustments. Relies on the Doppler temperature coefficient alone for stability, making xenon transients harder to damp.
```

```rbmk
**RBMK:** positive void coefficient, voids *raise* reactivity instead of lowering it. Recirc has the **inverse** effect: more flow removes voids and *lowers* power. Never use recirc for power raises. Unstable at low power, do not operate below ~700 MW thermal. Hard to hold steady manually.
```

```nerd
Below ~30% APRM the void fraction is too low for recirc flow to give meaningful reactivity feedback. Rods are the only useful control. Above 30%, boiling is heavy enough that adjusting flow either pushes steam out (lowering reactivity) or fills water back (raising reactivity). Void coefficient: on the order of −50 to −100 pcm per 1% change in void fraction. Higher recirc flow → lower void fraction → more moderation → more power. Loss of recirc pumps → void fraction rises → reactivity drops automatically. This passive feedback was a key BWR safety argument.
```

## Selective / Core Groups

The reactor is divided into **24 groups of 9 control rods each**. Groups heat at different rates, slightly different fuel content plus position effects.

- **Inside (core) groups** heat quicker, steal neutrons from neighbors
- **Outside groups** heat slower, lose neutrons to the outside
- **Circulation flow** boosts reactivity locally (flow 1 = upper core, flow 2 = lower core)
- **Warmer groups heat neighbors; cold groups cool them**, imbalance compounds

You can select any group or set of groups and move them with the same lever and speed switch as the main panel, even while the main panel is also moving rods. Use the autobalancer (U1) or do it manually.

Vertical power: select a single rod + a vertical level → shows power distribution along that rod's axis. Some spots hit **200% of nominal**, unavoidable, core can never be perfectly flat.

Both U1 and U2 support **group** (chosen rods only) or **all** (every rod equally). Fewer rods selected = faster movement.

```u2
In U2, auto control can hold total power with all rods while you manually trim a selected group simultaneously.
```

```warn
Both rods and circulation flow can hit their limits (0% or 100%) and stop responding. No warning, watch the readouts.
```

```nerd
The 200% local maximum is realistic. Power distribution in a BWR core has natural cosine-shaped peaks radially and axially. The key safety metric is the Critical Power Ratio (CPR): ratio of bundle power that would cause boiling transition (dryout) to actual bundle power. BWRs operate in bulk boiling normally, but if heat flux gets high enough that the liquid film on the fuel rod dries out, heat transfer collapses and cladding fails. Minimum CPR must stay above ~1.2-1.3. The autobalancer flattens the distribution, lowering peak power and raising the minimum CPR, allowing higher total reactor power safely.
```

---

## Checklist: Recirculation pump start order

1. Open the inlet valve.
   > Suction-side water before the pump spins, otherwise it cavitates.

2. Start the pump.
   > Builds pressure on the discharge side.

3. Open the outlet valve.
   > Releases flow into the system once the pump is at speed.

Reverse on shutdown: outlet → pump → inlet.

Recirculation pump optimum: **28%**. Maximum: **30%**, above this, cavitation begins.
