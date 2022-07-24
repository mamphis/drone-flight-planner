<script lang="ts" setup>
import { useRouter } from 'vue-router';


const router = useRouter();
const id = router.currentRoute.value.params.id;
</script>
<script lang="ts">
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
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
            });
        }
    },
}
</script>
<template>
    <div>
        Mission Planning for {{ id }}
    </div>
    <div id="map"></div>
</template>

<style lang="css">
#map {
    height: 100%;
}
</style>