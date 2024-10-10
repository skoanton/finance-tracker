import { CategoryType } from "@/models/generatedTypes";
import {
  getAllCategories,
  getCategoriesByType,
} from "@/services/api/categoryServices";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useCallback, useEffect, useState } from "react";

export const useGetAllCategories = () => {
  const setCategories = useCategoryStore((state) => state.setCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(
    async (type?: CategoryType) => {
      setIsLoading(true);
      setError(null);
      try {
        const response =
          type !== undefined
            ? await getCategoriesByType(type)
            : await getAllCategories();
        if (response) {
          setCategories(response);
          return response;
        }
      } catch (error) {
        setError("Error getting categories");
      } finally {
        setIsLoading(false);
      }
    },
    [setCategories]
  );

  const getCategories = () => fetchCategories();
  const getExpenseCategories = () => fetchCategories(CategoryType.Expense);
  const getIncomeCategories = () => fetchCategories(CategoryType.Income);
  const getTransferCategories = () => fetchCategories(CategoryType.Transfer);
  const getSavingsCategories = () => fetchCategories(CategoryType.Saving);

  return {
    isLoading,
    error,
    getCategories,
    getExpenseCategories,
    getIncomeCategories,
    getTransferCategories,
    getSavingsCategories,
  };
};
