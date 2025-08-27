import { create } from 'zustand';
import { Ingredient } from '@/types/ingredient';
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
} from '@/actions/ingredient';

interface IngredientState {
  ingredients: Ingredient[];
  isLoading: boolean;
  error: string | null;
  loadIngredients: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  isLoading: false,
  error: null,
  loadIngredients: async () => {
    set({ isLoading: true, error: null });

    try {
      const result = await getIngredients();

      if (result.success) {
        set({ ingredients: result.ingredients, isLoading: false });
      } else {
        set({ error: String(result.error), isLoading: false });
      }
    } catch (error) {
      console.log('Error Load Ingredients:', error);
      set({ error: 'Error Load Ingredients', isLoading: false });
    }
  },
  addIngredient: async (formData: FormData) => {
    set({ isLoading: true, error: null });

    try {
      const result = await createIngredient(formData);
      if (result.success) {
        set((state) => ({
          ingredients: [...state.ingredients, result.ingredient],
          isLoading: false,
        }));
      } else {
        set({ error: String(result.error), isLoading: false });
      }
    } catch (error) {
      console.log('Error Add Ingredient:', error);
      set({ error: 'Error Add Ingredient', isLoading: false });
    }
  },
  removeIngredient: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await deleteIngredient(id);

      if (result.success) {
        set((state) => ({
          ingredients: state.ingredients.filter((i) => i.id !== id),
          isLoading: false,
        }));
      } else {
        set({ error: String(result.error), isLoading: false });
      }
    } catch (error) {
      console.log('Error Remove Ingredient:', error);
      set({ error: 'Error Remove Ingredient', isLoading: false });
    }
  },
}));
