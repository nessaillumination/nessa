import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveVisitorLocation } from '../services/api.services';

const useTrackPageVisit = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Attempt to get the user's geolocation
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Send lat/long to the API if successfully retrieved
            await saveVisitorLocation({ latitude, longitude });
          },
          async () => {
            // If geolocation fails, send API request without lat/long
            await saveVisitorLocation();
          }
        );
      } catch (error) {
        console.error('Failed to track visitor location:', error);
      }
    };

    trackVisit();
  }, [location]);
};

export default useTrackPageVisit;
