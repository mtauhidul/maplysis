import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import React from 'react';

const MapView = ({ dataPoints, targetDataPoints, radius }) => {
  console.log('dataPoints', dataPoints);
  console.log('targetDataPoints', targetDataPoints);
  console.log('radius', radius);
  const mapContainer = React.useRef(null);
  const [lng, setLng] = React.useState(-101.79547);
  const [lat, setLat] = React.useState(35.23074);
  const [zoom, setZoom] = React.useState(5);

  React.useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWlydGF1aGlkIiwiYSI6ImNsa3JhY2kycTJpZnkzcXA0c3hhN3drYjgifQ._WEdlgoVnMegvN5c84Xqtg';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('load', () => {
      // Combine zipCodes and targetZipCodes, removing duplicates
      const combinedZipCodes = [...dataPoints, ...targetDataPoints].reduce(
        (acc, current) => {
          const x = acc.find((item) => item.zip === current.zip);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        },
        []
      );

      combinedZipCodes.forEach((zipCode) => {
        const isTarget = targetDataPoints.some(
          (targetZipCode) => targetZipCode.zip === zipCode.zip
        );

        let color;
        if (isTarget) {
          color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        } else {
          color = '#fff';
        }

        // Create a new HTML element for the marker
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = color;
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.justifyContent = 'center';
        el.style.alignItems = 'center';
        el.innerText = zipCode.dre || '*';

        // Use the custom HTML element as the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([zipCode.lng, zipCode.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${zipCode.zip}</h3>`
            )
          )
          .addTo(map);

        if (isTarget) {
          const center = turf.point([zipCode.lng, zipCode.lat]);
          const options = {
            steps: 80,
            units: 'miles',
            properties: { fill: color },
          };
          const circle = turf.circle(center, radius, options);

          // Add the circle layer
          map.addLayer({
            id: `${zipCode.zip}-circle`,
            type: 'fill',
            source: {
              type: 'geojson',
              data: circle,
            },
            paint: {
              'fill-color': color,
              'fill-opacity': 0.4,
            },
          });

          // Add a line layer with the same source to create a border
          map.addLayer({
            id: `${zipCode.zip}-circle-border`,
            type: 'line',
            source: {
              type: 'geojson',
              data: circle,
            },
            paint: {
              'line-color': '#8B8B8B', // Set the border color here
              'line-width': 1, // Set the border width here
            },
          });
        }
      });
    });

    return () => map.remove();
  }, [dataPoints, targetDataPoints]);

  return (
    <div>
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          height: '100%',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
        }}
        ref={mapContainer}
        className='map-container'
      />
    </div>
  );
};

export default MapView;
