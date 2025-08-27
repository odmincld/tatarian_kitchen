'use server';

import { signIn } from '@/auth/auth';

export async function signInWithCredentials(email: string, password: string) {
  try {
    return await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (err) {
    return err;
  }
}
