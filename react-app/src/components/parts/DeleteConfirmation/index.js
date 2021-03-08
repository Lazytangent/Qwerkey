import { Modal } from '../../../context/ModalContext';
import DeleteConfirmation from './DeleteConfirmation';

const DeleteConfirmationModal = ({ showDeleteModal, setShowDeleteModal, postId, commentId, ratingId }) => {
  return (
    <>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} postId={postId} commentId={commentId} ratingId={ratingId} />
        </Modal>
      )}
    </>
  );
};

export default DeleteConfirmationModal;
