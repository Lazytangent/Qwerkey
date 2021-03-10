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
  const [type, setType] = useState("");
  const [field, setField] = useState("");

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
    history.push(`/search?query=${searchInput}${type ? `&type=${type}` : ""}${field ? `&field=${field}` : ""}`);
    setSearched(true);
  };

  return (
    <div className="p-2">
      <h3>Placeholder for AdvSearchBar</h3>
      <form onSubmit={submitHandler}>
        <input type="search" value={searchInput} onChange={updateSearchInput} />
        <select value={type} onChange={updateType}></select>
        {type && <select value={field} onChange={updateField}></select>}
      </form>
    </div>
  );
};

export default AdvSearchBar;
