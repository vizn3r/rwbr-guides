# Phone Numbers & Messaging

Quick lookup for in-game phones and the Plant Messaging System. Most phones have a green phone book next to them; this is the abridged version.

## Telephones

| Number | Room / Function |
|--------|-----------------|
| 0010 | U1 MCR |
| 0019 | U1 Maintenance, say "repair", "leak"/"yes", or "refuel" |
| 0020 | U2 MCR (requires 5000 U1 points / Operator rank) |
| 0021 | U2 TCR (requires 5000 U1 points / Operator rank) |
| 0022 | U2 CMCR / Condenser Control Room |
| 0024 | FWP Control Room |
| 0027 | EDG fuel resupply, say "refuel" |
| 0028 | U2 Maintenance, say "repair" for repairs, also for TCR oil leak checks |
| 0029 | U2 MCR Maintenance, say "refuel" |
| 5682 | Grid Control, say "disconnect" before shutdown |

```note
Pick up the receiver, dial the number, and say the keyword when prompted. For maintenance lines, the keyword tells the technician which task to dispatch (repair, leak check, refuel).
```

## Common scenarios

- **Oil leak in TCR:** trip the turbine, wait for 0 RPM, call **0028** for the oil leak check.
- **EDGs low on fuel:** call **0027** and say "refuel".
- **Refueling needed (U1 or U2):** call the maintenance line (0019 for U1, 0029 for U2 MCR) and say "refuel".
- **Equipment repair (after tagging the faulty device):** call the unit's maintenance line and say "repair". Wait for the technician to affix the red tag.
- **Leak in main cooling circuit:** shut down to cold, call U1 maintenance (0019) and say "leak"/"yes".
- **Pre-planned shutdown:** call **5682** and say "disconnect" before tripping the grid breaker.
- **Inter-room coordination:** dial directly between rooms (e.g., U2 MCR ↔ U2 TCR at 0020/0021).

## CMCR phone

There's a CMCR phone inside the FWP CR for back-and-forth between the FWP operator and the MCR.

```warn
Maintenance calls take time. Don't call for a "repair" before you've tagged the device. The technician needs the yellow tag to know what to look at, and a wrong tag costs you the 100-point repair bonus.
```

## Plant Messaging System (PMS)

A keyboard terminal in each control room and several other rooms. Use it to send short pre-set messages to other rooms without picking up a phone. Fast for routine status pings.

---

## Checklist: PMS, how to send a message

1. Press **PWR** to power on. Wait for initialization.
   > Terminals start dark; PWR boots them up.

2. Click the keyboard. The pre-set word panel pops up.
   > Pre-set messages avoid typing on a virtual keyboard.

3. Scroll to find the message you want, click it.
   > The chosen message goes into the composition area.

4. Click the destination (e.g., "MCR U2").
   > Selects which room receives the message.

5. Click the check mark.
   > Confirms the destination selection.

6. Click **Send** (2-second buzz at the destination) or **Send Urg.** (continuous buzz until acknowledged).
   > Urgent is for things requiring immediate attention.

If you get "Receiving Unit Offline", call them directly to either power their PMS on, or just relay the message verbally.

### Common pre-set messages

**Unit operations:**
- U1/U2 Reactor Scram
- U1/U2 Shut Down Imminent
- New U1/U2 MCR Operator On Duty / Requested
- U1/U2 Offsite Power Restored
- Caution Unit 1/2 Loss of Offsite Power
- U1/U2 Interlock From Other Requested / Sending

**Leak / fault notifications:**
- Leak After Hotwell Suspected
- Leak After Deaerator Suspected
- Rupture disk trouble

**Demand / maintenance:**
- Next Demand Max Load
- Next Demand Min Load
- Prepare For Unit Maintenance Shut Down
- Low Unit Demand For Repairs Required
- Next Cycle Shutdown For Maintenance
- Prepare For Unit Shut Down

**Calls for help:**
- Call U1/U2 MCR ASAP
- Call FWP Maintenance CR ASAP
- Call EDG Bay ASAP
- Call SUPV Office ASAP
- Supervisor Attendance Requested

(Floor 4 / DA Hall / TCR / CMCR all have their own PMS terminals with relevant pre-set lists.)
