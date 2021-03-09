import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput, searched, setSearched }}>
      { children }
    </SearchContext.Provider>
  );
};

export default SearchProvider;
