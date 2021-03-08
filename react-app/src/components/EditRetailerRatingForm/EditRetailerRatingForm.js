import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateRetailerRating } from "../../store/retailers";
import { useRetailerRatingContext } from "../../context/RetailerRatingContext";
import FormTitle from "../parts/FormTitle";
import FormErrors from "../parts/FormErrors";
import InputField from "../parts/InputField";
import SubmitFormButton from "../parts/SubmitFormButton";

const EditRetailerRatingForm = ({ setShowEditModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const { retailerRating } = useRetailerRatingContext();
  const [rating, setRating] = useState()
  const [errors, setErrors] = useState([]);

  const updateRating = (e) => {
    setRating(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedRating = {
      rating,
      user_id: user.id,
      id: retailerRating.id
    };
    const retailer = await dispatch(updateRetailerRating(updatedRating, retailerRating.retailer_id));
    if (!retailer.errors) {
      setShowEditModal(false);
    } else {
      setErrors(retailer.errors);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <FormTitle title="Update your Rating" />
        <FormErrors errors={errors} />
        <InputField
          name="rating"
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={updateRating}
        />
        <SubmitFormButton label="Update Rating" />
      </form>
    </>
  );
};

export default EditRetailerRatingForm;
