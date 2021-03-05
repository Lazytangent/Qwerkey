import { Modal } from '../../context/ModalContext';
import EditPostForm from './EditPostForm';

const EditPostModal = ({ setShowEditModal, showEditModal }) => {
  return (
    <>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditPostForm setShowEditModal={setShowEditModal} />
        </Modal>
      )}
    </>
  );
};

export default EditPostModal;
