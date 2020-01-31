import { Map, Tile } from '../Map';
import React from 'react';

const SIZE = 30;
const RATIO = 1.61803398875;

const mapContainerStyle = {
  marginTop: '1rem',
  height: `${SIZE}em`,
  width: `${SIZE * RATIO}em`,
};

const defaultMapState = {
  center: [51.505, -0.09],
  zoom: 13,
  zoomSnap: 0,
  zoomDelta: 0.5,
};

const logEvent = console.log;

export default ({ children, defaultValue, ...props }) => (
  <div style={mapContainerStyle}>
    <Map
      on={{
        resize: logEvent,
        move: logEvent,
        zoom: logEvent,
      }}
      defaultValue={{ ...defaultMapState, ...defaultValue }}
      {...props}
    >
      <Tile type="wiki" />
      {children}
    </Map>
  </div>
);
