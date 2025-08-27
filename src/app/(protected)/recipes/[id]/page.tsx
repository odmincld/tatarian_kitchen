'use client';

import { useParams } from 'next/navigation';
import { string } from 'zod';
import { useRecipeStore } from '@/store/recipe.store';
import { useEffect, useState } from 'react';
import { IRecipe } from '@/types/recipe';
import { Spinner } from '@heroui/react';
import RecipeForm from '@/forms/recipe.form';
import MainPageTitle from '@/components/UI/layout/MainPageTitle';

const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error } = useRecipeStore();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.find((recipe) => recipe.id === id);
      setRecipe(foundRecipe || null);
      setHasSearched(true);
    }
  }, [recipes, id, error]);

  if (isLoading) return <Spinner size="lg" />;
  if (error) return <p className="text-red-500 mt-2 mb-4">{error}</p>;

  if (hasSearched && !recipe) {
    return <p className="text-red-500 mt-2 mb-4">Recipe Not Found</p>;
  }

  if (recipe) {
    return (
      <div className="flex flex-col container mx-auto p-x-4 w-full items-center">
        <MainPageTitle name={'Edit Recipe:'} />

        <RecipeForm initialRecipe={recipe} />
      </div>
    );
  }
};
export default EditRecipePage;
