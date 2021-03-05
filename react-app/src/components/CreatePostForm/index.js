import { useState } from 'react';

import { Modal } from '../../context/ModalContext';
import { useCreatePostContext } from '../../context/CreatePostContext';
import CreatePostForm from './CreatePostForm';

const CreatePostModal = () => {
  const { showCreatePostModal, setShowCreatePostModal } = useCreatePostContext();

  return (
    <>
      {showCreatePostModal && (
        <Modal onClose={() => setShowCreatePostModal(false)}>
          <CreatePostForm />
        </Modal>
      )}
    </>
  );
};

export default CreatePostModal;
