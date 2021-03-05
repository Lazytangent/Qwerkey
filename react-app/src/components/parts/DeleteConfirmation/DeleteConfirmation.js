import { useDispatch } from 'react-redux';

import { deletePost } from '../../../store/posts';

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
    <div>
      <h4>Are you sure?</h4>
      <button onClick={deletePostHandler}>Yes</button>
      <button onClick={cancelDeleteHandler}>No</button>
    </div>
  );
};

export default DeleteConfirmation;
