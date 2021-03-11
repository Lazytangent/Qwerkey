import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRetailers } from "../../store/retailers";

import Retailer from "../Retailer";

const RetailersContainer = () => {
  const dispatch = useDispatch();
  const retailers = useSelector((state) => state.retailers.retailers);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getRetailers(1));
  }, [dispatch]);

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
      {Object.values(retailers).map((retailer) => (
        <Retailer key={retailer.id} retailer={retailer} />
      ))}
    </>
  );
};

export default RetailersContainer;
