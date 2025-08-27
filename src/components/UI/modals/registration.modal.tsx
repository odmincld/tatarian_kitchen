'use client';

import CustomModal from '@/components/common/modal';
import RegistrationForm from '@/forms/registration.form';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

const RegistrationModal = ({ onClose, isOpen }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={'Create Account'}>
      <RegistrationForm onClose={onClose}></RegistrationForm>
    </CustomModal>
  );
};

export default RegistrationModal;
