# Automatic Cooling Control

Lets the computer manage the water loop while you focus on the reactor and turbine. Earns fewer points than manual. Useful for solo play or when short-handed.

## How it behaves

- Reactor level is the priority. The computer adjusts deaerator level to match.
- **Cannot directly control hotwell level** (steam flow belongs to the turbine operator). Once flows balance, it uses makeup/drain valves to nudge hotwell toward setpoint
- Reacts to **levels**, not **flows**, so fast power changes throw it off. Slow is better.

## Suggested setpoints

- Hotwell: **0 m** (low setpoint stops early external water injection)
- Deaerator: **2 m**
- Reactor: **2 m**

## Gain switch

A switch on the panel adjusts how aggressively the controller reacts. Use **faster** gain when changing power levels; **slower** for stable demand-meeting.

```nerd
The auto cooling loop is a PI controller on water level. Faster gain reacts harder but oscillates more. Slower gain is stable but sluggish. There is no flow feed-forward: it only sees the level after it has already started drifting. Real plants use three-element feedwater control (steam flow + feedwater flow + RPV level) to anticipate changes before levels drift. The simulator's auto panel is essentially one-element only.
```

---

## Checklist: Enabling auto cooling

1. Activate **all pumps** on the Cooling Panel.
   > Auto needs every pump available to balance levels.

2. Set all switches to **neutral**.
   > Auto must take control of each switch. All neutral = seven green lights on the auto panel.

3. Set setpoints: Hotwell **0 m**, Deaerator **2 m**, Reactor **2 m**.
   > Low hotwell setpoint stops the computer from injecting outside water too early.

4. Generate some steam flow before pressing START.
   > Auto reads level trends. Starting with zero steam flow confuses it.

5. Press **START**.
   > Auto now controls the water loop.
