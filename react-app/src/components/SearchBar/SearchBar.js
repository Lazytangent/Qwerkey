import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getQuery } from '../../store/search';
import { useSearchContext } from '../../context/SearchContext';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchInput, setSearchInput, setSearched } = useSearchContext();

  const updateSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getQuery(searchInput));
    setSearched(true);
    navigate(`/search?query=${searchInput}`);
  };

  return (
    <div className="flex items-center px-2">
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <input
          type="search"
          placeholder="Search..."
          className="w-3/4 p-2 border rounded outline-none dark:border-gray-50 md:w-max border-green dark:focus:border-green focus:border-2 focus:border-purple dark:bg-gray-600"
          value={searchInput}
          onChange={updateSearchInput}
        />
        <button className="w-3/4 p-2 mt-2 border rounded outline-none md:hidden border-green active:bg-green">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
