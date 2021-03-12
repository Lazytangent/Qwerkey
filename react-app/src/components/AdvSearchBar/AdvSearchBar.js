import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getQuery } from "../../store/search";
import { useSearchContext } from "../../context/SearchContext";

const AdvSearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setSearched } = useSearchContext();

  const [searchInput, setSearchInput] = useState("");
  const [type, setType] = useState("Type...");
  const [field, setField] = useState("Field...");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const updateSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const updateType = (e) => {
    setType(e.target.value);
  };

  const updateField = (e) => {
    setField(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(getQuery(searchInput, type, field));
    history.push(`/search?query=${searchInput}${type !== "Type..." ? `&type=${type}` : ""}${field !== "Field..." ? `&field=${field}` : ""}`);
    setSearched(true);
  };

  const types = [
    "Post",
    "Comment",
    "Retailer",
  ];

  const postFields = [
    "title",
    "body",
  ];

  const commentFields = [
    "body",
  ];

  const retailerFields = [
    "name",
    "description",
    "rating",
    "state",
  ];

  return (
    <div className="p-2">
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <input className="w-3/4 p-2 mx-2 mb-2 border rounded outline-none focus:border-green dark:bg-gray-800 dark:text-gray-50" type="search" value={searchInput} placeholder="Advanced Search..." onChange={updateSearchInput} />
        <div className="w-3/4 grid grid-cols-2 gap-2">
          <select value={type} className="p-1 py-2 mb-2 border rounded dark:bg-gray-800 dark:text-gray-50 col-start-1" onChange={updateType}>
          <option disabled={true} value="Type...">Type...</option>
          {types.map(type => <option value={type} key={type}>{type}</option>)}
        </select>
        {type !== "Type..." && (
          <select value={field} onChange={updateField} className="px-1 py-2 mb-2 border rounded dark:bg-gray-800 dark:text-gray-50 col-start-2">
            <option disabled={true} value="Field...">Field...</option>
            {type === "Post" && (
              <>
                {postFields.map(field => <option value={field} key={field}>{field}</option>)}
              </>
            )}
            {type === "Comment" && (
              <>
                {commentFields.map(field => <option value={field} key={field}>{field}</option>)}
              </>
            )}
            {type === "Retailer" && (
              <>
                {retailerFields.map(field => <option value={field} key={field}>{field}</option>)}
              </>
            )}
          </select>
        )}
        </div>
        <button className="w-1/4 p-2 mx-2 border rounded hover:border-green focus:bg-green">Search</button>
      </form>
    </div>
  );
};

export default AdvSearchBar;
