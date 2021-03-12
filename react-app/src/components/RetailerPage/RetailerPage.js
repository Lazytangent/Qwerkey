import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getOneRetailer, getOneRetailerLocation } from "../../store/retailers";
import Retailer from "../Retailer";
import RetailerRatingsContainer from "../RetailerRatingsContainer";
import RetailerRatingForm from "../RetailerRatingForm";
import Map from "../Map";

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
    (async () => {
      if (retailer) {
        if (!(retailer.lng || retailer.lat)) {
          await dispatch(getOneRetailerLocation(retailerId));
        }
        setIsLoaded(true);
      }
    })();
  }, [retailer, retailerId, dispatch]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {retailer && (
        <>
          <Retailer retailer={retailer} />
          {retailer.lat && retailer.lng && (
            <Map long={retailer.lng} lat={retailer.lat} />
          )}
          {user && retailer.owner.id !== user.id && (
            <RetailerRatingForm retailerId={retailer.id} />
          )}
          <RetailerRatingsContainer retailerId={retailer.id} />
        </>
      )}
    </>
  );
};

export default RetailerPage;
