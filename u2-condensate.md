# Condensate Storage (U2)

The Condensate Storage Tanks (CSTs) feed U2's emergency systems and the makeup valve. U2 uses CSTs much more heavily than U1.

```limits
[
  {"name":"Min for emergency use", "val":"50", "unit":"%", "tier":"warn"},
  {"name":"Recommended", "val":">5", "unit":"m"}
]
```

## Filling the CSTs

CSTs can be filled from an external source via simple pumps.

```crit
Do not switch off the startup transformer while filling. The makeup pump consumes a significant amount of power.
```

## Why both tanks

Both RCIC and LPCI have a CST selection valve in U2; you can run them on either tank or both. Keep both above 50% so you always have a backup during an emergency. Don't overfill either. There's no easy way to remove excess water from the system.

## Makeup valve

Fills the hotwell from the CST. Used after a steam vent or a leak when the system has lost water. Adds water to the hotwell, so be ready to increase condensate pump flow to push it into the deaerator.

There is also a **makeup pump** separate from the makeup valve. Don't use it unless there is no vacuum in the condenser. The valve alone is sufficient under normal conditions.

## Dump valve

The dump valve removes excess water from the system. **U2's dump valve works differently from U1's:**

- In U1, the dump valve drains the hotwell directly into the CST.
- **In U2, the dump valve is a bypass before the deaerator.** It uses the condenser pump output. If no water flows out of the hotwell, no water gets dumped. If the dump valve is 100% open, no water reaches the deaerator regardless of the condenser pump setting.

### Using the U2 dump valve

To **lower hotwell level** while keeping the deaerator stable:

1. Open the dump valve slightly.
2. Raise the condenser valve to compensate so deaerator inflow stays the same.

To **lower reactor level**:

1. Open the dump valve.
2. Reduce feedwater flow to keep the deaerator at its level.

## Auto cooling and CST

Automatic cooling control uses the makeup and dump valves to maintain setpoints. You still choose which CST tank is used via the selection valves.

```note
The condensate panel ties together the MCC, the emergency systems, and the U2-specific dump-valve behavior. If hotwell or deaerator levels are drifting in an unusual direction, the dump valve is often the culprit.
```
