import 'leaflet/dist/leaflet.css';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';

const L =require ('leaflet');
import 'leaflet-minimap';
import {standard_osm_mm} from '../layers/control-layers'

export var minimap= new L.Control.MiniMap(standard_osm_mm, 
{ 
    toggleDisplay: true ,
    minimized:false,
    position: "bottomleft"
})

