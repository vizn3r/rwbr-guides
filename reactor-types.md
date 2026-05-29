# Reactor Types

The config board (Server Configuration) lets you pick a reactor type. Changing the type only swaps the physics; the visuals of the control room stay the same. **Classic** is the default for both U1 and U2.

## Stable

- Limited natural circulation in the RPV
- High dependence on forced circulation for power control
- Strong resistance to xenon and pressure fluctuations
- **Slower APR response to turbine trips**, which can itself trigger a reactor trip during a turbine trip
- Limited ability to reach high power during recirc pump malfunctions
- Recommended for absolute beginners

## Classic (default)

- Moderate natural circulation
- Balanced forced circulation requirements
- Rapid APR response to turbine trips
- Enhanced resilience to recirc pump malfunctions
- Most accurate representation of real-world BWR physics
- Recommended for standard operations and training

## Self-Circulating

- Negative void coefficient is essentially absent; primary reliance on natural circulation
- Optional forced circulation for fine power adjustments
- Higher operational instability until xenon-iodine equilibrium
- Behaves a lot like a PWR
- Recommended for experienced operators

## RBMK

- Positive void coefficient: voids raise reactivity instead of lowering it
- Inverse recirculation effects on power (forced flow removes voids → lowers reactivity)
- Marginally stable, hard to control manually
- Implemented as a technical demonstration by developer Delfino
- **Successful Turbine Rundown Test on this reactor type unlocks the "Turbine Rundown Success!" badge** (formerly called "Better than Chernobyl")

```nerd
The void coefficient is the change in reactor reactivity per unit change in void fraction (the fraction of steam in the core's water-steam mix). In a BWR, more voids means less water, less neutron moderation, fewer fissions, less power, so a power excursion self-limits. The void coefficient is negative, typically on the order of −50 to −100 pcm per 1% void change at operating conditions (where 1 pcm = 10⁻⁵ Δk/k).

In an RBMK, graphite moderates the neutrons; water's role is primarily neutron absorption. Voiding the water removes that absorption (but doesn't remove moderation), so reactivity climbs instead of falling: a strongly positive void coefficient. At low power, the positive void coefficient dominates the always-negative Doppler fuel-temperature coefficient, making the *overall power coefficient* positive: a small power rise produces more voids, which raises reactivity further, which raises power further. Soviet operating rules forbade sustained operation below about 700 MW thermal, because below that threshold the reactor was intrinsically unstable. The Chernobyl-4 crew violated this rule during the April 1986 test because they were trying to recover from a xenon pit and never got back to stable power.

The Self-Circulating type in the sim removes the negative void coefficient from the BWR design: natural circulation handles moderation without forced flow, and the reactor relies almost entirely on temperature feedback for stability. PWRs behave similarly. Their water is a moderator AND a coolant, but the primary system is pressurized above the boiling point, so void fraction stays near zero and the Doppler temperature coefficient does all the stabilizing work.
```
