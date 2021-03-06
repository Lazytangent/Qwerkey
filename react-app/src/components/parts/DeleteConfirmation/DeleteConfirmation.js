import { useDispatch } from 'react-redux';

import { deletePost, deleteComment } from '../../../store/posts';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

const DeleteConfirmation = ({ setShowDeleteModal, postId, commentId }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    if (postId) {
      dispatch(deletePost(postId));
    } else {
      dispatch(deleteComment(commentId));
    }
    setShowDeleteModal(false);
  };

  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="p-4 pb-6 bg-white rounded md:w-60">
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
