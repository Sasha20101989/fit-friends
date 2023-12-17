import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import { Location } from '../../types/location.enum';
import { locationCoordinates } from '../../types/coordinates';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>, station: Location): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const coordinates = locationCoordinates[station];

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: coordinates.latitude,
          lng: coordinates.longitude
        },
        zoom: coordinates.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, station, coordinates.latitude, coordinates.longitude, coordinates.zoom]);

  useEffect(() => {
    if (map !== null) {
      map.panTo({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      });
    }
  }, [map, station, coordinates.latitude, coordinates.longitude]);

  return map;
}

export default useMap;
