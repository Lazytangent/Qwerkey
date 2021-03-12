import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { getOneRetailer } from "../../store/retailers";
import Retailer from "../Retailer";
import RetailerRatingsContainer from "../RetailerRatingsContainer";
import RetailerRatingForm from "../RetailerRatingForm";

const RetailerPage = () => {
  const { retailerId } = useParams();
  const dispatch = useDispatch();
  const retailer = useSelector(
    (state) => state.retailers.retailers[retailerId]
  );
  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getOneRetailer(retailerId));
  }, [dispatch, retailerId]);

  useEffect(() => {
    if (retailer) {
      setIsLoaded(true);
    }
  }, [retailer]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {retailer && (
        <>
          <Retailer retailer={retailer} />
          {user && retailer.owner.id !== user.id && (
            <RetailerRatingForm retailerId={retailer.id} />
          )}
          <RetailerRatingsContainer retailerId={retailer.id} />
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </>
      )}
    </>
  );
};

export default RetailerPage;
