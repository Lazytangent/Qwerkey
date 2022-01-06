import { Modal } from '../../../context/ModalContext';
import DeleteConfirmation from './DeleteConfirmation';

const DeleteConfirmationModal = ({
  showDeleteModal,
  setShowDeleteModal,
  id,
  extraId,
  type,
}) => {
  return (
    <>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation
            setShowDeleteModal={setShowDeleteModal}
            id={id}
            extraId={extraId}
            type={type}
          />
        </Modal>
      )}
    </>
  );
};

export default DeleteConfirmationModal;
