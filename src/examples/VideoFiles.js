import { Layer, L } from '../Map';
import BaseMap from './BaseMap';
import React, { Component } from 'react';

const videoUrls = [
  'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
  'https://www.mapbox.com/bites/00188/patricia_nasa.mp4',
];

const bounds = [[32, -130], [13, -100]];

export default () => (
  <BaseMap
    defaultValue={{
      center: [23, -115],
      zoom: 4,
    }}
  >
    <Layer
      type="videoOverlay"
      value={videoUrls}
      options={bounds}
      setOpacity="0.8"
    />
  </BaseMap>
);
