'use client';

import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/auth.store';
import React, { useEffect } from 'react';
import { useIngredientStore } from '@/store/ingredient.store';
import { useRecipeStore } from '@/store/recipe.store';

interface IProps {
  children: React.ReactNode;
}

export const AppLoader = ({ children }: IProps) => {
  const { data: session, status } = useSession();
  const { setAuthState, status: statusAuth, isAuth } = useAuthStore();
  const isLoad = statusAuth === 'loading';
  const { loadIngredients } = useIngredientStore();
  const { loadRecipes } = useRecipeStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);

  useEffect(() => {
    if (isAuth) loadIngredients();
  }, [isAuth, loadIngredients]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  if (!isLoad) return children;
};
