'use server';

import { IFormData } from '@/types/form-data';
import prisma from '@/utils/prisma';
import { saltAndHashPassword } from '@/utils/password';

export async function registerUser(formData: IFormData) {
  const { email, password, confirmPassword } = formData;

  if (password !== confirmPassword) return { error: 'Passwords do not match' };

  if (password.length < 6)
    return { error: 'Password must be 8 characters or more. ' };

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return { error: 'User already exists' };
    }

    const pwHash = await saltAndHashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
      },
    });

    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Error registering user' };
  }
}
