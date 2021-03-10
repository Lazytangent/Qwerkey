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
  ];

  return (
    <div className="p-2">
      <h3>Placeholder for AdvSearchBar</h3>
      <form onSubmit={submitHandler}>
        <input type="search" value={searchInput} placeholder="Advanced Search..." onChange={updateSearchInput} />
        <select value={type} onChange={updateType}>
          <option disabled={true} value="Type...">Type...</option>
          {types.map(type => <option value={type}>{type}</option>)}
        </select>
        {type !== "Type..." && (
          <select value={field} onChange={updateField}>
            <option disabled={true} value="Field...">Field...</option>
            {type === "Post" && (
              <>
                {postFields.map(field => <option value={field}>{field}</option>)}
              </>
            )}
            {type === "Comment" && (
              <>
                {commentFields.map(field => <option value={field}>{field}</option>)}
              </>
            )}
            {type === "Retailer" && (
              <>
                {retailerFields.map(field => <option value={field}>{field}</option>)}
              </>
            )}
          </select>
        )}
      </form>
    </div>
  );
};

export default AdvSearchBar;
