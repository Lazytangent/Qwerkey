import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { session } from '../../store/selectors';
import { createRetailerRating } from "../../store/retailers";
import FormTitle from "../parts/FormTitle";
import InputField from "../parts/InputField";
import FormErrors from "../parts/FormErrors";
import SubmitFormButton from "../parts/SubmitFormButton";

const RetailerRatingForm = ({ retailerId }) => {
  const dispatch = useDispatch();
  const user = useSelector(session.user());

  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);

  const updateRating = (e) => {
    setRating(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const retailer = await dispatch(createRetailerRating({ rating, user_id: user.id }, retailerId));
    if (retailer.errors) {
      setErrors(retailer.errors);
    } else {
      setRating(1);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <FormTitle title="Leave a Rating" />
        <FormErrors errors={errors} />
        <InputField
          name="rating"
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={updateRating}
        />
        <SubmitFormButton label="Submit Rating" />
      </form>
    </>
  );
};

export default RetailerRatingForm;
