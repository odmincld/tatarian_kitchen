'use client';

import { Button, Form, Input } from '@heroui/react';
import * as React from 'react';
import { registerUser } from '@/actions/register';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface IProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
  const [errorReg, setErrorReg] = useState<string>('');
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await registerUser(formData);

    if ('error' in result) {
      setErrorReg(result.error);
    } else {
      if (pathname === '/error' && redirectTo) {
        window.location.href = redirectTo;
      } else {
        onClose();
        window.location.reload();
      }
    }
  };

  const onChange = (e: { target: { name: string; value: string } }) => {
    if (errorReg) setErrorReg('');

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form className={' flex flex-col gap-7 w-full'} onSubmit={onSubmit}>
      <Input
        isRequired
        aria-label="Email"
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="inside"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
      />

      <Input
        isRequired
        aria-label="Password"
        label="Password"
        labelPlacement="inside"
        name="password"
        type="password"
        value={formData.password}
        onChange={onChange}
        validate={(value) => {
          if (value.length < 8) {
            return 'Password must be 8 characters or more. ';
          }
          if ((value.match(/[A-Z]/g) || []).length < 1) {
            return 'Password must include at least 1 upper case letter';
          }
          if ((value.match(/[^a-z]/gi) || []).length < 1) {
            return 'Password must include at least 1 symbol or number.';
          }
        }}
      />

      <Input
        isRequired
        aria-label="Confirm password"
        label="Confirm Password"
        labelPlacement="inside"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={onChange}
        validate={(value) => {
          if (!value) {
            return 'Confirm your password';
          }
          if (value !== formData.password) {
            return 'The passwords don’t match.';
          }
        }}
      />
      <p className={'text-red-500'}>{errorReg}</p>

      <div className="flex flex-col justify-center items-center w-full gap-5">
        <Button className="w-full" type="button" onPress={onClose}>
          Cancel
        </Button>

        <Button color={'primary'} className="w-full" type="submit">
          Create Account
        </Button>
      </div>
    </Form>
  );
};
export default RegistrationForm;
