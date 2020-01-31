import { Layer, L } from '../Map';
import BaseMap from './BaseMap';
import React from 'react';
import data from './data.geo.json';

const { bicycleRental, campus, freeBus, coorsField } = data;

const BASEBALL_ICON =
  'http://leafletjs.com/examples/geojson/baseball-marker.png';

const baseballIcon = L.icon({
  iconUrl: BASEBALL_ICON,
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28],
});

function onEachFeature({ geometry, properties }, layer) {
  const defaultMsg = `<p>I started out as a GeoJSON ${
    geometry.type
  }, but now I'm a Leaflet vector!</p>`;

  const popupContent = properties.popupContent
    ? defaultMsg + properties.popupContent
    : defaultMsg;

  layer.bindPopup(popupContent);
}

const style = ({ properties }) => properties.style;

const circleMarker = (feature, latlng) =>
  L.circleMarker(latlng, {
    radius: 8,
    fillColor: '#ff7800',
    color: '#000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  });

const freeBusFilter = ({ properties }) => !properties.underConstruction;

const baseballMarker = (feature, latlng) =>
  L.marker(latlng, { icon: baseballIcon });

const mapState = {
  center: [39.74739, -105],
  zoom: 14,
  zoomDelta: 0.5,
};

const GeoJSON = props => <Layer type="geoJSON" {...props} />;

export default () => (
  <BaseMap defaultValue={mapState}>
    <GeoJSON
      value={coorsField}
      options={{
        pointToLayer: baseballMarker,
        onEachFeature,
      }}
    />

    <GeoJSON
      value={freeBus}
      options={{
        filter: freeBusFilter,
        onEachFeature,
      }}
    />

    <GeoJSON
      value={[bicycleRental, campus]}
      options={{
        style,
        onEachFeature,
        pointToLayer: circleMarker,
      }}
    />
  </BaseMap>
);
