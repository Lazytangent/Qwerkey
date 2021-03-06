import { Modal } from '../../context/ModalContext';
import EditCommentForm from './EditCommentForm';

const EditCommentModal = ({ showEditModal, setShowEditModal }) => {
  return (
    <>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditCommentForm setShowEditModal={setShowEditModal} />
        </Modal>
      )}
    </>
  );
};

export default EditCommentModal;
