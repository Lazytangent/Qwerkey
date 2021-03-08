import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RetailerRating from "../RetailerRating";

const RetailerRatingsContainer = ({ retailerId }) => {
  const retailer = useSelector(state => state.retailers[retailerId]);

  const [isLoaded, setIsLoaded] = useState(false);

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
      <h2>Placeholder for RetailerRatingsContainer</h2>
      {retailer.ratings.map(rating => (
        <RetailerRating key={rating.id} rating={rating} />
      ))}
    </>
  );
};

export default RetailerRatingsContainer;
