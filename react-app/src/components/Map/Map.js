import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ long, lat }) => {
  return (
    <div className="map__container">
      <MapContainer
        center={[lat, long]}
        zoom={13}
        style={{ zIndex: 1, height: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
