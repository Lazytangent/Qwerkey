import { Modal } from '../../context/ModalContext';
import EditPostForm from './EditPostForm';

const EditPostModal = ({ setShowEditModal, showEditModal, postId }) => {
  return (
    <>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditPostForm postId={postId} setShowEditModal={setShowEditModal} />
        </Modal>
      )}
    </>
  );
};

export default EditPostModal;
