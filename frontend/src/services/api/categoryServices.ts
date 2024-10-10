import { Category, CategoryType } from "@/models/generatedTypes";
import axios from "axios";

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/category");

    if (response.status !== 200) {
      throw new Error("Error getting categories");
    }
    const categories: Category[] = response.data;
    return categories;
  } catch (error) {
    throw new Error("Error getting categories");
  }
};

export const createCategory = async (category: Category): Promise<Category> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/category",
      category
    );

    if (response.status !== 201) {
      throw new Error("Error creating budget category");
    }
    const newCategory: Category = response.data;
    return newCategory;
  } catch (error: any) {
    // More detailed error handling
    if (error.response) {
      throw new Error(
        `Error creating Budget Category: ${
          error.response.data.message || error.message
        }`
      );
    } else {
      throw new Error(`Error creating Budget Category: ${error.message}`);
    }
  }
};

export const updateCategory = async (category: Category): Promise<Category> => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/category/${category.id}`,
      category
    );

    if (response.status !== 200) {
      throw new Error("Error updating category");
    }
    const updatedCategory: Category = response.data;
    return updatedCategory;
  } catch (error) {
    throw new Error("Error updating category");
  }
};

export const deleteCategory = async (id: number): Promise<Category> => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/category/${id}`
    );

    if (response.status !== 200) {
      throw new Error("Error deleting category");
    }
    const deletedCategory: Category = response.data;
    return deletedCategory;
  } catch (error) {
    throw new Error("Error deleting category");
  }
};

export const getCategoriesByType = async (
  categoryType: CategoryType
): Promise<Category[]> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/category/type/${categoryType}`
    );

    if (response.status !== 200) {
      throw new Error("Error getting categories by type");
    }
    const categories: Category[] = response.data;
    return categories;
  } catch (error) {
    throw new Error("Error getting categories by type");
  }
};
