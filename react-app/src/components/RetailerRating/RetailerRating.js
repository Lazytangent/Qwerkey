import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { session } from '../../store/selectors';
import { useRetailerRatingContext } from "../../context/RetailerRatingContext";
import EditButton from "../parts/EditButton";
import EditRetailerRatingModal from "../EditRetailerRatingForm";
import DeleteButton from "../parts/DeleteButton";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";

const RetailerRating = ({ rating }) => {
  const user = useSelector(session.user());

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { setRetailerRating } = useRetailerRatingContext();

  const editBtnHandler = () => {
    setShowEditModal(true);
    setRetailerRating(rating);
  };

  const deleteBtnHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <div className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-800 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h6>Rating by <NavLink to={`/users/${rating.user.id}`}><span className="hover:underline hover:text-green">{rating.user.username}</span></NavLink></h6>
      <p>{rating.rating}</p>
      {rating.user.id === user?.id && (
        <>
          <EditButton label="Edit Rating" onClick={editBtnHandler}>
            <EditRetailerRatingModal
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
            />
          </EditButton>
          <DeleteButton label="Delete Rating" onClick={deleteBtnHandler}>
            <DeleteConfirmationModal
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
              id={rating.id}
              extraId={rating.retailer_id}
              type="retailerRating"
            />
          </DeleteButton>
        </>
      )}
    </div>
  );
};

export default RetailerRating;
