# Cooling & Water (MCC)

Manages the closed water loop. Most demanding panel, needs constant attention.

## Water flow path

```
Reactor → Turbine → Hotwell → Condensate pumps → Deaerator → Feedwater pumps → Reactor
```

2 feedwater pumps + 2 condensate pumps. Feedwater pumps: inlet → pump → outlet. Condensate pumps share one valve, single pump handles up to 50% flow; above that, switch on the second.

## Core principle: what goes in must come out

Steady state requires three flows equal: hotwell outflow = deaerator outflow = steam flow. If any drifts, tank levels drift. RPV below −4 m = SCRAM.

```nerd
Flow balance is just mass conservation. Every kg of steam leaving through the turbine eventually comes back as condensate. If feedwater is even 1% off from steam flow long enough, a tank goes out of range. The deaerator is the middle buffer. Real plants use three-element feedwater control (steam flow + feedwater flow + RPV level). The auto panel is one-element only (level), which is why it can't keep up with fast changes.
```

## Setpoints

```limits
[
  {"name":"Hotwell level",         "val":"0",  "unit":"m"},
  {"name":"Deaerator level",       "val":"+2", "unit":"m"},
  {"name":"RPV level",             "val":"+2", "unit":"m"},
  {"name":"SCRAM + RCIC/LPCI",     "val":"−4", "unit":"m", "tier":"danger"},
  {"name":"Fuel melt",             "val":"−8", "unit":"m", "tier":"danger"},
  {"name":"Auto-drain (rad spike)","val":"+5", "unit":"m", "tier":"warn"}
]
```

```crit
Do not let the deaerator drop to −4 or −5 m. It drains the reactor to refill itself.
```

## Diagnosing imbalance

Hotwell rising + deaerator dropping → raise condensate valve. Deaerator rising + RPV dropping → raise feedwater valve.

## Makeup and drain

**Makeup valve:** adds water from CST into hotwell. Used after a steam vent or a leak.

```u1
**Drain valve:** drains the hotwell directly into the CST.
```

```u2
**Dump valve:** does NOT drain hotwell directly. It is a bypass before the deaerator and only works with condensate pumps running. To lower hotwell: open dump valve + raise condenser valve to keep deaerator inflow the same. If dump valve is 100% open, no water reaches the deaerator regardless of condenser pump setting.
```

## Preheaters

Three levers, all three on during operations. Consume some live steam but increase overall thermal efficiency.

## Polishers

```u1
Two small levers on the MCC panel. One must always be on during operations.
```

```u2
Handled from the dedicated Condenser Control Room. See [Polishers / CIX](#).
```

## Condensate Storage Tanks

```u2
CSTs feed RCIC, LPCI, and the makeup valve in U2. Keep both above 50% at all times. Both RCIC and LPCI have a CST selection valve; use either tank or both. Don't overfill. There's no easy way to remove excess water. **Makeup pump:** only use if there is no condenser vacuum; the valve alone is sufficient normally.
```

```limits
[
  {"name":"CST min for emergency (U2)", "val":"50", "unit":"%", "tier":"warn"}
]
```

---

## Auto Cooling

Lets the computer manage the loop while you focus on reactor and turbine. Earns fewer points. Reacts to **levels**, not **flows**, fast power changes throw it off. Slow is better.

Reactor level is the priority. Cannot directly control hotwell (steam flow belongs to the turbine operator).

Gain switch: **faster** when changing power levels, **slower** for stable demand-meeting.

```nerd
The auto cooling loop is a PI controller on water level. Faster gain reacts harder but oscillates more. Slower gain is stable but sluggish. No flow feed-forward: it only sees the level after it has already started drifting.
```

---

## Checklist: Enabling auto cooling

1. Activate **all pumps** on the Cooling Panel.
   > Auto needs every pump available to balance levels.

2. Set all switches to **neutral**.
   > Auto takes control of each switch. All neutral = seven green lights on the auto panel.

3. Set setpoints: Hotwell **0 m**, Deaerator **2 m**, Reactor **2 m**.
   > Low hotwell setpoint stops early outside-water injection.

4. Generate some steam flow before pressing START.
   > Auto reads level trends. Starting at zero steam confuses it.

5. Press **START**.
