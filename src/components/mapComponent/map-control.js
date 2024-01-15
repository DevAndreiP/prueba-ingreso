import 'leaflet/dist/leaflet.css'
import 'leaflet-wms'
import './map.scss'
import 'leaflet/dist/leaflet.js'
import 'leaflet-modal/dist/leaflet.modal.css'
import 'leaflet-modal'
import 'leaflet-ajax'
import { carto_light } from './layers/control-layers'
import { dynamicMarker } from './controls/markers'
import { minimap } from './controls/minimap'
import { imgIcon } from './controls/icons/imgIcon'
import './L.TileLayer.BetterWMS';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const openModalButton = document.getElementById('open-modal-button')

const L = require('leaflet')

//Localizar y cambiar el mapa por el municipio de Repelón

export const map = L.map('map', {
    center: [5.33775, -72.39586], //coordenadas de REPELON
    zoom: 15,
    zoomControl: true,
    layers: [carto_light]
})
// Agregar servicio WMS - gc_predios_catastro para cargar la capa al geovisor
const gc_predios_catastro = L.tileLayer.wms('https://geoservicios.yopal.gov.co/geoserver/wms', {
    layers: 'yopal:gc_predios_catastro',
    format: 'image/png',
    transparent: true,
});

// Agregar servicio WMS - u_perimetro para cargar la capa al geovisor
const u_perimetro = L.tileLayer.wms('https://geoservicios.yopal.gov.co/geoserver/wms', {
    layers: 'yopal:u_perimetro',
    format: 'image/png',
    transparent: true,
});

gc_predios_catastro.addTo(map)
u_perimetro.addTo(map)

dynamicMarker(imgIcon('https://leafletjs.com/examples/custom-icons/leaf-green.png'), [10.494444, -75.124167], 0).addTo(map)

L.control.zoom({ position: 'topright' }).addTo(map)

// Agregar minimapa
minimap.addTo(map)

// Agregar control de escala
new L.control.scale({ imperial: false }).addTo(map)



//2.3 adicionar otro plugin de leaflet 

const basemaps = {
    'Mapa uno': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    'Mapa dos': L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }),
    'Mapa tres': L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Datos del mapa: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Estilo del mapa: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    })
}
L.control.layers(basemaps, { 'gc_predios_catastro': gc_predios_catastro, 'u_perimetro': u_perimetro }, { position: 'topright' }).addTo(map)

map.on('click', function (e) {
    // Obtén información detallada del servicio WFS en el lugar del clic
    const url = `https://geoservicios.yopal.gov.co/geoserver/yopal/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=yopal%3Agc_predios_catastro&maxFeatures=50&outputFormat=application%2Fjson&bbox=${e.latlng.lng},${e.latlng.lat},${e.latlng.lng},${e.latlng.lat}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // información  del predio
            const codigo_catastral = data.features[0].properties.codigo_catastral;
            const codigo_catastral_anterior = data.features[0].properties.codigo_catastral_anterior;

            // Muestra el modal con la información
            showModal(codigo_catastral, codigo_catastral_anterior);
        })
        .catch(error => {
            console.error('Error al obtener información del predio', error.message);
            // Puedes mostrar un mensaje de error al usuario o realizar otras acciones según tus necesidades
        });
});

function showModal(codigo_catastral, codigo_catastral_anterior) {

    document.getElementById('modalCodigoCatastral').innerText = codigo_catastral;
    document.getElementById('modalCodigoCatastralAnterior').innerText = codigo_catastral_anterior;

    // Muestra el modal
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
    document.getElementById('myModal').style.zIndex = '10000';
}




