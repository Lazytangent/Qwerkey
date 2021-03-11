import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRetailers, getMaxNumberOfRetailers } from "../../store/retailers";
import Retailer from "../Retailer";

const RetailersContainer = () => {
  const dispatch = useDispatch();
  const retailers = useSelector((state) => state.retailers.retailers);
  const maxRetailers = useSelector(state => state.retailers.max);

  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMaxNumberOfRetailers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRetailers(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (retailers) {
      setIsLoaded(true);
    }
  }, [retailers]);

  useEffect(() => {
    const scrollListener = () => {
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scroll / height;
      if (page < maxRetailers / 20 - 1 && Object.values(retailers).length < maxRetailers && scrolled > 0.9) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [page, maxRetailers, retailers]);

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
