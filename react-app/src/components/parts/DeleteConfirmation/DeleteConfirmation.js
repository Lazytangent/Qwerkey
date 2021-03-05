import { useDispatch } from 'react-redux';

import { deletePost } from '../../../store/posts';
import DeleteButton from '../DeleteButton';
import EditButton from '../EditButton';

const DeleteConfirmation = ({ setShowDeleteModal, postId }) => {
  const dispatch = useDispatch();

  const deletePostHandler = () => {
    dispatch(deletePost(postId));
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
        <DeleteButton className="w-1/3 hover:bg-red-500" onClick={deletePostHandler} label="Yes" />
        <EditButton className="w-1/3 hover:bg-yellow-500" onClick={cancelDeleteHandler} label="No" />
      </div>
    </div>
  );
};

export default DeleteConfirmation;
