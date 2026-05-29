# Supervisor Room

Floor 4, Zone A, near the U2 MCR. **Junior Supervisor and above** only. Contains graph logs for both reactors, an overview of every auto control, monitors mirroring the unit MCRs, and the demand/grid coordination tools.

## Layout

Two desk sets visible on entry from the staircase:

### Monitoring desk (left)

- Unit 1 condition, network demand, reactor parameters
- Camera access (see below)
- All active phone numbers of supervisor Cell Phones

### Grid Control desk (right)

- Unit 2 condition, network demand, reactor parameters
- Plant Messaging System terminal
- **Demand Manager**
- **Unit Interlock** interface
- **Announcement microphone** (intercom)
- Telephone

Plus a wall of monitors on the opposite side from the entrance.

## Cameras (Monitoring desk)

Click the camera icon on the left monitor. Available cameras:

- Unit 1 Control
- U1 Classroom
- Unit 2 Control
- Floor 2 Central
- Turbine Hall Front (looking at U1 turbine)
- Turbine Hall Back (looking at U2 turbine)
- Turbine Control
- Deaerator Hall
- Security Room
- Condensate Lab
- Zone E / CST Hall
- Condenser Hall
- U2 FWP Control
- Exterior EDG
- Reactor Hall
- Back Entrance (turbine hall, truck dock)
- U1-U2 Hallway (Floor 4 Zone A)

Controls inside a camera view: **W/A/S/D** to pan, **E** to zoom.

## Demand Manager

On the Grid Control desk, left monitor. Shows current demand of both units, and the next demand when remaining time is **< 300 seconds**. Status codes:

- `***`, unit has no demand (offsite loss, shutdown, turbine not synced)
- `Offsite`, maintenance scheduled by Server Configuration
- `Maint.`, maintenance scheduled by Demand Manager

### Scheduling a maintenance shutdown

Works when:
- Remaining time is between **60 and 300 seconds**
- APRM is **above 15%**

### Changing demand balance (Supervisor+)

To split the next demand between U1 and U2 (the total stays the same; you shift the ratio):

- U2 must have **events AND malfunctions ON** in Server Configuration
- Both reactors must be running
- At least **5 players** on the server
- Remaining time **60-300 seconds**

Click the arrows next to the remaining-time display to shift the balance.

## Unit Interlock

The breaker that shares power between U1 and U2 across the electrical panels. Activated only by **Senior Supervisor and above**.

### Conditions to close it

- **Donor unit** must be powering its A bus from its own turbine generator (the startup transformer cannot feed both units)
- **Receiver unit's A bus** must be unpowered
- Only then can both interlock breakers close

### Uses

- Restore Bus A on the receiver after a LOOP, feeds the safety bus quickly without waiting on diesels
- Restart the receiver into islanding mode after an offsite-induced trip
- Bridge a malfunction recovery window without losing pump power

## Announcements (Intercom)

Below the Demand Manager monitor. **Senior Supervisor and above.** Click the microphone, red light turns green. Type in chat; the message pops up for every player with a name/avatar header and an alert sound. **1 message per player per 60 seconds.** Click the mic again to disarm.

Players you can't chat with (due to chat filters) won't see your popup.

## Wall monitors

| Monitor | Shows |
|---------|-------|
| Digital Status System | Overall condition of each unit; steam temp, pressure, turbine RPM, gen. load; all supervisors on the server |
| Weather Forecast | Current weather + animated forecast at night / morning / afternoon. Right side: facility map with rain heat-map (green = light, red = heavy). Updates periodically, not instantly. |
| Supervisor Room Logs | Other supervisors' actions (demand changes, interlocks) |
| Full Site Events Logger | Most alarms across the facility |
| Previous Announcements | Past intercom messages |
| Phone Call Logs | Every call: caller / receiver phone numbers and usernames; live or completed status; duration. Click a call to read the chat transcript, even if Roblox normally hash-tags it. (If logs look blank on first load, click any call and exit; that resolves it.) |
| Previous Votekicks | Initiator, target, reason, outcome |

```note
The Weather Forecast is the tactical advantage no one talks about. If you see incoming high-humidity conditions (temp 1-9 °C + heavy clouds/rain), call TCR **now** to prepare the warm-air valve before generator cooling becomes a problem.
```

## Patrol checklist

The supervisor role is not strictly defined. Main idea: **monitor, coordinate, advise**. Don't get stuck in the room.

- Both MCRs: status check, ask if anything needs attention
- Turbine hall: leaks, tagged equipment, oil pools, vibration sounds
- Condenser hall: radioactivity, polisher condition
- FWP Pit: pump and motor temperatures
- EDG bay: fuel levels, standby status
- Reactor Hall: only if refueling is active

## Strategy notes

- Don't over-commit a faulty unit. Maintenance event (500 pts) often beats marginal demand revenue.
- During an announced offsite event, plan the split assuming one unit may island.
- Watch the forecast, humid conditions ahead means ramp U2 down preemptively.
- Demand changes within 60s of the cycle end are locked out, make decisions early.

## Easter egg

There's a paper-and-shredder on the Monitoring desk. Pick up "Paper" (nonsense text on it), then click the top of the shredder while holding it. Does nothing useful, but it shreds.
