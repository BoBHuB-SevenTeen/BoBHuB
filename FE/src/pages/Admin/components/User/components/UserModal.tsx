import { Modal } from '@mui/material';
import { User } from '../../../../../type/userType';
import UserDetailForm from './UserDetailForm';

interface UserModalProps {
  handleClose: () => void;
  open: boolean;
  user: User;
}

const UserModal = ({ open, handleClose, user }: UserModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <UserDetailForm handleClose={handleClose} user={user} />
      </Modal>
    </div>
  );
};

export default UserModal;
