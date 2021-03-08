import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Retailer from "../Retailer";

const RetailerPage = () => {
  const { retailerId } = useParams();
  const retailer = useSelector(state => state.retailer ? state.retailers[retailerId] : null);

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
      <h2>Placeholder for RetailerPage</h2>
      {retailer && (
        <>
          <Retailer retailer={retailer} />
        </>
      )}
    </>
  );
};

export default RetailerPage;
