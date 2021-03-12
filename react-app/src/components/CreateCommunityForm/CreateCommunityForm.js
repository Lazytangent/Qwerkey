import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createCommunity } from "../../store/communities";
import FormTitle from "../parts/FormTitle";
import FormErrors from "../parts/FormErrors";
import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const CreateCommunityForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const community = {
      name,
      description,
    };
    const newCommunity = await dispatch(createCommunity(community));
    if (!newCommunity.errors) {
      setErrors(newCommunity.errors);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <FormTitle title="Create a Community" />
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
        <SubmitFormButton label="Create Community" />
      </form>
    </>
  );
};

export default CreateCommunityForm;
