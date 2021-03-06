import { Modal } from '../../context/ModalContext';
import EditCommentForm from './EditCommentForm';

const EditCommentModal = ({ showEditModal, setShowEditModal, commentId }) => {
  return (
    <>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditCommentForm setShowEditModal={setShowEditModal} commentId={commentId} />
        </Modal>
      )}
    </>
  );
};

export default EditCommentModal;
