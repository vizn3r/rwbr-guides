# Turbine Control Room (U2)

Dedicated control room for U2 turbine operations. The TCR operator handles steam sealing, oil pressures, casing temperatures, and pump systems. Constant communication with the MCR is required.

```note
The room has 4 physical Guide Boards: **Turbine Startup**, **Oil Management**, **Fire Safety Systems**, and **Shutdown**. There is also an interactive turbine startup guide under the gear icon on the right side of the screen. Read the boards at least once before running TCR for the first time. They are authoritative.
```

## Gauges

Axial pressure, radial pressure, hydraulic oil pressure, lube oil pressure, steam sealing pressure, casing temperature, generator temperature, vibration, differential expansion.

## Steam sealing

Maintains pressure inside gland seals around the shaft where it exits the casing. HP side: prevents high-pressure steam escaping outward. LP side: prevents air leaking inward and destroying condenser vacuum.

```limits
[
  {"name":"Sealing pressure target", "val":"0.25", "unit":"bar"},
  {"name":"Steam leak threshold",    "val":"<0.10", "unit":"bar", "tier":"warn"}
]
```

- **Supply valve:** auxiliary steam into the glands. Used before, during run-up, and at low power.
- **Leak-off valve:** vents steam out of the glands. Used after sync once LP turbine steam feeds the glands.

Supply valve won't open without condenser vacuum. More turbine valve opening → more LP steam into glands → more leak-off needed. After sync: use leak-off mainly; supply goes idle.

```nerd
Steam gland seals solve a specific problem: where the spinning shaft exits the turbine casing at 3600 RPM, you can't use a contact seal because the shaft is hot. Instead a labyrinth of fins reduces the flow path and low-pressure steam is injected into the gap. HP end: seal prevents high-pressure steam escaping outward. LP end: turbine is below atmospheric pressure, so the seal must prevent air leaking inward, which would destroy condenser vacuum. The 0.25 bar target sits just above atmospheric to block inward air without overpressuring the glands.
```

## Oil pumps (Lube and Hydraulic)

```limits
[
  {"name":"Lube oil pressure",  "val":"6", "unit":"bar"},
  {"name":"Hydraulic pressure", "val":"12", "unit":"bar"},
  {"name":"Oil temperature",    "val":"44.8", "unit":"°C"}
]
```

Three power sources per system:
- **Emergency**, connected to safety bus
- **Auxiliary**, connected to Main Bus A
- **Shaft**, powered by turbine above 1800 RPM

Use Aux below 1800 RPM. Switch to Shaft after 1800 RPM (high-pitched alarm signals this). Above 2000 RPM leaving Aux on trips it on high pressure (both pumps fighting the same header).

```flow
Aux <1800 RPM → Shaft >1800 RPM
```

Lube pressure is directly proportional to hydraulic pressure. If either hits red, turbine trips.

```nerd
Lube oil forms a film between every bearing surface: journal bearings on the shaft, thrust bearings controlling axial position. Hydraulic oil powers the servo-valves that open and close the turbine steam admission valves. The shaft-driven pump is used above 1800 RPM because the turbine's own rotation is more reliable than a motor-driven pump during the run-up transient. If Bus A drops, the shaft pump keeps oil flowing regardless.
```

## Hydraulic pressure control

Adjusted via the **Backflow valve** in the turbine hall:
- Right click → close (more pressure)
- Left click → open (less pressure)
- Middle click → stop
- Normal position: **70-100% open**

If pressure drops into yellow, close backflow toward 70-80% and monitor. Needing below 50% to maintain pressure → suspect oil leak.

## Oil temperature

Controlled via hot/cool water valves on the heat exchanger. Target **44.8 °C**.
- Startup: hot water valve for initial heating
- Operation: cool valve to manage friction heat

## Casing temperature

```limits
[
  {"name":"Pre-heat target", "val":">240", "unit":"°C"}
]
```

Pre-heat valve uses hot reactor steam to heat the casing on the turning gear before startup. Casing must pass 240 °C before beginning run-up.

## Generator cooling

Cold and warm air valves accessed via a ladder on the right side of the turbine hall, below the generator.

```limits
[
  {"name":"Warm valve (humid conditions)", "val":"≥41", "unit":"%"},
  {"name":"Generator overheat",           "val":">100", "unit":"°C", "tier":"warn"}
]
```

Default: cold at 100%, warm closed. In humid conditions set warm to ≥41%. Above 1000 MW load in humid conditions, cooling may be insufficient, drop load below demand to let the generator cool.

**High humidity conditions:**
- Early morning, outside temp 1-9 °C
- Heavy clouds OR light precipitation, temp 1-9 °C
- Always during heavy rain

Check forecast on the Supervisor Room screen.

## Lube oil filters

Two holders in the turbine hall. Selector lever: pulled right = left filter active; pushed left = right filter active. Gauge reads **differential pressure** across the active filter.

```limits
[
  {"name":"Filter ΔP normal", "val":"0.3-0.4", "unit":"bar"},
  {"name":"Filter ΔP trip",   "val":">0.8",   "unit":"bar", "tier":"danger"}
]
```

Above 0.8 bar the turbine trips. Inspect both on arrival; leave the cleaner one in service while changing the other.

## Stop actuators

Located on top of the yellow machine, back right of the turbine hall. Trip at >3850 RPM. Red band shows when tripped, click to reset.

```warn
If U2 MCR can't open the turbine valve with all parameters green, check the stop actuators first.
```

## Pong

Earn the "Game Inside a Game" badge by playing Pong on the right monitor. Press **D** to open, **A** to close.

---

## Checklist: TCR run-up

```flow
Oil Valves → Aux Pumps → Balance Oil Temp → Vacuum → Sealing → Preheat >240C → Run-up → Shaft Pumps
```

1. Open Main, Aux, and Emergency oil valves to **100%**.
   > Full flow path open so oil can reach bearings as soon as a pump is running.

2. Set lube and hydraulic oil pumps to **Aux**.
   > Aux runs off Main Bus A until shaft pump comes alive above 1800 RPM.

3. Balance oil temp to **~44.8 °C** with cold and hot valves.
   > Cold oil too viscous; hot oil loses film strength.

4. Wait for condenser vacuum from MCR.
   > Sealing supply valve won't open without vacuum.

5. Set sealing supply valve to **~100%**.
   > Builds sealing pressure to ~0.25 bar before shaft starts turning.

6. Engage the turning gear; then enable it.
   > Distributes warm oil around bearings and prevents shaft sag during pre-heat.

7. Turn pre-heat valve to **100%**.
   > Brings hot reactor steam into casing gradually.

8. Once casing temp passes **240 °C**, turn off and disengage turning gear.
   > Casing thermally ready. Turning gear must be off before run-up.

9. Call MCR ready for run-up.
   > MCR opens main turbine valve from here.

10. After **1800 RPM**, switch oil pumps to **Shaft**.
    > High-pitched alarm signals this. Above 2000 RPM Aux pump trips if left on.

11. After sync, monitor oil temp and sealing pressure.
    > LP turbine steam now feeds glands, use leak-off mainly, supply goes idle.

---

## Checklist: Oil leak response

1. Request power reduction to **15-20% APRM** from MCR.
   > Reduces load before the trip.

2. Manually trip turbine after MCR confirms.
   > MCR cuts steam; TCR finishes the trip.

3. Turn off the turning gear.
   > Stops further mechanical motion before oil flow is cut.

4. Turn off oil pumps (lube and hydraulic).
   > Stops the source of the leak.

5. Wait for turbine to reach **0 RPM**.
   > Maintenance can't safely inspect a spinning shaft.

6. Call maintenance (**0028**) for oil leak check.
   > Technician identifies the leak source.

7. Don't restart anything until the leak check is complete.
   > Repressurizing a leaking line makes it worse.

8. After completion, adjust hydraulic pressure and prepare for normal operation.
   > Backflow valve back to 70-100%; pressures should return to band.

---

## Checklist: Sealing pressure adjustments

- Low sealing pressure: **decrease leak-off valve**
- High sealing pressure: **increase leak-off valve / decrease supply valve**

---

## Checklist: Shutdown (TCR side)

1. Confirm SCRAM with MCR.
   > Stay in communication through the turbine trip.

2. Verify turbine breaker opened automatically.
   > If not, manually trip turbine.

3. Switch oil pumps to **Aux** before RPM drops below 1800.
   > Shaft pump loses drive pressure as RPM falls, Aux must take over before then.

4. Engage turning gear once turbine reaches **0 RPM**.
   > Prevents shaft sag while casing cools.

5. Keep pre-heat valve open while casing is hot if restart is planned.
   > Sudden cold air on a hot casing causes thermal shock.
