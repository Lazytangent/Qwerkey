import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { retailers as retailersSelectors } from '../../store/selectors';
import { getRetailers, getMaxNumberOfRetailers } from "../../store/retailers";
import Retailer from "../Retailer";

const RetailersContainer = () => {
  const dispatch = useDispatch();
  const retailers = useSelector(retailersSelectors.all());
  const maxRetailers = useSelector(retailersSelectors.max());

  const [page, setPage] = useState(1);
  const [currentRetailers, setCurrentRetailers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getMaxNumberOfRetailers());
  }, [dispatch]);

  useEffect(() => {
    if (page * 20 - maxRetailers < 20) {
      dispatch(getRetailers(page));
    }
  }, [dispatch, page, maxRetailers]);

  useEffect(() => {
    if (retailers) {
      setIsLoaded(true);
      setCurrentRetailers(Object.values(retailers));
    }
  }, [retailers]);

  useEffect(() => {
    if (page * 20 > maxRetailers) {
      setCurrentRetailers(prev => prev.concat(Object.values(retailers).slice(0, page * 20 % maxRetailers)));
    }
  }, [retailers, maxRetailers, page]);

  useEffect(() => {
    const scrollListener = () => {
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scroll / height;
      if (scrolled > 0.9) {
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
      {currentRetailers.map((retailer) => (
        <Retailer key={uuidv4()} retailer={retailer} />
      ))}
    </>
  );
};

export default RetailersContainer;
