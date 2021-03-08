import { useState } from "react";
import { useSelector } from "react-redux";

import { useRetailerRatingContext } from "../../context/RetailerRatingContext";
import EditButton from "../parts/EditButton";
import EditRetailerRatingModal from "../EditRetailerRatingForm";
import DeleteButton from "../parts/DeleteButton";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";

const RetailerRating = ({ rating }) => {
  const user = useSelector(state => state.session.user);

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
    <div className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-600 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h6>Rating by {rating.user.username}</h6>
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
              type="retailerRating"
            />
          </DeleteButton>
        </>
      )}
    </div>
  );
};

export default RetailerRating;
