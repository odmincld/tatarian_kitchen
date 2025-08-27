import { create } from 'zustand';
import { IRecipe } from '@/types/recipe';
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from '@/actions/recipe';

interface IActionResult {
  success: boolean;
  recipe?: IRecipe;
  error?: string;
}

interface IRecipeState {
  recipes: IRecipe[];
  isLoading: boolean;
  error: string | null;
  loadRecipes: () => Promise<void>;
  addRecipe: (formData: FormData) => Promise<IActionResult>;
  updateRecipe: (id: string, formData: FormData) => Promise<IActionResult>;
  removeRecipe: (id: string) => Promise<void>;
}

export const useRecipeStore = create<IRecipeState>((set) => ({
  recipes: [],
  isLoading: false,
  error: null,
  loadRecipes: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getRecipes();
      if (result.success) {
        set({ recipes: result.recipes, isLoading: false });
      } else {
        set({ error: result.errorMessage, isLoading: false });
      }
    } catch (error) {
      console.log('Error:', error);
      set({ error: 'Error Load Recipe', isLoading: false });
    }
  },
  addRecipe: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createRecipe(formData);

      if (result.success) {
        set((state) => ({
          recipes: [...state.recipes, result.recipe!],
          isLoading: false,
        }));

        return { success: true, recipe: result.recipe };
      } else {
        set({ error: result.errorMessage, isLoading: false });

        return { success: false, error: result.errorMessage };
      }
    } catch (error) {
      console.log('Error:', error);
      set({ error: 'Error Add Recipe', isLoading: false });

      return { success: false, error: 'Error Add Recipe' };
    }
  },
  updateRecipe: async (id: string, formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await updateRecipe(id, formData);

      if (result.success) {
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === id ? result.recipe! : recipe
          ),
          isLoading: false,
        }));

        return { success: true, recipe: result.recipe };
      } else {
        set({ error: result.errorMessage, isLoading: false });

        return { success: false, error: result.errorMessage };
      }
    } catch (error) {
      console.log('Error:', error);
      set({ error: 'Error Update Recipe', isLoading: false });

      return { success: false, error: 'Error Update Recipe' };
    }
  },
  removeRecipe: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await deleteRecipe(id);

      if (result.success) {
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== id),
          isLoading: false,
        }));
      } else {
        set({ error: result.errorMessage, isLoading: false });
      }
    } catch (error) {
      console.log('Error:', error);
      set({ error: 'Error Delete Recipe', isLoading: false });
    }
  },
}));
