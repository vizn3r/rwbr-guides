# Selective / Core Groups

The reactor is divided into **24 groups of 9 control rods each**. Every group can be controlled independently. As you pull rods on the main panel you will see different groups heat up at different rates, partly because each group has a slightly different fuel content, partly because of position effects.

## Core position physics

- **Inside (core) groups heat quicker.** They steal neutrons from neighboring groups.
- **Outside groups heat slower.** They lose neutrons to the outside (some come back via the neutron reflector).
- **Circulation flow boosts reactivity locally.** Flow 1 boosts the upper part of the core, flow 2 the lower part.
- **Warmer groups heat their neighbors.** Cold groups cool their neighbors. Imbalance can compound.

The goal is to balance these differences so all groups operate at similar power levels. Or let the **automatic balancer** do it in U1.

## Selecting groups

You can select any group or set of groups and operate them with the same lever and speed switch as the main panel. You can move selected groups *while* the main panel is also moving rods. Predefined patterns are available for common configurations.

The indicator screen shows the percentage of rods pulled and the percentage of maximum group power.

## Vertical power (v1.4+)

Vertical power output is now simulated. Select a single rod on the diagram plus a level on the vertical display on the left. You get a vertical diagram for the selected rod and a horizontal slice at the chosen level. Colors are relative power compared to the selected rod/slice. Percentages are absolute power relative to the maximum reactor power.

Some parts of the core can heat to **200% of nominal power** under normal conditions. The core cannot be perfectly balanced; some imbalance is unavoidable.

```nerd
The 200% local maximum is realistic. Power distribution in a BWR core has natural cosine-shaped peaks both radially and axially. Designers shape fuel enrichment and burnable absorber loading to flatten this, but local peaking factors of 1.5-2.0 above core average are normal during operation. The "peaking factor" is a key safety parameter in real BWR fuel design.

The key safety metric is the Critical Power Ratio (CPR): the ratio of the bundle power that would cause boiling transition (dryout) to the actual bundle power. BWRs operate in bulk boiling normally; that's fine. But if heat flux gets high enough that the liquid film on the fuel rod surface dries out, heat transfer collapses, rod temperature spikes, and cladding can fail. The Minimum CPR (MCPR) must stay above roughly 1.2-1.3 as a safety margin. This is why the simulator shows some groups running much hotter than others: an unbalanced core has one group near its CPR limit while the others have margin to spare, and pulling more rods in that hot group could push it toward dryout. The autobalancer tries to flatten the distribution, which lowers the peak power and raises the minimum CPR, allowing higher total reactor power safely.
```

```u2
## U2 selective control

Rod controls are concentrated on a single switch: **group** (chosen rods only) or **all** (every rod). Fewer rods selected = faster movement, enabling individual group pulls similar to how a real BWR is started up. U2 is less prone to rod imbalance overall, but a single very hot group can still SCRAM it.

Auto control can move all rods or only a selected group. A common trick: let auto hold total power with all rods while you manually trim a selected group.
```

```warn
Both rods and circulation flow can reach their limits (0% or 100%) and stop responding. No warning when this happens. Watch the readouts.
```
