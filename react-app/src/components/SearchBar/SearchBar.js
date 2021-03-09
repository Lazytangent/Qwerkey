import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getQuery } from "../../store/search";
import { useSearchContext } from "../../context/SearchContext";

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchInput, setSearchInput } = useSearchContext();

  const updateSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getQuery(searchInput));
    history.push(`/search?query=${searchInput}`);
  };

  return (
    <div className="flex items-center px-2">
      <form onSubmit={submitHandler}>
        <input type="search" placeholder="Search..." className="p-2 rounded" value={searchInput} onChange={updateSearchInput} />
      </form>
    </div>
  );
};

export default SearchBar;
