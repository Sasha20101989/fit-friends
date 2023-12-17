import { Location } from './location.enum';

export type Coordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export interface LocationCoordinatesMap {
  [Location.Pioneer]: Coordinates;
  [Location.Petrograd]: Coordinates;
  [Location.Udelnaya]: Coordinates;
  [Location.Zvezdnaya]: Coordinates;
  [Location.Sportivnaya]: Coordinates;
}

export const locationCoordinates: LocationCoordinatesMap = {
  [Location.Pioneer]: { latitude: 60.00259100, longitude: 30.29720300, zoom: 12 },
  [Location.Petrograd]: { latitude: 59.96665400, longitude: 30.31127900, zoom: 12 },
  [Location.Udelnaya]: { latitude: 60.01665200, longitude: 30.31510900, zoom: 12 },
  [Location.Zvezdnaya]: { latitude: 59.83336500, longitude: 30.34904500, zoom: 12 },
  [Location.Sportivnaya]: { latitude: 59.95193800, longitude: 30.29113100, zoom: 12 },
};

