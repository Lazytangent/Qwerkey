import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import csc from "country-state-city";

import { updateMeetup } from "../../store/meetups";
import FormTitle from "../parts/FormTitle";
import FormErrors from "../parts/FormErrors";
import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const EditMeetupForm = ({ meetupId, setShowEditModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const meetup = useSelector((state) => state.meetups.meetups[meetupId]);

  const [name, setName] = useState(meetup.name);
  const [description, setDescription] = useState(meetup.description);
  const [date, setDate] = useState(meetup.date);
  const [state, setState] = useState(meetup.state);
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("State...");
  const [city, setCity] = useState(meetup.city);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    if (user && meetup) setIsLoaded(true);
  }, [user, meetup]);

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
      id: meetupId,
      date: new Date(date).toISOString(),
    };
    const meetup = await dispatch(updateMeetup(meetupData));
    if (meetup.errors) {
      setErrors(meetup.errors);
    } else {
      setShowEditModal(false);
    }
  };

  if (!isLoaded) {
    return null;
  }

  const states = csc.getStatesOfCountry("US");

  return (
    <>
      <form onSubmit={submitHandler}>
        <FormTitle title="Update Meetup" />
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
        <SubmitFormButton label="Update Meetup" />
      </form>
    </>
  );
};

export default EditMeetupForm;
