import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createRetailerRating } from "../../store/retailers";
import FormErrors from "../parts/FormErrors";
import SubmitFormButton from "../parts/SubmitFormButton";

const RetailerRatingForm = ({ retailerId }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState([]);

  const updateRating = (e) => {
    setRating(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const retailer = await dispatch(createRetailerRating({ rating, userId: user.id }, retailerId));
    if (retailer.errors) {
      setErrors(retailer.errors);
    } else {
      setRating(1);
    }
  };

  return (
    <>
      <h2>Placeholder for RetailerRating</h2>
      <form onSubmit={submitHandler}>
        <FormErrors errors={errors} />
        <input type="number" value={rating} onChange={updateRating} />
        <SubmitFormButton label="Submit Rating" />
      </form>
    </>
  );
};

export default RetailerRatingForm;
