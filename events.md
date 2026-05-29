# Events

Events have a chance to trigger at the end of every demand cycle. They can be disabled in the [Server Configuration](#) panel, and can also be manually triggered from there. There are three event types.

```note
All event objectives finish at reactor temperature **below 50 °C** with **control rods at 0%**. Plan cool-down with that in mind.
```

## 1. Shutdown for Maintenance

Triggers automatically when overall system condition drops below **80%**, or by the Demand Manager schedule (Supervisor+).

**Objectives:**
- Lower reactor temperature below 50 °C
- Control rods at 0%

Reward: **500 points**.

## 2. Offsite Power Blackout (LOOP)

The offsite power connection is lost. Turbine desynchronizes. **If turbine load > 100 MW it trips outright.**

### Power impact during the event
- **Bus A & Bus B:** lose power unless powered by the turbine generator (islanding)
- **Safety Bus (S):** stays powered via EDG
- **Emergency Bus (E):** stays powered via battery
- **Water level:** maintained via RCIC or LPCI

### A: Surprise Offsite Blackout
No warning. Immediate response required.

- If you can island, do so. Requires being prepared in advance.
- Otherwise SCRAM and shut down: reactor temp below 50 °C, rods 0%.

### B: Announced Offsite Blackout
Operators get **3-10 minutes** of warning to prepare for islanding. If you fail to engage islanding in time, the turbine trips and you must shut down.

Reward: **650 points** (minus what was earned during islanding).

```warn
Network demand points stop during islanding. Site demand points and bonuses continue.
```

## 3. Reactor Safety Test (U2 only)

A prompt appears on the middle monitor with a checklist. The objective is to perform the Chernobyl-style rundown test successfully.

```limits
[
  {"name":"Cool-down target", "val":"<50", "unit":"°C"},
  {"name":"Rod insertion target", "val":"100", "unit":"%"},
  {"name":"Reward", "val":"500", "unit":"pts"}
]
```

### Prerequisites

- APRM above 20% before starting
- Diesel Generator fully stopped (not running)
- Both Bus A and Bus B connected to the turbine generator (not the startup transformer)

### Procedure (summary; follow the in-room checklist exactly)

1. Disengage the **Rolldown Main BUS Protection** switch on the far left of the electrical panel.
   > This trips the turbine but holds the bus breakers closed.

2. SCRAM the reactor.

3. Engage the diesel generator and the shutdown cooling system.

4. Maintain water level using LPCI.

5. Continue cooling until temp < 50 °C and rods at 0%.

### Cancelling a Reactor Safety Test

If you need to abort, the test can be canceled by **any** of:
- Enabling RCIC
- Activating the startup transformer
- Re-engaging the Rolldown Main BUS Protection

This works without the Server Configuration gamepass.

```crit
Do **not** use RCIC during the test. Using it auto-cancels. Same for the startup transformer.
```
