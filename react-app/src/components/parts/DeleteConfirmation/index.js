import { Modal } from '../../../context/ModalContext';
import DeleteConfirmation from './DeleteConfirmation';

const DeleteConfirmationModal = ({ showDeleteModal, setShowDeleteModal, postId, commentId }) => {
  return (
    <>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} postId={postId} commentId={commentId} />
        </Modal>
      )}
    </>
  );
};

export default DeleteConfirmationModal;
