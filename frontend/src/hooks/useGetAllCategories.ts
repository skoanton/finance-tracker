import { getAllCategories } from "@/services/api/categoryServices";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useCallback, useEffect, useState } from "react";

export const useGetAllCategories = () => {
  const setCategories = useCategoryStore((state) => state.setCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllCategories();
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      setError("Error getting categories");
    } finally {
      setIsLoading(false);
    }
  }, [setCategories]);

  return { isLoading, error, getCategories };
};
