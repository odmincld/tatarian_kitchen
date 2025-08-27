'use server';

import { signOut } from '@/auth/auth';

export async function signOutFunc() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.error('Error auth:', error);
  }
}
