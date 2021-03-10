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

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-2">
      <h3>Placeholder for AdvSearchBar</h3>
    </div>
  );
};

export default AdvSearchBar;
