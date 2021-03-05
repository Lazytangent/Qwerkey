import { Modal } from '../../../context/ModalContext';
import DeleteConfirmation from './DeleteConfirmation';

const DeleteConfirmationModal = ({ showDeleteModal, setShowDeleteModal, postId }) => {
  return (
    <>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} postId={postId} />
        </Modal>
      )}
    </>
  );
};

export default DeleteConfirmationModal;
