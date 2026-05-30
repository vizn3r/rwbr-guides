# Troubleshooting: Electrical & EDG

Buses, sync, diesel generators.

## Can't switch to onsite power after sync

**Symptoms:** Pressed sync, generator is online, but bus switching fails or buses lose power.

**Likely causes:**

- Synced off-phase (rare, bad sync)
- Bus selector toggled too fast
- Trying to feed both A and B simultaneously from a still-stabilizing generator

**Fix:**

1. Verify generator is still synced (load gauge showing).
   > If sync didn't actually latch, switching buses kills power.

2. Switch Bus A to turbine generator first.
   > One at a time. Bus A typically carries the recirc pumps, get them on stable power first.

3. Then switch Bus B to turbine generator.
   > Order matters because each bus brings its loads online when it transfers.

4. If a bus drops out, switch back to startup transformer.
   > Better to have offsite power than nothing.

## Bus A or B loses power suddenly

**Symptoms:** Several pumps stop. Bus light goes red.

**Likely causes:**

- Turbine tripped (and panel didn't auto-switch to offsite)
- Offsite power blackout
- Overload on the startup transformer

**Fix:**

1. Check if the turbine is still running.
   > If tripped, you lost generator power to the buses.

2. Switch buses back to offsite (startup transformer).
   > Should restore power if offsite is available.

3. If offsite is also gone (full LOOP), SCRAM and follow [Emergencies](emergencies#loss-of-offsite-power).
   > RCIC + EDG sequence.

4. After a turbine trip, reactor auto-reduces to 10%, let it.
   > Don't try to keep full power on the startup transformer; it'll trip.

## EDG won't start

**Symptoms:** Diesel generator panel shows no response when starting.

**Likely cause:** EDG standby preheating not done.

**Fix:**

1. Go to the EDG Standby Panel in the EDG bay.
   > Three switches: Compressor, Water Heater, Auxiliary Oil Pump.

2. Enable all three preheaters.
   > Without preheat the EDG physically cannot start and an MCR alarm sounds.

3. Wait for the preheat cycle.
   > Engine, oil, and start air all need to be ready.

4. Try start again.
   > Should now spin up.

5. For unattended readiness, leave automatic-control switch ON.
   > Keeps the standby system warm without manual intervention.

## EDG fuel low

**Symptoms:** EDG fuel gauge low. Won't run reliably if drained.

**Fix:**

1. Verify the main storage tank has fuel.
   > If empty, call **0027** and say "refuel" to refill the main tank.

2. At the EDG Distribution Panel, fully open the Main Valve.
   > Path from main tank to per-EDG valves.

3. Open the valve of the specific EDG you're refueling (one at a time).
   > Mis-routes if multiple are open.

4. Turn on the fuel pump from the Distribution Panel.
   > Transfers fuel into the EDG tank.

5. When done, turn off pump, then close all valves.
   > Pump off before changing valve routing.

```crit
Do NOT refuel an EDG while it is running. Fire risk.
```

## Both EDGs damaged from running simultaneously

**Symptoms:** EDG indicators showing damage after a session with both running.

**Likely cause:** U2 has two EDGs but running them in parallel can cause damage (per the sticky note on the electrical distribution panel).

**Fix:**

1. Only run one EDG at a time normally.
   > Switch between them on the Electrical Distribution Panel as needed.

2. If damage has accumulated, request maintenance via 0028.
   > Damaged EDGs may not provide full output.

## Unit Interlock won't close

**Symptoms:** Trying to interlock the units but the breaker won't close.

**Likely causes:**

- Donor unit isn't powering its A bus from the turbine
- Receiver unit's A bus is still powered (not unpowered)
- Wrong rank attempting it (needs Senior Supervisor+)

**Fix:**

1. Confirm your rank is Senior Supervisor or higher.
   > Lower ranks can't operate the interlock.

2. On the donor unit: verify A bus is fed from the turbine generator, not the startup transformer.
   > The startup transformer can't supply both units.

3. On the receiver unit: verify A bus is completely unpowered.
   > If receiver still has any A-bus source, the breaker won't close to prevent paralleling sources.

4. Now close both interlock breakers from the Supervisor Room panel.
   > Both must close to complete the link.
