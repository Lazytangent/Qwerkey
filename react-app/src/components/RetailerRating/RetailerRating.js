import EditButton from "../parts/EditButton";
import EditRetailerRatingModal from "../EditRetailerRatingForm";
import DeleteButton from "../parts/DeleteButton";
import DeleteConfirmationModal from "../parts/DeleteConfirmation";

const RetailerRating = ({ rating }) => {
  return (
    <div className="p-2 mb-2 rounded shadow-sm hover:shadow-lg dark:bg-gray-600 dark:hover:shadow-light-lg dark:shadow-light transform duration-100 ease-in-out">
      <h6>Rating by {rating.user.username}</h6>
      <p>{rating.rating}</p>
    </div>
  );
};

export default RetailerRating;
