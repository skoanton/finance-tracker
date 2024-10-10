import { Category } from "@/models/generatedTypes";
import { create } from "zustand";

interface CategoryState {
  categories: Category[];
  addCategory: (category: Category) => void;
  setCategories: (categories: Category[]) => void;
  updateCategory: (updatedCategory: Category) => void;
  removeCategory: (id: number) => void;

  multiMatchesCategories: Category[];
  setMultiMatchesCategories: (categories: Category[]) => void;
  updateMultiMatchesCategories: (updatedCategory: Category) => void;
  resetMultiMatchesCategories: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  addCategory: (category: Category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  setCategories: (categories: Category[]) => set({ categories }),
  updateCategory: (updatedCategory: Category) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      ),
    })),
  removeCategory: (id: number) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),

  multiMatchesCategories: [],
  setMultiMatchesCategories: (categories: Category[]) =>
    set({ multiMatchesCategories: categories }),
  updateMultiMatchesCategories: (updatedCategory: Category) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      ),
    })),
  resetMultiMatchesCategories: () => set({ multiMatchesCategories: [] }),
}));
