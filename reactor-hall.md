# Reactor Hall & Refueling

```u1
## U1 refueling

U1 refueling has no physical walk-through. Call U1 maintenance (**0019**) and say **"refuel"**. The reactor must be in cold shutdown first (temp < 50 °C, rods at 0%, pressure < 1000 kPa). The technician handles the rest.
```

```u2
## U2 Reactor Hall

Added in the V2.0.0 update. A multi-story building containing U2's BWR and the Refueling Control Room. This is the only place where U2 can be physically refueled.
```

```limits
[
  {"name":"Required Est. APRM", "val":"<100", "unit":"%"},
  {"name":"Cold shutdown temp", "val":"<50", "unit":"°C"},
  {"name":"Cold shutdown pressure", "val":"<1000", "unit":"kPa"},
  {"name":"Rod insertion", "val":"100", "unit":"%"},
  {"name":"Normal radiation", "val":"5-10", "unit":"µSv/h"},
  {"name":"Shielding removed", "val":"150+", "unit":"µSv/h", "tier":"danger"}
]
```

## Access

Enter via the Floor 3 radiation checkpoint, then through the Reactor Hall door. You'll pass the Condensate Storage Tanks before reaching the hall itself. A stairway around the corner reaches other floors. **Refueling Control Room** is on the highest floor, up a ladder to the left of the stairs.

```crit
The Reactor Hall requires all Personal Protective Equipment. The large square hole near the stairs **will kill you from fall damage**. Blunt Force Trauma badge if you fall in once.
```

## Refueling prerequisites

- Estimated APRM **< 100%** (drift indicator the game tracks)
- Cold shutdown: temp < 50 °C, pressure < 1000 kPa, 100% rod insertion
- Refueling **called through U2 MCR Maintenance** (the line is 0028)

Once those are met, the refueling controls unlock; the monitor displays the full checklist.

## Refueling checklist (high level)

The refueling procedure is a 17-step disassemble → refuel → reassemble cycle:

1. Disassemble Reactor Shield
   > 3 pieces. Use the crane procedure on each.

2. Disassemble Maintenance Plugs
   > 4 plugs. Crane procedure on each.

3. Disassemble Drywell Head
   > Unbolt via the Proximity Prompt first, then crane.

4. Disassemble Pressure Vessel Head
   > Same: unbolt, then crane.

5. Disassemble Steam Dryer
   > Standard crane procedure.

6. Flood the cavity
   > Enable Feedwater > RPV. The screen tells you when to disable.

7. Disassemble Steam Separator
   > Auto-hook crane operation.

8. Disassemble Fuel Plugs
   > Auto-hook crane operation.

9. **Refuel the reactor** (Withdraw / Deposit / Swap on control groups)
   > See "Refueling itself" below.

10. Assemble Fuel Plugs
    > Reverse of step 8.

11. Assemble Steam Separator
    > Reverse of step 7.

12. Drain the cavity
    > Opposite of step 6.

13. Assemble Steam Dryer
    > Reverse of step 5.

14. Assemble Pressure Vessel Head
    > Crane in, then re-bolt.

15. Assemble Drywell Head
    > Crane in, then re-bolt.

16. Assemble Maintenance Plugs
    > Reverse of step 2.

17. Assemble Reactor Shield
    > Reverse of step 1.

Before starting, verify both the refueling unit and the crane have power (panel to the right of the control panel).

---

## Checklist: Crane procedure (used in every disassembly step)

For each component:

1. Set crane mode to **Horizontal** → press Crane Operation Button
   > Horizontal travel moves the crane head over the target.

2. Set crane mode to **Vertical** → press button
   > Vertical moves the hook down to the component.

3. Hook the crane to the component at the crane position (or wait for automatic hooking for steam separator / fuel plugs) → press button
   > The hook latches onto the component.

4. **Horizontal** → press
   > Lifts and moves the component sideways toward its temporary parking spot.

5. **Vertical** → press
   > Lowers the component into the parking position.

6. **Unhook** at the crane position (or automatic) → press
   > Releases the component for reassembly later.

Repeat the cycle once per piece. The Reactor Shield is 3 pieces; Maintenance Plugs are 4.

For the **Drywell Head** and **Pressure Vessel Head**: same flow, but you must unbolt them first via the Proximity Prompt under each.

## Flooding the cavity

Enable the **Feedwater > RPV** switch. The screen tells you when to disable it.

## Refueling itself

Enable Refueling on the front-right of the control panel. To enable auto-mode you must have manually done **2 control groups** first.

For each control group, pick an operation:

| Type | What it does |
|------|--------------|
| **Withdraw** | Removes the group's fuel |
| **Deposit** | Adds new fuel to the group |
| **Swap** | Exchanges fuel between two groups |

---

## Checklist: Per-group refueling cycle

1. Select operation type
   > Withdraw / Deposit / Swap, defines whether you're removing, adding, or exchanging fuel.

2. Mode **Horizontal** → press Refueling Unit Operation Button
   > Positions the refueling unit over the selected control group.

3. Select Control Group → press
   > Specifies which group the unit operates on.

4. Mode **Vertical** → press
   > Lowers the unit to the fuel assembly.

5. Enable Fuel Lock → press
   > Latches the fuel bundle to the unit.

6. Mode **Horizontal** → press
   > Moves the locked bundle to its parking position.

7. Mode **Vertical** → press
   > Drops the bundle into the parking position.

8. Disable Fuel Lock → press
   > Releases the bundle.

9. Mode **Horizontal** → press
   > Returns the unit to the home position for the next cycle.

Repeat 4 times per control group. Deposit is the same sequence in reverse. Swap is Withdraw + Deposit on two groups.

When you're done refueling, disable refueling mode (this requires a vote).

## Reassembly

Same as disassembly but in reverse. Patience.

## Hazards

- Background: **5-10 µSv/h** in the Reactor Hall
- Exposed Spent Fuel Pool or Reactor Cavity during disassembly: **150+ µSv/h**
- The Cherenkov glow in the cavity and spent fuel pool is real (visual feature)
- Don't touch the fuel.
- Don't fall in the shaft.

```nerd
Cherenkov radiation (the blue glow) is real-world physics. It happens when a charged particle moves through a transparent medium (like water) faster than the local speed of light in that medium (which is c/n, where n is the refractive index, so light in water moves at about 0.75c). The fast electrons emitted by fission products break that threshold and emit a photon "shockwave," much like the sonic boom from a supersonic plane. Spent-fuel pools at real reactors really do glow this color.
```
