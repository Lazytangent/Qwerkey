import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import csc from "country-state-city";

import { session } from '../../store/selectors';
import { createMeetup } from "../../store/meetups";
import FormTitle from "../parts/FormTitle";
import FormErrors from "../parts/FormErrors";
import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const CreateMeetup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(session.user());

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState("State...");
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("State...");
  const [city, setCity] = useState("City...");
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState([]);

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
    } else {
      setStateName("");
    }
  }, [state]);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  const updateState = (e) => {
    setStateCode(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const meetupData = {
      name,
      description,
      city,
      state: stateName,
      user_id: user.id,
      date: new Date(date).toISOString(),
    };
    const meetup = await dispatch(createMeetup(meetupData));
    if (meetup.errors) {
      setErrors(meetup.errors);
    } else {
      history.push(`/meetups/${meetup.id}`);
    }
  };

  const states = csc.getStatesOfCountry("US");

  return (
    <>
      <form onSubmit={submitHandler}>
        <FormTitle title="Create a Meetup" />
        <FormErrors errors={errors} />
        <InputField
          name="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={updateName}
          required={true}
        />
        <InputField
          name="description"
          placeholder="Description"
          type="textarea"
          value={description}
          onChange={updateDescription}
          required={true}
        />
        <InputField
          name="date"
          placeholder="Date and Time"
          type="datetime-local"
          value={date}
          onChange={updateDate}
          required={true}
        />
        <div className="justify-center w-3/4 p-2 mx-auto grid grid-cols-2 gap-2">
          <select
            value={stateCode}
            onChange={updateState}
            className="px-1 py-2 mb-2 border rounded outline-none dark:bg-gray-800 dark:text-gray-50 col-start-1"
          >
            <option value="State...">State...</option>
            {states &&
                states.map((state) => (
                  <option value={state.isoCode} key={state.name}>
                    {state.name}
                  </option>
                ))}
          </select>
          {stateCode !== "State..." && (
            <select
              value={city}
              onChange={updateCity}
              className="px-1 py-2 mb-2 border rounded dark:bg-gray-800 dark:text-gray-50 col-start-2"
            >
              <option value="City...">City...</option>
              {cities.map((city) => (
                <option value={city.name} key={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <SubmitFormButton label="Create Meetup" />
      </form>
    </>
  );
};

export default CreateMeetup;
