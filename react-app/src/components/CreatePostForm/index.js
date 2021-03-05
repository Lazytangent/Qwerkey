import { useState } from 'react';

import { Modal } from '../../context/ModalContext';
import CreatePostForm from './CreatePostForm';

const CreatePostModal = () => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

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
