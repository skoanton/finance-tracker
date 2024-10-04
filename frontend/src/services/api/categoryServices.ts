import { Category } from "@/models/generatedTypes";
import axios from "axios";

export const getCategories = async ():Promise<Category[]> => {
    try {
        const response = await axios.get("http://localhost:5000/api/category");

        if(response.status !== 200) {
            throw new Error("Error getting categories");
        }
        const categories: Category[] = response.data;
        return categories;
    } catch (error) {
        throw new Error("Error getting categories");
    }
}

export const createCategory = async (category: Category):Promise<Category> => {
    try {
        const response = await axios.post("http://localhost:5000/api/category", category);

        if(response.status !== 201) {
            throw new Error("Error creating category");
        }
        const newCategory: Category = response.data;
        return newCategory;
    } catch (error) {
        throw new Error("Error creating category");
    }
}

export const updateCategory = async (category: Category):Promise<Category> => {
    try {
        const response = await axios.put(`http://localhost:5000/api/category/${category.id}`, category);

        if(response.status !== 200) {
            throw new Error("Error updating category");
        }
        const updatedCategory: Category = response.data;
        return updatedCategory;
    } catch (error) {
        throw new Error("Error updating category");
    }
}

export const deleteCategory = async (id: number):Promise<void> => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/category/${id}`);

        if(response.status !== 200) {
            throw new Error("Error deleting category");
        }
    } catch (error) {
        throw new Error("Error deleting category");
    }
}