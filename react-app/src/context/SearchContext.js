import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export useSearchContext = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      { children }
    </SearchContext.Provider>
  );
};

export default SearchProvider;
