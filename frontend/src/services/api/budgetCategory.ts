import { BudgetCategory } from "@/models/generatedTypes";
import axios from "axios";

export const createBudgetCategory = async (budgetCategory: BudgetCategory) => {
  try {
    const response = await axios.post("http://localhost:5000/api/budgetcategory", budgetCategory);
    if (response.status !== 201) {
      throw new Error("Error updating category");
    }
    const createdBudgetCategory: BudgetCategory = response.data;
    return createdBudgetCategory;
  } catch (error) {
    throw new Error(`Error updating Budget Category: ${error}`);
  }
};
