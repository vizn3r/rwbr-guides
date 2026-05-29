# Reference

## Phone Numbers

| Number | Room / Function |
|--------|-----------------|
| 0010 | U1 MCR |
| 0019 | U1 Maintenance, say "repair", "leak"/"yes", or "refuel" |
| 0020 | U2 MCR |
| 0021 | U2 TCR |
| 0022 | U2 CMCR / Condenser Control Room |
| 0024 | FWP Control Room |
| 0027 | EDG fuel resupply, say "refuel" |
| 0028 | U2 Maintenance, say "repair" (also for TCR oil leak checks) |
| 0029 | U2 MCR Maintenance, say "refuel" |
| 5682 | Grid Control, say "disconnect" before shutdown |

Common scenarios: oil leak → call **0028** after turbine at 0 RPM. EDG fuel → **0027** say "refuel". Repair → tag the device first, then call maintenance and say "repair". Leak check → cold shutdown first, then call **0019** and say "leak"/"yes". Pre-planned shutdown → call **5682** and say "disconnect" first.

```warn
Don't call "repair" before you've tagged the device. The technician needs the yellow tag, and a wrong tag voids the 100-point bonus.
```

## Plant Messaging System (PMS)

Keyboard terminal in each room. Send pre-set messages without picking up a phone. Press **PWR** to boot → click keyboard → pick message → pick destination → check mark → **Send** or **Send Urg.**

Common pre-sets: U1/U2 Reactor Scram, Offsite Power Restored/Lost, Leak After Hotwell/Deaerator Suspected, Rupture Disk Trouble, Prepare For Shutdown, Supervisor Attendance Requested, Call MCR/EDG/FWP ASAP.

---

## Roles & Badges

### In-game roles

| Role | Points | Unlocks |
|------|--------|---------|
| Verified Player | Default | Standard access |
| Junior Operator |, | EDG Building, LPCI/RCIC control, SCRAM authority |
| Operator | 5,000 | U2 MCR, TCR, FWP, CMCR; U2 manual control locking; synchroscope required for U1 sync |
| Senior Operator | 10,000 | Master Acknowledge |
| Junior Supervisor | 20,000 | Supervisor Room; Cell Phone on spawn |
| Supervisor | 50,000 | Demand Changing Panel |
| Senior Supervisor | 100,000 | PA system; Unit Interlock |
| Junior Inspector | 200,000 | Inspector Office |
| Inspector | 500,000 | Inspector Tablet |
| Senior Inspector | 1,000,000 | Plant Evacuation authority |
| Chief Inspector | 2,000,000 | Status only |
| Plant Manager | 5,000,000 | Plant Manager Office (~957 hrs at max rate) |

### Badges

| Badge | How |
|-------|-----|
| You've Been Hired! | Junior Operator rank |
| You've Been Promoted! | Operator rank |
| Supervising Others | Junior Supervisor rank |
| Safety Inspector | Junior Inspector rank |
| The Chief | Chief Inspector rank |
| It's Lonely at the Top... | Plant Manager rank |
| Met the Creator | Be in a server with DelfinoDelphis |
| Manually Synchronized | Sync U2 turbine manually |
| Recovered an Off-the-rails Offsite | Safely shut down during offsite event |
| Master of Malfunctions | Tag all malfunctions correctly |
| Shutdown for Maintenance | Complete a maintenance-shutdown event |
| Met the Demand | Hit network demand ±50 MW |
| Unit 02 Manual Startup | Start U2 with zero autocontrols |
| Nuclear Plumber | Call leak check, have leaks found |
| Turbine Rundown Success! | Successfully run the safety test on RBMK |
| Game Inside a Game | Play Pong on the TCR computer (press D) |
| Irradiated | Dose above limits + turbine hall scan |
| Poured Oil on Troubled Waters | Repair a U2 turbine oil leak |
| Blunt Force Trauma | Fall down the shaft in the Reactor Hall |
| You've Been Thunderstruck! | Touch an outer cable in the Switchyard |

---

## Items & Equipment

**Card:** opens card-scanner doors. Low rank = denied.

**Malfunction tags:** yellow (your suspicion, from central desk) → technician adds red (confirmed). Tagging a working device = 0 points on repair.

**Dosimeters:** non-disposable (in toolbar, tracks µSv since entering turbine hall) + disposable (0-4000 mSv film strip, pick up from blue basket near scanner).

**Geiger counters:** standard analog (free, maxes at 500 µSv/h) or gamepass digital (beeps at 31 µSv/h).

**Cell Phone:** Junior Supervisor+. Mobile phone with Do Not Disturb. Nokia 3310 model.

**Inspector Tablet:** Inspector+. Used for Inspections, see [Points, Events & Inspection](#).

**Guide Boards** (in-room authoritative checklists):

| Location | Boards |
|----------|--------|
| U1 MCR | Reactor Startup |
| U2 MCR | Reactor Startup, RST, Islanding Preparation, Reactor Shutdown |
| U2 TCR | Turbine Startup, Oil Management, Fire Safety, Shutdown |
| CMCR | Polisher Regeneration, Conductivity Calibration |

---

## Abbreviations

Abbreviation reference. Every abbreviation in this list gets an automatic tooltip on hover.

Abbreviation reference. Every abbreviation in the manual that's in this list also gets an automatic tooltip on hover, try it on any page.

| Abbreviation | Full name |
|--------------|-----------|
| ADS  | Automatic Depressurization System (U2 only, V1.7.0+) |
| APR  | Average Power Reactor (legacy synonym for APRM in some screens) |
| APRM | Average Power Range Monitor (average of LPRMs) |
| BWR  | Boiling Water Reactor (GE BWR = General Electric BWR) |
| CAR  | Condenser Air Removal |
| CIX  | Condensate Ion eXchange (polishing system: polisher 1 + 2) |
| CMCR | Condenser Maintenance Control Room (U2) |
| CRD  | Control Rod Drive |
| CRDP | Control Rod Drive Pump |
| CST  | Condensate Storage Tank |
| DA   | Deaerator (also "DA Hall" = Deaerator Hall) |
| EBWR | Experimental Boiling Water Reactor (joke effect / community in-joke) |
| ECCS | Emergency Core Cooling System (RCIC + LPCI + steam relief) |
| EDG  | Emergency Diesel Generator |
| FW   | Feedwater |
| FWP  | Feedwater Pump |
| HPFH | High Pressure Feedwater Heater |
| IPR  | Intermediate Power Range |
| LOCA | Loss Of Coolant Accident (i.e. leakage) |
| LOOP | Loss Of Off-site Power |
| LPCI | Low Pressure Coolant Injection |
| LPRM | Local Power Range Monitor |
| MCC  | Main Cooling Control |
| MCR  | Main Control Room |
| PMS  | Plant Messaging System |
| POAH | Point Of Adding Heat (~1% APRM) |
| PWR  | Pressurized Water Reactor |
| RBMK | Reaktor Bolshoy Moshchnosti Kanalnyy ("high-power channel-type reactor", Soviet graphite-moderated, Chernobyl design) |
| RBWR | Realistic Boiling Water Reactor (the game) |
| RCIC | Reactor Core Isolation Cooling |
| RHR  | Residual Heat Removal (= shutdown cooling) |
| RPS  | Reactor Protection System (SCRAM decision logic; A and B for redundancy) |
| RPV  | Reactor Pressure Vessel |
| RST  | Reactor Safety Test (the Chernobyl-style turbine rundown test, U2) |
| RWM  | Rod Worth Minimizer |
| SCRAM | Safety Control Rod Axe Man (rapid shutdown) |
| SDC  | Shutdown Cooling (= RHR mode) |
| SJAE | Steam Jet Air Ejector |
| SRM  | Source Range Monitor |
| S/IAS | Service / Instrument Air System |
| TCR  | Turbine Control Room |
| U1 / U2 | Unit 1 / Unit 2 |

## Plant nomenclature

| Term | Meaning |
|------|---------|
| Bypass valve | Diverts steam directly to the condenser, bypassing the turbine |
| Drive water | Hydraulic fluid that moves control rods (U2 has explicit pumps and accumulators) |
| Hotwell | The bottom of the condenser where condensate collects |
| Hydraulic accumulator | Stores pressurized hydraulic fluid to drive rod motion. Must be filled before startup or after SCRAM (U2). |
| Islanding | Running the turbine to power site loads only, disconnected from the grid |
| Live steam | High-pressure steam straight from the RPV (vs extracted/heated steam) |
| Period | Time in seconds for power to multiply by *e* (~2.718) |
| Polisher | Demineralizer that cleans water chemistry |
| Precision valve | U2 fine-control turbine valve for sub-3600-RPM precision |
| Recirculation | Internal RPV flow that controls void fraction (and reactivity) |
| Rod block | Logic that prevents withdrawing rods past the current limit (RWM) |
| Rod Worth Minimizer | U2 system enforcing the one-rod-at-a-time pull pattern at low flux |
| Site power | Power consumed by the plant itself (pumps, lighting, etc.), subtracted from generator output |
| Steam sealing | Steam injected into shaft seal glands to stop leakage and atmospheric ingress |
| Suppression pool | Large water pool used as the final dump for emergency steam relief and RCIC |
| Synchroscope | Indicator showing generator-vs-grid phase relationship |
| Turning gear | Slow-rotation gear used to keep the turbine shaft from sagging while heated/cooling |
| Void fraction | Percentage of steam (vs water) in the two-phase mixture in the RPV |
| Void coefficient | Reactivity change per unit void fraction. Negative in BWRs, positive in RBMKs. |

## Status / annunciator color conventions

| Color | Generally means |
|-------|-----------------|
| Green | Normal, operational, ready |
| Green flashing | Active transfer / loading |
| Yellow | Warning, attention, awaiting action |
| Yellow flashing | In-progress action (regenerating, ejecting) |
| Red | Faulted, empty, or tripped |
| Red flashing | Critical alarm or active fault |
