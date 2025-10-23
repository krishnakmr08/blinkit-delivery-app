import axios from 'axios';
import { GOOGLE_MAP_API } from './config';
import { updateUserLocation } from './authService';

const GEOCODE_STATUS_OK = 'OK';

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
  setUser: any,
) => {
  console.log(latitude,longitude)
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API}`,
    );

    if (response.data.status === GEOCODE_STATUS_OK) {
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        updateUserLocation(
          { liveLocation: { latitude, longitude }, address },
          setUser,
        );
      } else {
        console.error('No results found for the given coordinates');
      }
    } else {
      console.error('Geo code Failed ', response.data);
    }
  } catch (error) {
    console.error('Geo code Failed', error);
  }
};
