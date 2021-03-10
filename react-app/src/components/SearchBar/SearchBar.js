import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getQuery } from "../../store/search";
import { useSearchContext } from "../../context/SearchContext";

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchInput, setSearchInput, setSearched } = useSearchContext();

  const updateSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getQuery(searchInput));
    setSearched(true);
    history.push(`/search?query=${searchInput}`);
  };

  return (
    <div className="flex items-center px-2">
      <form onSubmit={submitHandler}>
        <input type="search" placeholder="Search..." className="p-2 border rounded outline-none border-green dark:border-purple dark:focus:border-green focus:border-purple dark:bg-gray-600" value={searchInput} onChange={updateSearchInput} />
      </form>
    </div>
  );
};

export default SearchBar;
