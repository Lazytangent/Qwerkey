import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getOneRetailer } from "../../store/retailers";
import Retailer from "../Retailer";
import RetailerRating from "../RetailerRating";

const RetailerPage = () => {
  const { retailerId } = useParams();
  const dispatch = useDispatch();
  const retailer = useSelector(state => state.retailers[retailerId]);

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
          {retailer.ratings.map(rating => (
            <RetailerRating key={rating.id} rating={rating} />
          ))}
        </>
      )}
    </>
  );
};

export default RetailerPage;
