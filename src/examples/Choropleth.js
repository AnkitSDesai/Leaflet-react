import { Layer, L } from '../Map';
import BaseMap from './BaseMap';
import React, { Component } from 'react';
import usStates from './us-states.geo.json';

const COLORS = {
  1000: '#800026',
  500: '#BD0026',
  200: '#E31A1C',
  100: '#FC4E2A',
  50: '#FD8D3C',
  20: '#FEB24C',
  10: '#FED976',
  0: '#FFEDA0',
};

const getColor = d => {
  const key = Object.keys(COLORS)
    .reverse()
    .find(x => d > x);
  return COLORS[key];
};

const style = ({ properties }) => ({
  fillColor: getColor(properties.density),
  weight: 2,
  opacity: 1,
  color: 'white',
  dashArray: '3',
  fillOpacity: 0.7,
});

function zoomToFeature({ target }) {
  target._map.fitBounds(target.getBounds().pad(0.05));
}

export default class Choropleth extends Component {
  handleInfo = info => {
    info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    info.update = function(props) {
      this._div.innerHTML = `
      <h4>US Population Density</h4>
      ${
        props
          ? `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>`
          : 'Hover over a state'
      }`;
    };

    this.info = info;
  };

  handleLegend = layer => {
    layer.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = Object.keys(COLORS);

      const labels = grades.map((from, i) => {
        const to = grades[i + 1];

        return `
          <div>
            <i style="background:${COLORS[from]}"></i>
            ${from}${to ? '&ndash;' + to : '+'}
          </div>
        `;
      });

      div.innerHTML = labels.join('');
      return div;
    };
  };

  highlightFeature = ({ target }) => {
    target.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      target.bringToFront();
    }

    this.info.update(target.feature.properties);
  };

  resetHighlight = ({ target }) => {
    target.setStyle(style(target.feature));
    this.info.update();
  };

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: zoomToFeature,
    });
  };

  render() {
    return (
      <BaseMap defaultValue={{ center: [37.8, -96], zoom: 4 }}>
        <Layer
          type="geoJSON"
          value={usStates}
          options={{ style, onEachFeature: this.onEachFeature }}
        />
        <Layer
          type="control"
          layerRef={this.handleLegend}
          value={{ position: 'bottomright' }}
        />
        <Layer
          type="control"
          layerRef={this.handleInfo}
          value={{ position: 'topright' }}
        />
        <style>{`
          .info {
            padding: .75rem;
            background: white;
            background: rgba(255,255,255,0.8);
            box-shadow: 0 0 1rem rgba(0,0,0,0.2);
            border-radius: .25rem;
          } 
          .info h4 {
            margin: 0 0 5px;
            color: #777;
          }
          .legend {
            line-height: 1.5em;
            color: #555;
          }
          .legend i {
            width: 1em;
            height: 1em;
            float: left;
            margin-right: .5em;
            opacity: 0.7;
          }
        `}</style>
      </BaseMap>
    );
  }
}
