'use client';

import IngredientForm from '@/forms/ingredient.form';
import IngredientsTable from '@/components/UI/tables/IngredientsTable';
import MainPageTitle from '@/components/UI/layout/MainPageTitle';

const IngredientsPage = () => {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <IngredientForm />

      <IngredientsTable />
    </div>
  );
};

export default IngredientsPage;
