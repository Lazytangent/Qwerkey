import { Modal } from "../../context/ModalContext";
import EditRetailerRatingForm from "./EditRetailerRatingForm";

const EditRetailerRatingModal = ({ showEditModal, setShowEditModal }) => {
  return (
    <>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditRetailerRatingForm setShowEditModal={setShowEditModal} />
        </Modal>
      )}
    </>
  );
};

export default EditRetailerRatingModal;
