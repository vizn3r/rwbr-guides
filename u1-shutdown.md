# U1 Shutdown

Normal controlled shutdown. After a SCRAM the sequence is similar but start by checking RPV level and RCIC before anything else.

## Key transitions

- Above 30% APRM: use **recirculation flow** to walk power down
- Below 30% APRM: switch to **rods**
- Below ~5% APRM: close turbine valve, trip turbine
- After turbine trip: switch electrical panel to offsite before RPM falls
- After SCRAM: both RHR pumps on immediately

## Xenon after shutdown

Xenon peaks hours after shutdown from high power. If a restart is needed soon, plan around that window. See [Xenon & Iodine](#).

---

## Checklist

1. Reduce reactor power by lowering recirculation flow.
   > Above 30% recirc is the main control. Bring pumps toward minimum to walk power down.

2. Match falling generator load to demand as you go down.
   > Don't drop the turbine valve below what the load needs. Pressure swings high.

3. Below ~30% APRM, switch to inserting rods.
   > Recirc has less authority at low power. Rods for the rest of the walk-down.

4. Below ~5% APRM, close turbine valve and trip the turbine.
   > No useful steam below this point. Bypass handles the small remaining flow.

5. Switch electrical panel back to offsite power before turbine spins down.
   > If the turbine RPM falls first, Bus A and B lose power and pumps stop.

6. Insert all rods to 0%.
   > Reactor goes subcritical.

7. Open deaerator inlet to keep ~108 °C; cut as pressure falls below ~1.5 MPa.
   > Below ~1.5 MPa the steam isn't hot enough anyway.

8. Enable both RHR (shutdown cooling) pumps.
   > Decay heat is strongest just after shutdown. Both pumps for active phase; one is enough once temp drops.

9. Cool reactor toward **50 °C** using RHR.
   > Cold shutdown target. Once there, one pump sufficient.
