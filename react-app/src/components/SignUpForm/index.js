import { Modal } from '../../context/ModalContext';
import { useAuthContext } from '../../context/AuthContext';
import SignUpForm from './SignUpForm';

const SignUpModal = () => {
  const { showSignUpModal, setShowSignUpModal } = useAuthContext();

  return (
    <>
      {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
};

export default SignUpModal;
