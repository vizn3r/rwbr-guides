# U1 Emergencies

The plant gives no warnings. You react when the gauges tell you something is wrong.

## SCRAM triggers

APRM ≥ 125%, period ≤ 20 s, RPV level ≤ −4 m, condenser vacuum out of range, or manual activation. All rods drop to 0% in under 20 seconds.

## RPV level thresholds

```limits
[
  {"name":"Normal target",   "val":"+2", "unit":"m"},
  {"name":"SCRAM + RCIC/LPCI auto", "val":"−4", "unit":"m", "tier":"danger"},
  {"name":"MCC panel unlock", "val":"−3.9", "unit":"m"},
  {"name":"Fuel melt",       "val":"−8", "unit":"m", "tier":"danger"}
]
```

## RCIC (U1)

Auto-activates when RPV drops below −4 m. Steam-driven, no electrical power needed. MCC panel locks until level recovers above −3.9 m. Inlet valve sets RPM and feedwater; relief valve controls reactor pressure. When steam runs low, switch to RHR + LPCI.

## LPCI (U1)

Auto-activates when RPV level < −4 m AND steam pressure ≤ 3000 kPa. Safety Bus must be powered. Large injection capacity, can overfill. Monitor RPV level after it kicks in.

## High RPV pressure response

Open bypass valve first. If that's not enough, open emergency steam relief (auto-disables at 1000 kPa). Both cause RPV level to drop, so make sure feedwater flow can keep up.

---

## Checklist: SCRAM response

1. Confirm rods at **0%** on the indicator.
   > If a SCRAM didn't fully insert, manually trip again or call for help.

2. Verify RPV water level.
   > Below −4 m: RCIC auto-activates, LPCI auto-activates on low pressure, MCC locks. Below −8 m: fuel melts.

3. Watch reactor pressure. Open emergency steam relief if climbing toward 9500 kPa.
   > Bypass valve also helps. Don't let it reach the SCRAM line.

4. Confirm turbine has tripped (or trip it manually).
   > A turbine still taking steam with no generator load can over-speed.

5. Switch electrical to offsite power; verify Bus A is up.
   > Pumps need power to run.

6. Enable RHR shutdown cooling once pressure is low enough.
   > RHR cools the reactor once RCIC is no longer needed.

---

## Checklist: Loss of offsite power (unannounced)

1. [!] SCRAM the reactor immediately.
   > Without offsite power, main pumps die. RCIC is your only cooling.

2. Confirm RCIC has auto-activated (or activate manually).
   > Steam-driven, no electrical power needed. Pumps feedwater into RPV.

3. Connect DC bus to Emergency Bus.
   > Keeps control room lights and diesel ignition alive.

4. Start EDGs from the panel.
   > Once started, they feed the Safety Bus.

5. Once Safety Bus is up, switch to RHR and LPCI as steam pressure falls.
   > Below 3 MPa, LPCI can inject. Shares load with RCIC.

6. Work toward cold shutdown via RHR.
   > Target: temp **<50 °C**, rods at 0%.

**Successful recovery: 650 points** (minus any earned during islanding).

---

## Checklist: High RPV pressure

1. Open bypass valve.
   > Dumps steam to condenser without going through turbine.

2. If bypass not enough, open emergency steam relief.
   > Dumps to suppression pool. Auto-disables at 1000 kPa.

```warn
Steam relief drops RPV level. Make sure feedwater flow can counter.
```
