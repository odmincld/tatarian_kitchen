'use client';

import CustomModal from '@/components/common/modal';
import LoginForm from '@/forms/login.form';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const LoginModal = ({ onClose, isOpen }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={'Login'}>
      <LoginForm onClose={onClose}></LoginForm>
    </CustomModal>
  );
};

export default LoginModal;
