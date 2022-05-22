# Drone Flight Planner

The Drone Flight Planner is a program that will help you plan your drone's flight. There are multiple parts to the program, each of which is described below.

## The Backend

The following Task are handled by the backend:

- User Authentication
- Planning of Missions
    - Create a new mission
    - Edit an existing mission
    - Delete an existing mission
- See a live view of the drones flight

The user must register in the app. After registration (subscription) the user can mangage its flights.


The Mission has the following properties:
- Name
- Altitude
- Speed
- Home Location (May be override by the drone / Execution Application)
- Waypoints
    - Location
    - Orientation
    - Gimbal Angle
    - Action (Photo, StartVideo, StopVideo, etc)

### Subscription models
- Basic
    - One Mission at a time
- Advanced
    - Multiple Missions at a time
    - Create a Team with multiple users
    - Assign mission to users

## The Planning Frontend
After Registration and Login the user can see her planned missions. The user can create a new mission, edit an existing mission or delete an existing mission.

In the mission Edit Screen the users is greeted with a map, a general settings screen, and the list of the missions waypoints. The user can set the mission name, altitude, speed and home location in the settings screen.

On the Map the user can add waypoints. The user can add a waypoint by clicking on the map. The user can also drag the waypoint to a new location. The user can see detailed information of the waypoint by clicking on it. When in the detail view the user may delete the waypoint.

For ease of use the data is stored in the local storage first and then send to the backend when the user clicks save.
> Advantage: The user can refresh the page without loosing progress of the mission.

The user can also use some predefined waypoint patterns. (Zick Zack, etc).

## The Execution Application

The user need to be logged in to the execution application. If the device is offline it cannot be used to execute missions.

when the user is logged in, the credentials will be stored locally ([see](https://pub.dev/packages/flutter_secure_storage#-installing-tab-)).

When the device is offline and credentials are stored, the Execution Application will display the stored missions. 

When the device is online the Execution Applicaion will list all available missions, for which the user can decide to download them for offline usage.

When executing a mission the user can see the live view of the drone on the map.
(Later she will be able to see a live view of the drone).

When the device is online, the applicaiton will send a live update of the drone's location to the backend.

Before starting the mission the user can view on a map the current location and the planned mission. She must check if the mission is possible and in the correct location. 

If she can has checked that the mission can be executed, she can start the mission.

When the mission is started the user can see the live view of the drone on the map.
