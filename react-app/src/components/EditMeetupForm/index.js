import { Modal } from '../../context/ModalContext';
import EditMeetupForm from './EditMeetupForm';

const EditMeetupModal = ({ setShowEditModal, showEditModal, meetupId }) => {
  return (
    <>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditMeetupForm
            meetupId={meetupId}
            setShowEditModal={setShowEditModal}
          />
        </Modal>
      )}
    </>
  );
};

export default EditMeetupModal;
