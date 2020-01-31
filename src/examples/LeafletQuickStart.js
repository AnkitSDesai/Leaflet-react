import { Layer } from '../Map';
import BaseMap from './BaseMap';
import React from 'react';

export default () => (
  <BaseMap>
    <Layer
      type="marker"
      value={[51.5, -0.09]}
      bindPopup="<b>Hello world!</b><br>I am a popup."
    />
    <Layer
      bindPopup="I am a circle."
      type="circle"
      value={[51.508, -0.11]}
      options={{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500,
      }}
    />
    <Layer
      bindPopup="I am a polygon."
      type="polygon"
      value={[[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]}
    />
  </BaseMap>
);
