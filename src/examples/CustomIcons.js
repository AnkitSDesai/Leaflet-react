import { Layer, L } from '../Map';
import BaseMap from './BaseMap';
import React from 'react';

const ICON = {
  green: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
  red: 'http://leafletjs.com/examples/custom-icons/leaf-red.png',
  orange: 'http://leafletjs.com/examples/custom-icons/leaf-orange.png',
  shadow: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
};

const defaultIconOptions = {
  shadowUrl: ICON.shadow,
  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
};

const LeafIcon = color =>
  L.icon({
    ...defaultIconOptions,
    iconUrl: ICON[color],
  });

const LeafMarker = ({ color, ...props }) => (
  <Layer
    type="marker"
    options={{ ...props.options, icon: LeafIcon(color) }}
    {...props}
  />
);

export default () => (
  <BaseMap>
    <LeafMarker
      value={[51.5, -0.09]}
      color="green"
      bindPopup="I am a green leaf"
    />
    <LeafMarker
      value={[51.495, -0.083]}
      color="red"
      bindPopup="I am a red leaf"
    />
    <LeafMarker
      value={[51.49, -0.1]}
      color="orange"
      bindPopup="I am an orange leaf"
    />
  </BaseMap>
);
