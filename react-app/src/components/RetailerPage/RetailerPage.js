import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getOneRetailer } from "../../store/retailers";
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
    if (retailer) {
      setIsLoaded(true);
      if (!(retailer.lng || retailer.lat)) {

      }
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
        </>
      )}
      <Map long={51.505} lat={-0.09} />
      <RetailerRatingsContainer retailerId={retailer.id} />
    </>
  );
};

export default RetailerPage;
