# U2 Shutdown

The in-game U2 Shutdown Guide Board prescribes a **SCRAM-based** controlled shutdown rather than a gradual walk-down. A clean SCRAM at 20% is faster and cleaner than walking rods down manually, which fights xenon and takes far longer.

## Breaker references

| Breaker | What it does |
|---------|-------------|
| 52BA2 | Bus A from startup transformer line 2. **Close** this before SCRAM. |
| 52BB1 | Bus A from Bus B line 1. **Open** this before SCRAM. |

Closing 52BA2 + opening 52BB1 transfers Bus A from the turbine generator to the startup transformer before the SCRAM, so when the turbine trips you don't lose pump power.

## TCR side

TCR should:
- Confirm SCRAM with MCR
- Verify turbine breaker opened automatically
- Switch oil pumps to **Aux** before RPM drops below 1800
- Engage turning gear once turbine reaches 0 RPM
- Keep pre-heat valve open if restart is planned (avoids thermal shock)

## After shutdown

- Xenon peaks hours after a shutdown from full power, so plan restart windows accordingly
- Keep CSTs above 50% even at cold shutdown
- Regenerate degraded polishers during cool-down window
- Check deaerator rupture disk screen shows no trouble flag before next startup

---

## Checklist

1. Call Grid Control (**5682**); say "disconnect". Inform TCR, CMCR, FWP, EDG bay of intent to shut down.
   > Grid control disconnects the offsite demand so the shutdown is coordinated.

2. Reduce APRM to **20% or less**.
   > Use recirculation flow first, then rods. 20% is the safe manual-operation boundary.

3. Shut off FW Pump 2, Condensate Pump 2, Condenser Circulation Pump 2.
   > Close their inlet/outlet valves. At 20% APRM one of each pump is enough.

4. Switch Bus A to startup transformer: close **Breaker 52BA2**, open **Breaker 52BB1**.
   > Takes Bus A off the turbine generator before the turbine trips.

5. If using autocontrol, ensure MCC autocontrol is enabled.
   > Keeps water levels managed during the trip transient.

6. [!] **SCRAM** the reactor.
   > The turbine trips automatically from the SCRAM. Don't manually trip it.

7. Enable BOTH RHR pumps in SDC (Shutdown Cooling) Mode.
   > Both pumps for active cool-down. One is enough once the reactor cools.

8. Monitor MCC flows.
   > Ensure feedwater and cooling flows stay balanced through the transient.

9. Do not use RCIC or LPCI unless reactor level is uncontrollable.
   > Normal cooling pumps are correct here. RCIC/LPCI are for emergencies.

10. Do not manually trip the turbine before or after the SCRAM.
    > It trips automatically. Manually tripping it first interferes.

11. [!] Do not acknowledge or silence the reactor trip state until SCRAM is complete.
    > Wait for all green "full in" lights on FCD and all blue "SCRAM" lights out.

12. If using Unit Interlock, inform Unit 1 of the planned shutdown.
    > They need to know before you drop bus power.

13. Once reactor level stable, temperature **below 50 °C**, condenser steam flow **under 5 kg/s**: shut off all remaining devices.
    > Cold shutdown reached. Refueling can begin if needed.
