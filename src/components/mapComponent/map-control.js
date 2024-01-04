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
import 'leaflet-ajax'
console.log('leaflet-ajax loaded successfully')

const openModalButton = document.getElementById('open-modal-button')

const L = require('leaflet')

//Localizar y cambiar el mapa por el municipio de Repelón

export const map = L.map('map', {
    center: [10.494444, -75.124167], //coordenadas de REPELON
    zoom: 15,
    zoomControl: true,
    layers: [carto_light]
})
// Agregar servicio WMS - gc_predios_catastro para cargar la capa al geovisor
const gc_predios_catastro = L.tileLayer.wms('http://localhost:1234/geoserver/yopal/wms', {
    layers: 'yopal:gc_predios_catastro',
    format: 'image/png',
    transparent: true
})

gc_predios_catastro.addTo(map)

// geoJSON para mostrar el código catastral y el código catastral anterior.
const geoJsonLayer = new L.geoJSON.ajax('https://geoservicios.yopal.gov.co/geoserver/yopal/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=yopal%3Agc_predios_catastro&maxFeatures=50&outputFormat=application%2Fjson', {
    onEachFeature: function (feature, layer) {
        // Bind Popup por defecto
        // Asocia un evento de clic para mostrar el modal personalizado
        openModalButton.addEventListener('click', function () {
            // Llama a la función showFeatureModal con datos de ejemplo
            showFeatureModal(openModalButton, feature.properties)
        })
    }
}).addTo(map)

function showFeatureModal(parentElement, properties) {
    const modal = document.createElement('div')
    const modalContent = `<div>
        <p>Código Catastral:${properties.codigo_catastral}</p>
        <p>Código Catastral Anterior:${properties.codigo_catastral_anterior}</p></div>`

    modal.innerHTML = modalContent
    modal.className = 'custom-modal'
    parentElement.appendChild(modal)

    modal.style.backgroundColor = 'white'
    modal.style.padding = '20px'
    modal.style.border = '1px solid #ccc'
    modal.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
    modal.style.zIndex = '1000'

}

dynamicMarker(imgIcon('https://leafletjs.com/examples/custom-icons/leaf-green.png'), [10.494444, -75.124167], 0).addTo(map)

L.control.zoom({ position: 'topright' }).addTo(map)

// Agregar minimapa
minimap.addTo(map)

// Agregar control de escala
new L.control.scale({ imperial: false }).addTo(map)

// Agregar servicio WMS - u_perimetro para cargar la capa al geovisor
const u_perimetro = L.tileLayer.wms('http://localhost:1234/geoserver/yopal/wms', {
    layers: 'yopal:u_perimetro',
    format: 'image/png',
    transparent: true
})
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
