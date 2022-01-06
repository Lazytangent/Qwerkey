import { useContext, useState, createContext } from 'react';

const RetailerRatingContext = createContext();

export const useRetailerRatingContext = () => useContext(RetailerRatingContext);

const RetailerRatingProvider = ({ children }) => {
  const [retailerRating, setRetailerRating] = useState();

  return (
    <RetailerRatingContext.Provider
      value={{ retailerRating, setRetailerRating }}
    >
      {children}
    </RetailerRatingContext.Provider>
  );
};

export default RetailerRatingProvider;
