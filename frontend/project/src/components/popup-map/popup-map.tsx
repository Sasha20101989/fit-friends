import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useEffect, useRef } from 'react';
import { Location } from '../../types/location.enum';
import { locationCoordinates } from '../../types/coordinates';
import useMap from '../../hooks/use-map/useMap';
import { URL_USER_MARKER } from '../../const';

const mapStyles = {
  height: '500px',
  className:'popup__map'
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_USER_MARKER,
  iconSize: [40, 49],
  iconAnchor: [20, 49]
});

type PopupMapProps = {
  station: Location | null;
  onClose: () => void;
}

function PopupMap({ station, onClose }: PopupMapProps): JSX.Element | null {
  const mapRef = useRef<HTMLDivElement>(null);

  const map = useMap(mapRef, station);

  useEffect(() => {
    if (station && station !== Location.Unknown) {
      const coordinates = locationCoordinates[station];
      const markers: Marker[] = [];

      if(map && coordinates){
        const marker: Marker = new Marker({
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        });

        marker.setIcon(defaultCustomIcon);
        marker.addTo(map);
        markers.push(marker);
      }
    }
  }, [map, station]);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if(!station){
    return null;
  }

  return (
    <div className="popup-form popup-form--map">
      <section className="popup">
        <div className="popup__wrapper popup__wrapper--map">
          <div className="popup-head popup-head--address">
            <h2 className="popup-head__header">Валерия</h2>
            <p className="popup-head__address">
              <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg><span>{`ст. м. ${station}`}</span>
            </p>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div ref={mapRef} style={mapStyles}/>
        </div>
      </section>
    </div>
  );
}

export default memo(PopupMap);
