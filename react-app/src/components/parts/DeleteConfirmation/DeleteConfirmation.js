import { useDispatch } from 'react-redux';

import { deletePost } from '../../../store/posts';
import { deleteComment } from "../../../store/comments";
import { deleteRetailerRating } from "../../../store/retailers";
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

const DeleteConfirmation = ({ setShowDeleteModal, id, extraId, type }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    switch (type) {
      case "post":
        dispatch(deletePost(id));
        break;
      case "comment":
        dispatch(deleteComment(id));
        break;
      case "retailerRating":
        dispatch(deleteRetailerRating(id, extraId));
        break;
      default:
        break;
    }
    setShowDeleteModal(false);
  };

  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="p-4 pb-6 bg-white rounded dark:text-gray-50 dark:bg-gray-800 md:w-60">
      <div className="flex justify-center p-2">
        <h4>Are you sure?</h4>
      </div>
      <div className="flex justify-around">
        <DeleteButton className="w-1/3 hover:bg-red-500" onClick={deleteHandler} label="Yes" />
        <EditButton className="w-1/3 hover:bg-yellow-500" onClick={cancelDeleteHandler} label="No" />
      </div>
    </div>
  );
};

export default DeleteConfirmation;
