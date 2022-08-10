<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { missionStore } from '@/stores/mission';
import { inject, ref } from 'vue';
import { FlightMissionLean } from '@/stores/models';
import { Waypoint } from '@/stores/models';

const $l = inject<Translator>('$l')!;
const router = useRouter();
const id = router.currentRoute.value.params.id;
const dbMissionStore = missionStore();

const flightMission = ref(await dbMissionStore.getMission(id as string));
let selectedWaypoint: number;

async function SaveData() {
    if (dbMissionStore.updateMision(flightMission.value)) {
        console.log('');
    }
}
</script>

<script lang="ts">
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Translator } from '@/libs/localization/localizator';
import 'ol/ol.css'

export default {
    mounted() {
        // Get the current mission from the server
        const mission = {
            homeLongitude: 0,
            homeLatitude: 0,
        }

        // Create the map
        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([mission.homeLatitude, mission.homeLongitude]),
                zoom: 2
            })
        });

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                map.getView().setCenter(fromLonLat([position.coords.longitude, position.coords.latitude]));
                map.getView().setZoom(15);
            }, err => {
                console.warn(err);
            });
        }
    },
    
}
</script>
<template>
    <div>
        Mission Planning for {{ id }}
    </div>
    <div class="container">
        <div class="settings-container">
            <div class="field">
                <div class="label" for="flightAltitude" v-text="$l('flightMissionOverview.labels.flightAltitude')" />
                <input class="input" type="number" id="flightAltitude" v-model="flightMission.flightAltitude">
            </div>

            <div class="field">
                <div class="label" for="homeLongitude" v-text="$l('flightMissionOverview.labels.homeLongitude')" />
                <input class="input" type="number" id="homeLongitude" v-model="flightMission.homeLongitude">
            </div>

            <div class="field">
                <div class="label" for="homeLatitude" v-text="$l('flightMissionOverview.labels.homeLatitude')" />
                <input class="input" type="number" id="homeLatitude" v-model="flightMission.homeLatitude">
            </div>

            <div class="field">
                <div class="label" for="flightSpeed" v-text="$l('flightMissionOverview.labels.flightSpeed')" />
                <input class="input" type="number" id="flightSpeed" v-model="flightMission.flightSpeed">
            </div>

            <div class="saveButton">
                <button class="inputSave" type="submit" id="save" v-text="$l('flightMissionOverview.labels.save')"
                    @click="SaveData()" />
            </div>
        </div>
        <div id="map"></div>
        <div class="waypoint-container">
            <div v-for="(waypoint) in flightMission.waypoints" :key="waypoint.id">
                <div class="field-waypoints">
                    <p class="waypoint-order-number">test</p>
                    <input class="waypoint-input" type="text" id="name" v-model="flightMission.name">
                </div>
            </div>
            <div id="propertiesWindow">
                <div class="field-waypoints">
                    <div class="propertyLabel" type="text" for="propertyName"
                        v-text="$l('flightMissionOverview.propertyWindow.name')" />
                    <input class="propertyValue" id="propertyName" type="text" v-model="flightMission.waypoints[0].name">
                </div>
                <div class="field-waypoints">
                    <div class="propertyLabel" type="text" for="propertyAltitude"
                        v-text="$l('flightMissionOverview.propertyWindow.altitude')" />
                    <input class="propertyValue" id="propertyAltitude" type="text" v-model="flightMission.waypoints[0].altitude">
                </div>
                <div class="field-waypoints">
                    <div class="propertyLabel" type="text" for="propertyLongitude"
                        v-text="$l('flightMissionOverview.propertyWindow.longitude')" />
                    <input class="propertyValue" id="propertyLongitude" type="text" v-model="flightMission.waypoints[0].longitude">
                </div>
                <div class="field-waypoints">
                    <div class="propertyLabel" type="text" for="propertyLatitude"
                        v-text="$l('flightMissionOverview.propertyWindow.latitude')" />
                    <input class="propertyValue" id="propertyLatitude" type="text" v-model="flightMission.waypoints[0].latitude">
                </div>
                <div class="field-waypoints">
                    <div class="propertyLabel" type="text" for="propertyOrientationMode"
                        v-text="$l('flightMissionOverview.propertyWindow.orientationMode')" />
                    <input class="propertyValue" id="propertyOrientationMode" type="text" v-model="flightMission.waypoints[0].orientationMode">
                </div>
                <div class="field-waypoints">
                    <div class="propertyLabel" type="text" for="propertyOrientation"
                        v-text="$l('flightMissionOverview.propertyWindow.orientation')" />
                    <input class="propertyValue" id="propertyOrientation" type="text" v-model="flightMission.waypoints[0].orientation">
                </div>
                <div class="field-waypoints">
                    <div class="propertyLabel" type="text" for="propertyGimbleAngle"
                        v-text="$l('flightMissionOverview.propertyWindow.gimbleAngle')" />
                    <input class="propertyValue" id="propertyGimbleAngle" type="text" v-model="flightMission.waypoints[0].gimbalAngle">
                </div>
                                <div class="field-waypoints">
                    <div class="propertyLabel" type="text" for="propertyAction"
                        v-text="$l('flightMissionOverview.propertyWindow.action')" />
                    <input class="propertyValue" id="propertyAction" type="text" v-model="flightMission.waypoints[0].action">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.container {
    height: 100%;
    display: flex;
}

.field>.label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
}

.field-waypoints {
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
}

.waypoint-order-number {
    float: left;
    margin: auto;
    text-align: end;
}

.waypoint-input {
    overflow: hidden;
    vertical-align: middle;
    margin: auto;
    width: 90%;
}

.settings-container {
    flex: 1;
    margin-right: 0.5rem;
    align-self: center;
}

.settings-container.input {
    text-align: end;
    margin-bottom: 3rem;
}

.saveButton {
    bottom: 0;
    text-align: end;
}

#propertiesWindow {
    position: fixed;
    bottom: 0;
    right: 0;
    border-top: grey;
    width: auto;
    height: auto;
    
}

.propertyLabel {
    float: left;
    margin: auto;
    text-align: end;
    align-items: left;
}

.propertyValue {
    overflow: hidden;
    vertical-align: middle;
    margin: auto;
    align-items: flex-end;
}


#map {
    height: 100%;
    flex: 5;
}

.waypoint-container {
    flex: 2;
    position: relative;
    min-height: 150px;
    width: auto;
}
</style>