import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import csc from "country-state-city";

import { createMeetup } from "../../store/meetups";
import FormTitle from "../parts/FormTitle";
import FormErrors from "../parts/FormErrors";
import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const CreateMeetup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("State...");
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("State...");
  const [city, setCity] = useState("City...");
  const [cities, setCities] = useState([]);

  return (
    <>
      <h3>Placeholder for CreateMeetup</h3>
    </>
  );
};

export default CreateMeetup;
