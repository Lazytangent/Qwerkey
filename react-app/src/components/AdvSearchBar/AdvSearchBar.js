import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import csc from "country-state-city";

import { getQuery } from "../../store/search";
import { useSearchContext } from "../../context/SearchContext";

const AdvSearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setSearched } = useSearchContext();

  const [searchInput, setSearchInput] = useState("");
  const [type, setType] = useState("Type...");
  const [field, setField] = useState("Field...");
  const [state, setState] = useState("State...");
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("State...");
  const [city, setCity] = useState("City...");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (stateCode !== "State...") {
      setCities(csc.getCitiesOfState("US", stateCode));
      setState(
        csc
          .getStatesOfCountry("US")
          .find((state) => state.isoCode === stateCode)
      );
    } else {
      setState("");
    }
  }, [stateCode]);

  useEffect(() => {
    if (state) {
      setStateName(state.name);
    }
  }, [state]);

  const updateSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const updateType = (e) => {
    setType(e.target.value);
  };

  const updateField = (e) => {
    setField(e.target.value);
  };

  const updateState = (e) => {
    setStateCode(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(getQuery(searchInput, type, field, stateName, city !== "City..." ? city : undefined));
    history.push(
      `/search?query=${searchInput}${
        type !== "Type..." ? `&type=${type}` : ""
      }${field !== "Field..." ? `&field=${field}` : ""}${
        stateName && field === "Location" ? `&state=${stateName}` : ""
      }${city !== "City..." ? `&city=${city}` : ""}`
    );
    setSearched(true);
  };

  const types = ["Post", "Comment", "Retailer"];

  const postFields = ["Title", "Body"];

  const commentFields = ["Body"];

  const retailerFields = ["Name", "Description", "Rating", "Location"];

  const states = csc.getStatesOfCountry("US");

  return (
    <div className="p-2">
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <input
          className="w-3/4 p-2 mx-2 mb-2 border rounded outline-none focus:border-green dark:bg-gray-800 dark:text-gray-50"
          type="search"
          value={searchInput}
          placeholder="Advanced Search..."
          onChange={updateSearchInput}
        />
        <div className="w-3/4 grid grid-cols-2 gap-2">
          <select
            value={type}
            className="p-1 py-2 mb-2 border rounded dark:bg-gray-800 dark:text-gray-50 col-start-1"
            onChange={updateType}
          >
            <option disabled={true} value="Type...">
              Type...
            </option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
          {type !== "Type..." && (
            <select
              value={field}
              onChange={updateField}
              className="px-1 py-2 mb-2 border rounded dark:bg-gray-800 dark:text-gray-50 col-start-2"
            >
              <option disabled={true} value="Field...">
                Field...
              </option>
              {type === "Post" && (
                <>
                  {postFields.map((field) => (
                    <option value={field} key={field}>
                      {field}
                    </option>
                  ))}
                </>
              )}
              {type === "Comment" && (
                <>
                  {commentFields.map((field) => (
                    <option value={field} key={field}>
                      {field}
                    </option>
                  ))}
                </>
              )}
              {type === "Retailer" && (
                <>
                  {retailerFields.map((field) => (
                    <option value={field} key={field}>
                      {field}
                    </option>
                  ))}
                </>
              )}
            </select>
          )}
        </div>
        <div className="w-3/4 grid grid-cols-2 gap-2">
          {type === "Retailer" && field === "Location" && (
            <select
              value={stateCode}
              onChange={updateState}
              className="px-1 py-2 mb-2 border rounded dark:bg-gray-800 dark:text-gray-50 col-start-1"
            >
              <option value="State...">
                State...
              </option>
              {states &&
                states.map((state) => (
                  <option value={state.isoCode} key={state.name}>
                    {state.name}
                  </option>
                ))}
            </select>
          )}
          {stateCode !== "State..." && (
            <select
              value={city}
              onChange={updateCity}
              className="px-1 py-2 mb-2 border rounded dark:bg-gray-800 dark:text-gray-50 col-start-2"
            >
              <option value="City...">
                City...
              </option>
              {cities.map((city) => (
                <option value={city.name} key={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button className="w-1/4 p-2 mx-2 border rounded hover:border-green focus:bg-green">
          Search
        </button>
      </form>
    </div>
  );
};

export default AdvSearchBar;
