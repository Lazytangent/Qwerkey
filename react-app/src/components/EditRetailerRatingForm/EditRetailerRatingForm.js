import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { session } from '../../store/selectors';
import { updateRetailerRating } from '../../store/retailers';
import { useRetailerRatingContext } from '../../context/RetailerRatingContext';
import FormTitle from '../parts/FormTitle';
import InputField from '../parts/InputField';
import SubmitFormButton from '../parts/SubmitFormButton';
import convertFormErrors from '../../utils/convertFormErrors';

const EditRetailerRatingForm = ({ setShowEditModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(session.user());

  const { retailerRating } = useRetailerRatingContext();
  const [rating, setRating] = useState(retailerRating.rating);
  const [errors, setErrors] = useState([]);

  const updateRating = (e) => {
    setRating(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedRating = {
      rating,
      user_id: user.id,
      id: retailerRating.id,
    };
    const retailer = await dispatch(
      updateRetailerRating(updatedRating, retailerRating.retailer_id)
    );
    if (!retailer.errors) {
      setShowEditModal(false);
    } else {
      const newErrors = convertFormErrors(retailer.errors);
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-4 bg-white rounded dark:bg-gray-800 dark:text-gray-50">
      <form onSubmit={submitHandler}>
        <FormTitle title="Update your Rating" />
        {errors.length > 0 && (
          <div className="flex flex-col items-center text-red-600">
            {errors.map((error) => (
              <p>{error}</p>
            ))}
          </div>
        )}
        <InputField
          name="rating"
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={updateRating}
        />
        <SubmitFormButton label="Update Rating" />
      </form>
    </div>
  );
};

export default EditRetailerRatingForm;
