# FWP Bay (U2)

The FWP Bay (Feedwater Pump Bay) is located in the FWP Pit, which also houses the condenser hall. **Access requires 5000 points in U1.**

## Layout

The FWP Control Room has 4 panels:

1. **Panel 1:** Feedwater Pump 1
2. **Panel 2:** Feedwater Pump 2
3. **Panel 3:** Annunciator board, water level gauges and graph, automatic control, radiation warnings, telephone
4. **Panel 4:** Plant status (general)

To the left of the panels: the Phone Book, Status Screen, and Unit 2 Output Logs.

## Per-pump controls

Each feedwater panel has 3 levers and 2 valves:

- **Levers:**
  - Lube pump
  - Service Water Inlet
  - Oil preheater
- **Valves:**
  - Lube oil coolant
  - Motor coolant

### What they do

- **Oil preheater:** controls oil temperatures in the pump.
- **Lube pump → Lube oil coolant valve:** enabling the lube pump lets you use the coolant valve to cool the oil.
- **Service water inlet → Motor coolant valve:** enabling the service water inlet lets you use the motor coolant valve to cool the motor.

## Motor temperature limits

```limits
[
  {"name":"Below 60 °C", "val":"penalty", "unit":"", "tier":"warn"},
  {"name":"Above 105 °C", "val":"trip", "unit":"", "tier":"danger"}
]
```

- Below 60 °C: point penalty.
- Above 105 °C: the pump trips.

## Phones

- **FWP CR phone number:** 0024
- **CMCR phone** inside the FWP CR

## When operation is required

If U2 is not running, you do not need to use the valves. While U2 is running, the FWP operator's job is to keep oil and motor temperatures inside the working bands.

## Points

Manual FWP control earns **0.1 points/second**.
