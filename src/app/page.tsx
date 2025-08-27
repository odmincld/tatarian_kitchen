'use client';

import { useRecipeStore } from '@/store/recipe.store';
import Link from 'next/link';
import { Button, Spinner } from '@heroui/react';
import RecipeCard from '@/components/common/recipe-card';
import { useAuthStore } from '@/store/auth.store';

export default function Home() {
  const { recipes, isLoading, error } = useRecipeStore();
  const { isAuth } = useAuthStore();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div>
        {isAuth ? (
          <Link href="/recipes/new">
            <Button color="primary">Add Recipe</Button>
          </Link>
        ) : (
          <p className={'text-large text-blue-500'}>
            Login to add a new recipe
          </p>
        )}
      </div>

      {error !== 'Error getting recipes' ? (
        <p className="text-red-500 mt-2 mb-4">{error}</p>
      ) : (
        <h3 className={'text-2xl mt-8 mb-4'}>Empty recipe list</h3>
      )}

      {isLoading && <Spinner className={'mt-4 '} size="lg" />}

      <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
