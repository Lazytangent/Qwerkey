import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ long, lat }) => {
  return (
    <div className="map__container">
      <MapContainer center={[long, lat]} zoom={13} style={{ height: "400px" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[long, lat]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
