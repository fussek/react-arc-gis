import React, { useEffect } from 'react';
import WebMap from '@arcgis/core/WebMap.js';
import MapView from '@arcgis/core/views/MapView.js';

function Map() {
  useEffect(() => {
    const webmap = new WebMap({
      basemap: 'topo-vector',
    });

    let view = new MapView({
      map: webmap,
      container: 'viewDiv',
    });

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
