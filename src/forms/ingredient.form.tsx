'use client';

import { Button, Form, Input } from '@heroui/react';
import * as React from 'react';
import { signInWithCredentials } from '@/actions/sign-in';
import { useState } from 'react';

interface IProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: IProps) => {
  const [errorLog, setErrorLog] = useState<string>('');

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signInWithCredentials(
      formData.email,
      formData.password
    );
    if (result === null) {
      setErrorLog('Check your email or password');
    } else {
      window.location.reload();
      onClose();
    }
  };

  const onChange = (e: { target: { name: string; value: string } }) => {
    if (errorLog) setErrorLog('');
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
      />

      {errorLog && <p className={'text-red-500'}>{errorLog}</p>}

      <div className="flex flex-col justify-center items-center w-full gap-5">
        <Button className="w-full" type="button" onPress={onClose}>
          Cancel
        </Button>

        <Button color={'primary'} className="w-full" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};
export default LoginForm;
