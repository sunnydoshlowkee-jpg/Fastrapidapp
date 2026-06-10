import { useEffect, useRef } from 'react';
import { pingLocation } from '../services/riderLocationService';

export const useRiderLocationTracking = (isOnline) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isOnline) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const sendLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            pingLocation(latitude, longitude).catch((err) => {
              console.error('Failed to ping location', err);
            });
          },
          (error) => {
            console.error('Geolocation error', error);
          },
          { enableHighAccuracy: true }
        );
      }
    };

    // Send immediately when online
    sendLocation();

    // Set up interval for every 30 seconds
    intervalRef.current = setInterval(sendLocation, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOnline]);
};
