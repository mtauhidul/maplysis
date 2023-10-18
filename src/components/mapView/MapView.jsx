import mapboxgl from 'mapbox-gl';
import React from 'react';

const MapView = () => {
  const mapContainer = React.useRef(null);
  const [lng, setLng] = React.useState(-70.9);
  const [lat, setLat] = React.useState(42.35);
  const [zoom, setZoom] = React.useState(9);

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

    return () => map.remove();
  }, []);

  return (
    <div>
      <div>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
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
