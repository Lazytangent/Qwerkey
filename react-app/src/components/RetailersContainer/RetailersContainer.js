import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Retailer from "../Retailer";

const RetailersContainer = () => {
  const retailers = useSelector(state => state.retailers);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (retailers) {
      setIsLoaded(true);
    }
  }, [retailers]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <h2>Placeholder for RetailersContainer</h2>
      {Object.values(retailers).map(retailer => (
        <>
          <Retailer retailer={retailer} />
        </>
      ))}
    </>
  );
};

export default RetailersContainer;
