import { Modal } from '../../context/ModalContext';
import { useAuthContext } from '../../context/AuthContext';
import LoginForm from './LoginForm';

const LoginModal = () => {
  const { showLoginModal, setShowLoginModal } = useAuthContext();

  return (
    <>
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
