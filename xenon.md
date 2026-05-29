# Xenon & Iodine Poisoning

Iodine-135 and Xenon-135 are fission products that affect reactor reactivity with a delay. Understanding them is essential for stable operation, especially after large power changes.

## How it works

Iodine-135 is produced directly by fission, in proportion to reactor power. The Iodine-135 indicator is scaled so its concentration percent corresponds to the percent of reactor thermal power. If power is above the iodine concentration, iodine rises. If power is below, iodine falls as it decays into Xenon-135.

Xenon-135 is a very strong neutron absorber. High xenon poisons the reactor, making it harder to reach or sustain criticality. The higher the iodine level, the faster xenon rises.

Xenon-135 decays over time, but it is also destroyed rapidly by high neutron flux at high reactor power.

```nerd
The fission chain producing Xe-135 is: fission → Te-135 (β⁻, 19 s) → I-135 (β⁻, 6.6 h) → Xe-135 (β⁻, 9.2 h) → Cs-135 (half-life 2.3 million years, essentially stable). Xe-135 has a thermal neutron absorption cross-section of about 2.65 million barns, by far the highest of any nuclide. For comparison, boron-10 (used in control rods) is only about 3,840 barns; U-235 fission is about 585 barns. When the reactor is running, neutron flux burns Xe-135 almost as fast as it forms (xenon burnout rate ≈ σ_a × Φ × N_Xe, where Φ is the flux). When you SCRAM, Φ drops to near zero, burnout stops, but the stored I-135 continues decaying into Xe-135 for the next several hours. Xe-135 peaks 6-10 hours after shutdown from full power. That is the "iodine pit" or "xenon pit."

The pit depth determines whether restart is possible at all. If you've been running at 100% for a long time, the equilibrium I-135 inventory is enormous. After SCRAM the Xe-135 builds until it absorbs so many neutrons that even fully-withdrawn rods can't overcome it. You are literally locked out of criticality for 20-40 hours in a real plant. This was the proximate cause of the Chernobyl operators' dilemma on April 25, 1986: they had partially shut down for the safety test, xenon built up, and they withdrew almost all control rods to barely achieve 200 MW (thermal), leaving essentially no shutdown margin.

Real-life half-lives: I-135 is 6.6 hours, Xe-135 is 9.2 hours. The simulator shortens both by several times, but the process is still slow enough to react to.
```

## Operational consequences

| Scenario | What happens | Action |
|----------|--------------|--------|
| Steady power, in equilibrium | Iodine % = Power %, xenon stable | Nothing |
| After power increase | Iodine rises, but xenon burns out faster than it forms | Be ready to *insert* rods to hold steady |
| After power reduction | Iodine decays into xenon, xenon spikes, power drops further on its own | Be ready to *withdraw* rods or raise pump speed |
| After SCRAM from high power | Xenon peaks rapidly from all the iodine produced at full power | May be unable to restart for many hours until xenon decays |

## Positive feedback warning

The xenon coefficient is a **positive feedback** with respect to power changes: lowering power raises xenon, which lowers power further. Raising power burns xenon, which raises power further. Negative void and temperature coefficients stabilize this, but only after some delay.

**Make small adjustments and wait. Then make small adjustments again.**

If you SCRAM at full power, plan on a long wait before restart. Going critical against a poisoned core needs more rod withdrawal than against a clean core, and if you can't withdraw far enough, you simply cannot restart until xenon decays.

```classic
**Classic:** standard xenon behavior. Void coefficient provides meaningful damping. Oscillations die out if you leave the reactor alone.
```

```stable
**Stable:** strong negative feedback means xenon oscillations damp quickly. Easiest xenon behavior to manage; the reactor self-corrects more aggressively.
```

```selfcirc
**Self-Circulating:** no negative void coefficient. Xenon instability is harder to control; the reactor does not self-damp after power changes. Make smaller adjustments and wait longer between them.
```

```rbmk
**RBMK:** positive void coefficient at low power makes xenon transients dangerous. A xenon-driven power drop causes voids to collapse, which raises reactivity, which fights the xenon. The reactor can oscillate violently. The Chernobyl accident was triggered while attempting a test against a xenon-poisoned core. Keep power above ~700 MW thermal; never chase a xenon pit aggressively.
```
