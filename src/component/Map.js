import React, { useEffect } from 'react';
import WebMap from '@arcgis/core/WebMap.js';
import MapView from '@arcgis/core/views/MapView.js';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer.js';

function Map() {
  useEffect(() => {
    const webmap = new WebMap({
      basemap: 'gray-vector',
    });

    const renderer = {
      type: 'simple',
      field: 'mag',
      symbol: {
        type: 'simple-marker',
        color: 'orange',
        outline: {
          color: 'white',
        },
      },
      visualVariables: [
        {
          type: 'size',
          field: 'mag',
          stops: [
            {
              value: 2.5,
              size: '4px',
            },
            {
              value: 8,
              size: '40px',
            },
          ],
        },
      ],
    };

    const template = {
      title: 'Earthquake Info',
      content: 'Magnitude {mag} {type} hit {place} on {time}',
      fieldInfos: [
        {
          fieldName: 'time',
          format: {
            dateFormat: 'short-date-short-time',
          },
        },
      ],
    };
    let view = new MapView({
      map: webmap,
      center: [-168, 46],
      zoom: 2,
      container: 'viewDiv',
    });

    const geojsonLayer = new GeoJSONLayer({
      url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
      copyright: 'USGS Earthquakes',
      popupTemplate: template,
      renderer: renderer,
      orderBy: {
        field: 'mag',
      },
    });

    webmap.add(geojsonLayer);

    return () => {
      // close the map view
      if (!!view) {
        view.destroy();
        view = null;
      }
    };
  });
  return <div style={{ height: 800 }} id='viewDiv'></div>;
}

export default Map;
