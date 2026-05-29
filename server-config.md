# Server Config & Reactor Types

## Server Configuration (SC Board)

A monitor in U1 or U2 MCR. **Requires the Server Configuration gamepass.**

### Functions
- Start or end any event (Maintenance, LOOP, Reactor Safety Test)
- Enable or disable random malfunctions server-wide
- Enable or disable random events server-wide
- Change the reactor type

### Etiquette

```warn
Don't use the SC Board on public servers without majority player approval. Changing reactor type or triggering events without consent will get you kicked.
```

**Senior Operators+** can disable auto controls server-wide, useful for training or max-points contests.

Some Demand Manager actions require events AND malfunctions ON in U2 SC, both reactors running, and ≥5 players. The RST event can be canceled without the gamepass via RCIC, startup transformer, or re-engaging Rolldown Main BUS Protection.

---

## Reactor Types

Changing the reactor type swaps only the physics, visuals stay the same. **Classic** is the default.

| Type | When to use |
|------|-------------|
| **Stable** | Absolute beginners. Note: slower APR response can compound a turbine trip into a reactor trip. |
| **Classic** | Default. Most accurate real-world BWR reference. |
| **Self-Circulating** | Experienced operators. Practice xenon-instability handling. Behaves like a PWR. |
| **RBMK** | Want the "Turbine Rundown Success!" badge, or want to experience a positive void coefficient firsthand. Don't pick on a busy public server. |

### Stable
- Limited natural circulation; high forced-circulation dependence
- Strong xenon/pressure resistance
- Slower APR response to turbine trips

### Classic
- Moderate natural circulation; balanced forced circulation
- Rapid APR response; resilient to recirc pump malfunctions
- Most realistic BWR model

### Self-Circulating
- Negative void coefficient essentially absent, relies on natural circulation
- Higher operational instability until xenon equilibrium
- Forced circulation optional, for fine adjustments

### RBMK
- Positive void coefficient, voids raise reactivity instead of lowering it
- Inverse recirculation effects (forced flow removes voids → lowers reactivity)
- Marginally stable; hard to control manually
- Successful Turbine Rundown Test on RBMK unlocks **"Turbine Rundown Success!"** badge

```nerd
The void coefficient is the change in reactor reactivity per unit change in void fraction. In a BWR, more voids → less moderation → less power, self-limiting. Void coefficient on the order of −50 to −100 pcm per 1% void change.

In an RBMK, graphite moderates the neutrons; water absorbs them. Voiding water removes absorption but not moderation, so reactivity climbs. At low power, the positive void coefficient dominates the always-negative Doppler coefficient, making the overall power coefficient positive: power rise → more voids → more reactivity → more power. Soviet rules forbade operation below ~700 MW thermal. The Chernobyl-4 crew violated this while trying to recover from a xenon pit.

Self-Circulating removes the negative void coefficient: the reactor relies almost entirely on temperature feedback. PWRs behave similarly. Pressurized above boiling point, void fraction near zero, Doppler does all the stabilizing work.
```
