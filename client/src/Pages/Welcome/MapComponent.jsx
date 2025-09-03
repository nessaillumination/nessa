import { useEffect } from 'react';

const MapComponent = ({ data }) => {
  useEffect(() => {
    // Load Leaflet CSS
    const loadCSS = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css';
      document.head.appendChild(link);
    };

    // Load Leaflet JS
    const loadJS = () => {
      return new Promise((resolve) => {
        if (window.L) {
          resolve(window.L);
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js';
        script.onload = () => resolve(window.L);
        document.body.appendChild(script);
      });
    };

    // Initialize map after resources are loaded
    const initMap = async () => {
      loadCSS();
      const L = await loadJS();
      
      const map = L.map('map').setView([20, 0], 2);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      // Add markers for each location
      data.forEach(location => {
        L.marker([location.latitude, location.longitude])
          .bindPopup(`
            <b>${location.cityName}, ${location.countryName}</b><br>
            IP: ${location.ipAddress}<br>
            Region: ${location.regionName}
          `)
          .addTo(map);
      });
      
      return map;
    };
    
    let map;
    initMap().then(m => map = m);
    
    return () => {
      if (map) map.remove();
    };
  }, [data]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div id="map" className="h-80 rounded-lg" />
    </div>
  );
};

export default MapComponent;