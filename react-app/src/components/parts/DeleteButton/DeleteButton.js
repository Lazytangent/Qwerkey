import { useState } from 'react';

import { Modal } from '../../../context/ModalContext';
import DeleteConfirmation from '../DeleteConfirmation';

const DeleteButton = ({ label }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <button className="p-2 mx-2 border rounded hover:border-red-500 ease-in-out focus:bg-red-500 focus:outline-none">{label}</button>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} />
        </Modal>
      )}
    </>
  );
};

export default DeleteButton;
