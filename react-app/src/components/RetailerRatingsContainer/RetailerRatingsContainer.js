import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RetailerRating from "../RetailerRating";

const RetailerRatingsContainer = ({ retailerId }) => {
  const retailer = useSelector(state => state.retailers.retailers[retailerId]);

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
    <div className="mt-2">
      {retailer.ratings.map(rating => (
        <RetailerRating key={rating.id} rating={rating} />
      ))}
    </div>
  );
};

export default RetailerRatingsContainer;
