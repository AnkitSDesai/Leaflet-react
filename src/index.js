import React, { Fragment } from 'react';
import { render } from 'react-dom';
import {
  LeafletQuickStart,
  CustomIcons,
  GeoJSON,
  Choropleth,
  VideoFiles,
} from './examples';

const appEl = document.getElementById('root');

const App = () => (
  <Fragment>
    <VideoFiles />
    <Choropleth />
    <GeoJSON />
    <LeafletQuickStart />
    <CustomIcons />
  </Fragment>
);

render(<App />, appEl);
